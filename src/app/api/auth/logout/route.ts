// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Call backend logout endpoint with fetch
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!apiRes.ok) {
      throw new Error(`Logout failed: ${apiRes.status}`);
    }
  } catch (err) {
    console.error('Backend logout failed', err);
  }

  const response = NextResponse.json({ message: 'Logged out successfully' });

  const isProd = process.env.NODE_ENV === 'production';

  // Clear cookies
  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  response.cookies.set('role', '', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}