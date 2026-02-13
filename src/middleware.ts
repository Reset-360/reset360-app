import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose'; // Lightweight and Edge-compatible

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const role = req.cookies.get('role')?.value;
  const url = req.nextUrl.clone();

  if (!token || !role) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  try {
    // 1. Role-based protection logic
    if (role === 'CLIENT' && !url.pathname.startsWith('/client')) {
      url.pathname = '/client/dashboard'; // Redirect to their actual home
      return NextResponse.redirect(url);
    }

    if (role === 'COACH' && !url.pathname.startsWith('/coach')) {
      url.pathname = '/coach/dashboard';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error)

    // If decoding fails (malformed token), treat as unauthenticated
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/client/:path*', '/coach/:path*'],
};