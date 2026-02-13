import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: any) {
  const cookie = await cookies();
  const token = cookie.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await apiRes.json();

  const response = NextResponse.json(data);

  // 🔥 This fixes staging issue
  response.cookies.set('role', data.role, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
}
