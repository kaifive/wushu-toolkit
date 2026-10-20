import next from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  { ignores: ["legacy/**", ".next/**", "node_modules/**", "next-env.d.ts", "public/**"] },
  ...next,
  ...nextTs,
];

export default config;
