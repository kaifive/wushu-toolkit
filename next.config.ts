import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The legacy app is reference material only; never bundle it.
  outputFileTracingExcludes: { "*": ["legacy/**"] },
  // The rules page was retired; send old links to the toolkit.
  redirects: async () => [{ source: "/rules", destination: "/tools", permanent: true }],
};

export default nextConfig;
