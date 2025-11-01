import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/xianmotion',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
