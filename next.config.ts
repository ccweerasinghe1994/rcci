import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    middleware: {
      // Use Node.js runtime for middleware
      runtime: "nodejs",
    },
  },
};

export default nextConfig;
