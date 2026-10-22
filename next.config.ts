import type { NextConfig } from "next";

/**
 * Public settings the browser needs. Vercel may have them as NEXT_PUBLIC_X or
 * NEXT_X; either works. (Only public values belong here: Firebase web config,
 * the EmailJS service id, URLs.)
 */
const PUBLIC = ["FIREBASE_API_KEY", "FIREBASE_AUTH_DOMAIN", "FIREBASE_PROJECT_ID", "FIREBASE_APP_ID", "EMAILJS_SERVICE_ID", "SITE_URL", "CONTACT_URL"];
const publicEnv = Object.fromEntries(
  PUBLIC.flatMap((k) => {
    const v = process.env[`NEXT_PUBLIC_${k}`] || process.env[`NEXT_${k}`];
    return v ? [[`NEXT_PUBLIC_${k}`, v]] : [];
  }),
);

const nextConfig: NextConfig = {
  env: publicEnv,
  reactStrictMode: true,
  poweredByHeader: false,
  // The legacy app is reference material only; never bundle it.
  outputFileTracingExcludes: { "*": ["legacy/**"] },
  // The rules page was retired; send old links to the toolkit.
  redirects: async () => [{ source: "/rules", destination: "/tools", permanent: true }],
};

export default nextConfig;
