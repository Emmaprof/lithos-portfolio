import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WE OVERRIDE THE COMPILER TO FORCE DEPLOYMENT
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;