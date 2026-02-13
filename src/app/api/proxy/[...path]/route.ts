import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Helper to forward requests to Render
async function proxyRequest(req: Request, params: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Reconstruct URL including query string
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/${params.path.join('/')}`
  );
  url.search = new URL(req.url).search; // preserve query params

  // Forward body for POST/PUT/PATCH
  let body: any;
  if (['POST', 'PUT', 'PATCH'].includes(req.method || '')) {
    body = await req.text(); // forward raw body
  }

  // Forward headers (only content-type + authorization)
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'Content-Type': req.headers.get('Content-Type') || 'application/json',
  };

  // Make request to Render API
  const apiRes = await fetch(url.toString(), {
    method: req.method,
    headers,
    body,
  });

  const data = await apiRes.text();

  // Return response to frontend, preserving content type
  return new NextResponse(data, {
    status: apiRes.status,
    headers: { 'Content-Type': apiRes.headers.get('Content-Type') || 'application/json' },
  });
}

// Export all HTTP methods
export async function GET(req: Request, { params }: any) {
  return proxyRequest(req, params);
}

export async function POST(req: Request, { params }: any) {
  return proxyRequest(req, params);
}

export async function PUT(req: Request, { params }: any) {
  return proxyRequest(req, params);
}

export async function PATCH(req: Request, { params }: any) {
  return proxyRequest(req, params);
}

export async function DELETE(req: Request, { params }: any) {
  return proxyRequest(req, params);
}
