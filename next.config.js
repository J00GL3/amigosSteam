/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.akamai.steamstatic.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
