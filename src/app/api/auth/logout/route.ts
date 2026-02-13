import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: any) {
  const cookie = await cookies();
  const token = cookie.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

    // Build response
  const response = NextResponse.json({ message: 'Logged out successfully' });

  const isProd = process.env.NODE_ENV === 'production';

  // Clear cookies by setting them with maxAge=0
  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: 0,
  });

  response.cookies.set('role', '', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
