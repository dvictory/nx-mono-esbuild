import NextAuth, { type NextAuthOptions, User } from 'next-auth';
import fetch, { FormData } from 'node-fetch';
import jwt_decode from 'jwt-decode';

import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/credentials-signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credential',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'merchant' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const CLIENT_ID = process.env.FUSIONAUTH_CLIENT_ID;
        const SECRET = process.env.FUSIONAUTH_SECRET;
        const form = new FormData();
        form.set('grant_type', 'password');
        form.set('scope', 'offline_access');
        form.set('username', credentials.username);
        form.set('password', credentials.password);

        const res = await fetch(process.env.FUSIONAUTH_TOKEN_ENDPOINT, {
          method: 'POST',
          body: form,
          headers: {
            Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + SECRET),
          },
        });

        const user = (await res.json()) as User & {
          userId: string;
          access_token: string;
        };

        console.log('User', user);
        // If no error and we have user data, return it
        if (res.ok && user) {
          user.id = user.userId;
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT', token, user);
      if (user) {
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
        token.accessTokenExpires = (jwt_decode(token.accessToken) as { exp: number }).exp * 1000;
      }

      if (Date.now() < token.accessTokenExpires) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        console.log('Getting Refresh token');
        return refreshAccessToken(token);
      }
    },
    async session({ session, token, user }) {
      // console.log('Session', session, token);
      if (token?.accessToken) {
        // Decode token and pass info to session.
        // This data will be available client-side.
        const decoded = jwt_decode(token.accessToken) as {
          email: string;
          preferred_username: string;
        };
        session.user.email = decoded.email;
        session.user.name = decoded.preferred_username;
      }
      return session;
    },
  },
};

async function refreshAccessToken(token): Promise<JWT> {
  try {
    const url =
      `${process.env.FUSIONAUTH_TOKEN_ENDPOINT}?` +
      new URLSearchParams({
        client_id: process.env.FUSIONAUTH_CLIENT_ID,
        client_secret: process.env.FUSIONAUTH_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedToken = (await response.json()) as {
      access_token: string;
      expires_in: number;
      refresh_token: string;
    };

    if (!response.ok) {
      throw refreshedToken;
    }

    console.log('Access token refreshed', new Date(Date.now() + refreshedToken.expires_in * 1000));
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
export default NextAuth(authOptions);
