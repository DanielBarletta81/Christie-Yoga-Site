const required = ['NEXT_PUBLIC_WORDPRESS_API_URL', 'NEXT_PUBLIC_FREE_CDN_BASE'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  // eslint-disable-next-line no-console
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log('Env validation passed.');
