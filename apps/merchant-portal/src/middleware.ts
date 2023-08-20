import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        console.log('Token', token);
        const pathname = req.nextUrl.pathname;
        if (
          pathname.startsWith('/_next') ||
          pathname === '/favicon.ico' ||
          pathname === '/__ENV.js' ||
          pathname === '/auth/internal' // TODO - make this work
        ) {
          return true;
        }

        if (token) return true;

        return false;
      },
    },
    pages: {
      signIn: '/auth/credentials-signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);
