const REQUIRED_CLIENT = ['NEXT_PUBLIC_WORDPRESS_API_URL', 'NEXT_PUBLIC_FREE_CDN_BASE'];
const OPTIONAL_SERVER = ['WP_PREVIEW_BASIC_AUTH', 'PAID_CDN_BASE'];

function collectMissing(keys, source) {
  return keys.filter((key) => !source[key]);
}

export function assertClientEnv() {
  if (typeof window === 'undefined') return { missing: [], ok: true };
  const missing = collectMissing(REQUIRED_CLIENT, process.env);
  if (missing.length) {
    const message = `Missing required env vars: ${missing.join(', ')}`;
    // eslint-disable-next-line no-console
    console.error(message);
    return { missing, ok: false, message };
  }
  return { missing: [], ok: true };
}

export function assertServerEnv() {
  const missing = collectMissing(REQUIRED_CLIENT, process.env);
  if (missing.length) {
    const message = `Missing required env vars: ${missing.join(', ')}`;
    throw new Error(message);
  }
  return { optionalMissing: collectMissing(OPTIONAL_SERVER, process.env) };
}

export function getOptionalServerEnv() {
  return collectMissing(OPTIONAL_SERVER, process.env);
}
