import type { SVGProps } from "react";
import { LogoMark } from "./logo";

/**
 * Three logo directions for review (see /brand). Concept A is the current
 * mark in logo.tsx. B and C are alternatives; delete the losers once one is picked.
 */

type P = SVGProps<SVGSVGElement>;

/** B: brushed ensō ring with a jian cutting through its opening. */
export function ConceptEnso(props: P) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Concept B" {...props}>
      {/* ensō: thick open ring, heavier at the start like a brush stroke */}
      <path d="M44.5 12.6 A22 22 0 1 0 54 32" fill="none" stroke="var(--ink, #1b1a17)" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M44.5 12.6 A22 22 0 0 0 20 14.5" fill="none" stroke="var(--ink, #1b1a17)" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
      {/* jian, bottom-left to top-right, tip in vermilion */}
      <g transform="rotate(45 32 32)">
        <path d="M30.6 40 L32 2.5 L33.4 40 Z" fill="var(--seal, #c8321e)" />
        <rect x="26.5" y="39.5" width="11" height="3" rx="1.5" fill="var(--ink, #1b1a17)" />
        <rect x="30.8" y="42.5" width="2.4" height="8" rx="1" fill="var(--ink, #1b1a17)" />
        <circle cx="32" cy="52.5" r="2.4" fill="var(--ink, #1b1a17)" />
      </g>
    </svg>
  );
}

/** C: score dial. Three ticks for the A/B/C judging panels; a jian is the needle. */
export function ConceptDial(props: P) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Concept C" {...props}>
      <circle cx="32" cy="34" r="24" fill="var(--surface, #fff)" stroke="var(--ink, #1b1a17)" strokeWidth="4" />
      {/* panel ticks at 10, 12 and 2 o'clock */}
      <g stroke="var(--ink, #1b1a17)" strokeWidth="3.5" strokeLinecap="round">
        <path d="M16.4 22.7 L19.6 25" />
        <path d="M32 13.5 L32 17.5" />
        <path d="M47.6 22.7 L44.4 25" />
      </g>
      {/* needle: jian pointing to ~1 o'clock */}
      <g transform="rotate(28 32 34)">
        <path d="M30.7 36 L32 9 L33.3 36 Z" fill="var(--seal, #c8321e)" />
        <rect x="27.5" y="35" width="9" height="2.8" rx="1.4" fill="var(--ink, #1b1a17)" />
      </g>
      <circle cx="32" cy="40.5" r="3.4" fill="var(--ink, #1b1a17)" />
    </svg>
  );
}

export const CONCEPTS = [
  {
    id: "A",
    name: "Seal",
    Mark: LogoMark,
    idea: "A vermilion name seal (印章) holding a W. The W's middle peak becomes a jian whose tip breaks out of the seal.",
    strengths: ["Most distinctive; reads as Chinese martial arts at a glance", "Seal shape makes a solid app icon and favicon"],
    risks: ["The blade is thin at 16px and turns into a notch"],
  },
  {
    id: "B",
    name: "Ensō",
    Mark: ConceptEnso,
    idea: "A brushed ensō circle (discipline, one breath) cut through its opening by a jian with a vermilion blade.",
    strengths: ["Calm and premium; works in one color", "Strong silhouette at any size"],
    risks: ["The ensō is closer to Zen and Japanese ink than to wushu", "Doesn't spell the name"],
  },
  {
    id: "C",
    name: "Dial",
    Mark: ConceptDial,
    idea: "A score dial with three ticks for the A/B/C judging panels; the needle is a jian. Says \"scores and standings\".",
    strengths: ["Explains the product: live scores", "Friendly and modern for a SaaS landing page"],
    risks: ["Least culturally specific", "Busier detail at favicon size"],
  },
] as const;
