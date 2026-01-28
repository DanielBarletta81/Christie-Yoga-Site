import { NextResponse } from 'next/server';

async function userHasEntitlement() {
  return false;
}

async function mintPaidPlaybackUrl(key) {
  const base = process.env.PAID_CDN_BASE;
  if (!base) throw new Error('Missing PAID_CDN_BASE');
  return `${base.replace(/\/$/, '')}/${String(key).replace(/^\//, '')}`;
}

export async function POST(req) {
  try {
    const { key } = await req.json();
    if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 });

    const entitled = await userHasEntitlement(req);
    if (!entitled) return NextResponse.json({ error: 'Not entitled' }, { status: 403 });

    const url = await mintPaidPlaybackUrl(key);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: 'Failed to resolve paid media' }, { status: 500 });
  }
}
