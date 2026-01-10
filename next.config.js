/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-wordpress-domain.com'], // Add your WordPress domain here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
