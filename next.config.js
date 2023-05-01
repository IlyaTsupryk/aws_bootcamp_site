/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ilyats-aws-engx-images.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/nfts/**',
      },
    ],
  },
}

module.exports = nextConfig
