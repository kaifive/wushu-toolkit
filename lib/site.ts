/** Site-wide constants. Change the domain here (OPEN_QUESTIONS #5). */
export const SITE = {
  name: "Wushu Toolkit",
  tagline: "Live standings, team projections and rules tools for wushu competitions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wushu-toolkit.vercel.app",
  legacyUrl: "https://kaifive.github.io/wushu-toolkit",
  author: "Khai Nguyen",
} as const;
