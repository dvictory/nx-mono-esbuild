import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware called');
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  const allCookies = request.cookies.getAll();
  console.log('middleware', allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  response.cookies.set('vercel', 'fast');
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

  return response;
}
