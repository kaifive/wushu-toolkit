/** Site-wide constants. Change the domain here (OPEN_QUESTIONS #5). */
export const SITE = {
  name: "Wushu Toolkit",
  tagline: "Live standings, team projections and rules tools for wushu competitions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wushu-toolkit.vercel.app",
  legacyUrl: "https://kaifive.github.io/wushu-toolkit",
  /** Where "Request a pass" goes until payments exist (OPEN_QUESTIONS #3). */
  contactUrl: process.env.NEXT_PUBLIC_CONTACT_URL ?? "/about#contact",
  author: "Khai Nguyen",
} as const;
