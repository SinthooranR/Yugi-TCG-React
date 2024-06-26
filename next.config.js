/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ygoprodeck.com",
      },
    ],
  },
  env: {
    API_URL_DEV: process.env.NEXT_PUBLIC_API_URL_DEV,
  },
};

module.exports = nextConfig;
