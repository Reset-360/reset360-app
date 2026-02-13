import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Helper to forward requests to Render
async function proxyRequest(req: Request, params: { path: string[] }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/${params.path.join('/')}`);
  url.search = new URL(req.url).search;

  let body: any;
  if (['POST', 'PUT', 'PATCH'].includes(req.method || '')) {
    body = await req.text();
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'Content-Type': req.headers.get('Content-Type') || 'application/json',
  };

  const apiRes = await fetch(url.toString(), {
    method: req.method,
    headers,
    body,
  });

  const data = await apiRes.text();

  return new NextResponse(data, {
    status: apiRes.status,
    headers: { 'Content-Type': apiRes.headers.get('Content-Type') || 'application/json' },
  });
}

// Export all HTTP methods
export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params);
}

export async function POST(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params);
}

export async function PUT(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params);
}
