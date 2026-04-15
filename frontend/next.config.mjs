/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  turbopack: {
    root: path.join(process.cwd(), '../'),
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization for external images in production
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
