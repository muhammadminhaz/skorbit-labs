import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Tailwind CSS is small (~18 KB), so inlining it in <head> removes the render-blocking stylesheet request
    inlineCss: true,
  },
};

export default nextConfig;
