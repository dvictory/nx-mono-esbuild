import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    error?: string;
    user: {
      accessToken: string;
    } & DefaultSession['user'];
  }
  interface User {
    access_token?: string;
    refresh_token?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
  }
}
