import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // OpenNext handles the build for Cloudflare Workers — no output: 'export' needed
  images: {
    // Cloudflare Workers doesn't support Next.js image optimization
    unoptimized: true,
  },
};

export default nextConfig;
