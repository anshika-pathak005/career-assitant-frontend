import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Enable strict mode for React */
  reactStrictMode: true,

  allowedDevOrigins: ['10.56.14.97'],

  /* Allow images from common external domains */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
    ],
  },
};

export default nextConfig;


/**
 * Next.js configuration file:
 * - Controls global settings for the Next.js application
 *
 * Features enabled:
 * - reactStrictMode: Enables additional React checks in development to catch potential bugs early
 *
 * Images configuration:
 * - Allows loading external images only from trusted domains
 * - Currently permits images from GitHub and Unsplash via remote patterns
 *
 * Execution flow:
 * - Next.js app starts
 * - next.config.ts file is read by Next.js
 * - Configuration settings are applied globally
 * - App behavior is updated based on these settings
 *
 * Purpose:
 * - Central place to define and control Next.js app-level behavior
 */