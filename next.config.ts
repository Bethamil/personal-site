import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Optimize for production
  poweredByHeader: false,
  compress: true,
  // Image optimization
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
