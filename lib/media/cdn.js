const rawBase =
  process.env.NEXT_PUBLIC_FREE_CDN_BASE || 'https://d3mdyp51y1nfve.cloudfront.net';

export const CDN_BASE = rawBase.endsWith('/img')
  ? rawBase
  : `${rawBase.replace(/\/$/, '')}/img`;
