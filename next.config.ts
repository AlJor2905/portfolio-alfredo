import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // <--- AGREGAR ESTO
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
