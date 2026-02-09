import { NextResponse } from 'next/server';
import { assertServerEnv } from '../../../lib/env';

export async function POST(request) {
  let upstream;
  try {
    assertServerEnv();
    upstream = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  } catch (error) {
    return NextResponse.json(
      { errors: [{ message: error.message || 'Missing required env vars' }] },
      { status: 500 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid JSON body' }] },
      { status: 400 }
    );
  }

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const upstreamRes = await fetch(upstream, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const text = await upstreamRes.text();
  return new NextResponse(text, {
    status: upstreamRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
