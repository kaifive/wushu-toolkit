import type { SVGProps } from "react";

/**
 * Round 2 logo directions: "a toolkit for wushu". Each sits on the vermilion
 * seal square so it works as an app icon and favicon. Delete the losers once
 * one is picked and move the winner into logo.tsx.
 */

type P = SVGProps<SVGSVGElement>;
const SEAL = "var(--seal, #d4371f)";
const INK = "#fff";

function Seal({ children, label, ...props }: P & { label: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={label} {...props}>
      <rect x="2" y="2" width="60" height="60" rx="13" fill={SEAL} />
      {children}
    </svg>
  );
}

/** Jian pointing up, centred at (32, 32) before any rotation. */
function Jian({ fill = INK, length = 1 }: { fill?: string; length?: number }) {
  const tip = 32 - 25 * length;
  return (
    <g fill={fill}>
      <path d={`M29.8 37 L32 ${tip} L34.2 37 Z`} />
      <rect x="24.5" y="36.5" width="15" height="4" rx="2" />
      <rect x="30.4" y="40.5" width="3.2" height="9" rx="1.2" />
      <circle cx="32" cy="52.5" r="2.8" />
    </g>
  );
}

/** 1. Crossed weapons: jian over gun, like the crossed-wrench toolkit emblem. */
export function ConceptCrossed(props: P) {
  return (
    <Seal label="Crossed weapons" {...props}>
      {/* gun (staff), bottom-right to top-left */}
      <g transform="rotate(-45 32 32)">
        <rect x="28.5" y="4" width="7" height="56" rx="3.5" fill={INK} />
        <rect x="28.5" y="10" width="7" height="2.6" fill={SEAL} />
        <rect x="28.5" y="51.4" width="7" height="2.6" fill={SEAL} />
      </g>
      {/* jian on top, with a seal-coloured outline where it crosses the staff */}
      <g transform="rotate(45 32 32) translate(32 32) scale(1.2) translate(-32 -32)">
        <g stroke={SEAL} strokeWidth="2.6" strokeLinejoin="round">
          <Jian />
        </g>
        <Jian />
      </g>
    </Seal>
  );
}

/** 2. Toolbox: a kit with a jian standing out of it. */
export function ConceptToolbox(props: P) {
  return (
    <Seal label="Toolbox" {...props}>
      {/* jian rising out of the box at an angle, behind the lid */}
      <g transform="translate(9 -6) rotate(28 32 32)">
        <path d="M30.2 34 L32 8 L33.8 34 Z" fill={INK} />
        <rect x="25.5" y="32" width="13" height="3.6" rx="1.8" fill={INK} />
      </g>
      {/* handle */}
      <path d="M20 31 V25.5 A3.5 3.5 0 0 1 23.5 22 H29.5 A3.5 3.5 0 0 1 33 25.5 V31" fill="none" stroke={INK} strokeWidth="3.6" />
      {/* box: lid band, split line, body */}
      <rect x="10" y="30" width="44" height="23" rx="4" fill={INK} />
      <rect x="10" y="37" width="44" height="2.4" fill={SEAL} />
      <rect x="28.5" y="34.5" width="7" height="7" rx="1.5" fill={SEAL} />
    </Seal>
  );
}

/** 3. Multi-tool: a folding knife whose tools are a jian and a fan. */
export function ConceptMultitool(props: P) {
  return (
    <Seal label="Multi-tool" {...props}>
      {/* fan opening up-left from the pivot (20, 36) */}
      <path d="M20 36 L2.7 26 A20 20 0 0 1 18.3 16.1 Z" fill={INK} />
      <g stroke={SEAL} strokeWidth="1.5" strokeLinecap="round">
        <path d="M20 36 L5.6 22.1" />
        <path d="M20 36 L9.4 19" />
        <path d="M20 36 L13.8 17" />
      </g>
      {/* jian blade up-right */}
      <path d="M17.8 36 L20 3 L22.2 36 Z" fill={INK} transform="rotate(40 20 36)" />
      {/* handle down-right */}
      <rect x="20" y="30" width="38" height="12" rx="6" fill={INK} transform="rotate(32 20 36)" />
      <circle cx="20" cy="36" r="3.2" fill={SEAL} />
    </Seal>
  );
}

/** 4. Kit grid: four tiles, one per tool: jian, fan, standings, timer. */
export function ConceptGrid(props: P) {
  const tile = (x: number, y: number) => <rect x={x} y={y} width="24" height="24" rx="5" fill={INK} />;
  return (
    <Seal label="Kit grid" {...props}>
      {tile(6, 6)}
      {tile(34, 6)}
      {tile(6, 34)}
      {tile(34, 34)}
      {/* jian */}
      <g transform="translate(-14 -14) rotate(45 32 32) translate(32 32) scale(0.38) translate(-32 -32)">
        <Jian fill={SEAL} />
      </g>
      {/* fan */}
      <path d="M46 26 L37.5 14.5 A13 13 0 0 1 54.5 14.5 Z" fill={SEAL} />
      {/* standings bars */}
      <g fill={SEAL}>
        <rect x="10.5" y="47" width="4.2" height="7" rx="1" />
        <rect x="15.9" y="41" width="4.2" height="13" rx="1" />
        <rect x="21.3" y="44" width="4.2" height="10" rx="1" />
      </g>
      {/* timer */}
      <circle cx="46" cy="47.5" r="7.2" fill="none" stroke={SEAL} strokeWidth="2.6" />
      <rect x="44.5" y="37" width="3" height="3" rx="0.8" fill={SEAL} />
      <path d="M46 47.5 L49 43.6" stroke={SEAL} strokeWidth="2.2" strokeLinecap="round" />
    </Seal>
  );
}

export const CONCEPTS = [
  {
    id: "1",
    name: "Crossed weapons",
    Mark: ConceptCrossed,
    idea: "A jian crossed over a staff, the way crossed wrenches mean \"tools\". The weapons are the toolkit.",
    strengths: ["Reads as both martial arts and tools at a glance", "Bold, simple shapes survive at 16px"],
    risks: ["Crossed weapons can feel like a club crest rather than an app"],
  },
  {
    id: "2",
    name: "Toolbox",
    Mark: ConceptToolbox,
    idea: "A toolbox with a jian standing out of it: literally a toolkit for wushu.",
    strengths: ["Says \"toolkit\" most directly", "Friendly; fits a free utility"],
    risks: ["The blade gets thin at favicon size; the box alone still reads"],
  },
  {
    id: "3",
    name: "Multi-tool",
    Mark: ConceptMultitool,
    idea: "A pocket multi-tool whose blades are a jian and an opening fan. One thing, many tools.",
    strengths: ["Most original idea of the set", "Matches the product: many small tools in one app"],
    risks: ["Most detail; needs the most care at 16px"],
  },
  {
    id: "4",
    name: "Kit grid",
    Mark: ConceptGrid,
    idea: "Four tiles like a tool drawer: jian, fan, standings bars and a timer. Shows what's inside.",
    strengths: ["Explains the product: weapons rules, scores and schedules", "Clean grid fits the slate UI"],
    risks: ["Generic app-grid shape at small sizes; the glyphs carry the meaning"],
  },
] as const;
