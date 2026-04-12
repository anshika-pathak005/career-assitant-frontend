import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Enable strict mode for React */
  reactStrictMode: true,

  /* Allow images from common external domains */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
    ],
  },
};

export default nextConfig;
