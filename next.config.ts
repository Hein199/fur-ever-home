import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["*"],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'picsum.photos',

    }],
  }
};

export default nextConfig;
