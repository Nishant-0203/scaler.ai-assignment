/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  turbopack: {
    root: path.join(process.cwd(), '../'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
