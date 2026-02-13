import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('calling from next route: /login')
  const body = await req.json();

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!apiRes.ok) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const data = await apiRes.json();

  const response = NextResponse.json({ success: true });

  // 🔥 This fixes your staging issue
  response.cookies.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
}