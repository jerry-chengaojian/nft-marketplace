import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '110.40.136.51' },
    ],
  },
};

export default nextConfig;
