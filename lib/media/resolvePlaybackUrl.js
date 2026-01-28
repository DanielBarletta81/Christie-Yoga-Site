function join(base, key) {
  return `${base.replace(/\/$/, '')}/${String(key).replace(/^\//, '')}`;
}

export async function resolvePlaybackUrl(media) {
  if (!media) return null;

  if (media.src) return media.src;

  if (media.provider === 'freeCdn' && media.key) {
    const base = process.env.NEXT_PUBLIC_FREE_CDN_BASE;
    if (!base) throw new Error('Missing NEXT_PUBLIC_FREE_CDN_BASE');
    return join(base, media.key);
  }

  if (media.provider === 'paidCdn' && media.key) {
    const res = await fetch('/api/media/paid-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: media.key }),
    });

    if (res.status === 401 || res.status === 403) return null;
    if (!res.ok) throw new Error('Failed to resolve paid media URL');

    const data = await res.json();
    return data.url;
  }

  return null;
}

export async function resolvePosterUrl(media) {
  if (!media) return null;
  if (media.posterSrc) return media.posterSrc;

  if (media.provider === 'freeCdn' && media.posterKey) {
    const base = process.env.NEXT_PUBLIC_FREE_CDN_BASE;
    if (!base) return null;
    return join(base, media.posterKey);
  }

  return null;
}
