import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Call backend login endpoint
    const apiRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      body,
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );

    const data = apiRes.data;

    // Build response
    const response = NextResponse.json({ message: 'Login successfully', user: data.user });

    const isProd = process.env.NODE_ENV === 'production';

    // Set cookies for accessToken and role
    response.cookies.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hr
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.response?.data?.message || 'Login failed' },
      { status: err.response?.status || 500 }
    );
  }
}