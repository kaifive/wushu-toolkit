import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The legacy app is reference material only; never bundle it.
  outputFileTracingExcludes: { "*": ["legacy/**"] },
};

export default nextConfig;
