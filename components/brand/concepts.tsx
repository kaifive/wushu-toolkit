import type { SVGProps } from "react";

/**
 * Round 3 logo directions (2026-10-22): construction tools (gear, wrench)
 * combined with wushu weapons (jian, spear, broadsword). Each sits on the
 * vermilion seal square so it works as an app icon and favicon. Shapes are
 * white with a seal-coloured outline where they overlap, so they stay apart
 * at small sizes. Delete the losers once one is picked and move the winner
 * into logo.tsx.
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

/** Gear outline: `teeth` square-ish teeth between radius r (root) and R (tip). */
function gearPath(cx: number, cy: number, R: number, r: number, teeth: number) {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step - Math.PI / 2;
    const at = (ang: number, rad: number) => `${(cx + Math.cos(ang) * rad).toFixed(2)} ${(cy + Math.sin(ang) * rad).toFixed(2)}`;
    pts.push(at(a - step * 0.28, r), at(a - step * 0.18, R), at(a + step * 0.18, R), at(a + step * 0.28, r));
  }
  return `M${pts.join(" L")} Z`;
}

/** A gear with a hole, drawn in white; the hole shows the seal through it. */
function Gear({ cx, cy, R, r, hole, teeth }: { cx: number; cy: number; R: number; r: number; hole: number; teeth: number }) {
  return (
    <g>
      <path d={gearPath(cx, cy, R, r, teeth)} fill={INK} />
      <circle cx={cx} cy={cy} r={hole} fill={SEAL} />
    </g>
  );
}

/** Outline in the seal colour so overlapping white shapes stay separate. */
const cut = { stroke: SEAL, strokeWidth: 2.2, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };

/** Vertical jian: tip at `top`, pommel near `bottom`, centred on x = 32. */
function JianUp({ top, guardY, bottom }: { top: number; guardY: number; bottom: number }) {
  return (
    <g fill={INK} {...cut}>
      <path d={`M29.6 ${guardY} L29.6 ${top + 6} L32 ${top} L34.4 ${top + 6} L34.4 ${guardY} Z`} />
      <rect x="23.5" y={guardY} width="17" height="4" rx="2" />
      <rect x="30.3" y={guardY + 4} width="3.4" height={bottom - guardY - 8} rx="1.2" />
      <circle cx="32" cy={bottom - 2.5} r="2.9" />
    </g>
  );
}

/** 1. Gear and jian: the sword is the axle of the gear. */
export function ConceptGearJian(props: P) {
  return (
    <Seal label="Gear and jian" {...props}>
      <Gear cx={32} cy={35} R={19} r={15} hole={7} teeth={10} />
      <JianUp top={5} guardY={41} bottom={60} />
    </Seal>
  );
}

/** Open-end wrench pointing up, centred on x = 32 (rotate the group to place it). */
function WrenchUp() {
  return (
    <g>
      <g fill={INK} {...cut}>
        <rect x="29" y="18" width="6" height="40" rx="3" />
        <circle cx="32" cy="14" r="9" />
      </g>
      {/* jaw opening */}
      <path d="M28.2 2 L28.2 13 L35.8 13 L35.8 2 Z" fill={SEAL} />
      <circle cx="32" cy="13.4" r="3.8" fill={SEAL} />
    </g>
  );
}

/** 2. Crossed wrench and jian, like the crossed-tools emblem. */
export function ConceptCrossed(props: P) {
  return (
    <Seal label="Crossed wrench and jian" {...props}>
      <g transform="rotate(42 32 32) translate(32 33) scale(0.94) translate(-32 -32)">
        <WrenchUp />
      </g>
      <g transform="rotate(-42 32 32)">
        <JianUp top={4} guardY={42} bottom={60} />
      </g>
    </Seal>
  );
}

/** 3. Gear with a spear (qiang) through it, tassel and all. */
export function ConceptGearSpear(props: P) {
  return (
    <Seal label="Gear and spear" {...props}>
      <Gear cx={31} cy={33} R={17} r={13.5} hole={6} teeth={9} />
      <g transform="rotate(45 32 32)">
        <g fill={INK} {...cut}>
          <rect x="30.4" y="16" width="3.2" height="46" rx="1.6" />
          <path d="M32 1 L36 13 L32 17 L28 13 Z" />
        </g>
        {/* tassel below the head */}
        <g stroke={INK} strokeWidth="1.6" strokeLinecap="round">
          <path d="M31 18 L27.5 25" />
          <path d="M32 18 L32 26" />
          <path d="M33 18 L36.5 25" />
        </g>
      </g>
    </Seal>
  );
}

/** 4. Tool-sword: a jian whose guard is a gear and whose pommel is a wrench head. */
export function ConceptToolSword(props: P) {
  return (
    <Seal label="Tool sword" {...props}>
      <g fill={INK}>
        {/* blade */}
        <path d="M29.4 34 L29.4 10 L32 3.5 L34.6 10 L34.6 34 Z" />
        {/* grip */}
        <rect x="30" y="38" width="4" height="12" rx="1.4" />
      </g>
      {/* gear guard */}
      <path d={gearPath(32, 36.5, 9, 6.8, 8)} fill={INK} {...cut} />
      <circle cx="32" cy="36.5" r="2.6" fill={SEAL} />
      {/* wrench-head pommel */}
      <circle cx="32" cy="54" r="6" fill={INK} />
      <path d="M29.3 61 L29.3 54.5 L34.7 54.5 L34.7 61 Z" fill={SEAL} />
      <circle cx="32" cy="54.6" r="2.7" fill={SEAL} />
    </Seal>
  );
}

export const CONCEPTS = [
  {
    id: "1",
    name: "Gear and jian",
    Mark: ConceptGearJian,
    idea: "A straight sword running through a gear like an axle: the machinery of a toolkit, driven by wushu.",
    strengths: ["Strong, centred silhouette; reads as a gear even at 16px", "Gear says \"tools\" without words"],
    risks: ["Gears are common in tech logos; the sword is what makes it ours"],
  },
  {
    id: "2",
    name: "Crossed wrench and jian",
    Mark: ConceptCrossed,
    idea: "The classic crossed-tools emblem, with one tool swapped for a jian.",
    strengths: ["Instantly says \"toolkit\"", "Balanced X shape works as a badge and an app icon"],
    risks: ["Crossed tools can feel like a hardware store or a club crest"],
  },
  {
    id: "3",
    name: "Gear and spear",
    Mark: ConceptGearSpear,
    idea: "A qiang (spear) with its tassel driving through a gear: motion and mechanics.",
    strengths: ["The tassel makes it unmistakably wushu", "Diagonal gives energy"],
    risks: ["Tassel lines get thin at favicon size; the spear head and gear still read"],
  },
  {
    id: "4",
    name: "Tool sword",
    Mark: ConceptToolSword,
    idea: "One object: a jian whose guard is a gear and whose pommel is a wrench head. The weapon is the tool.",
    strengths: ["Most original; a single object, not two stacked", "Tall, simple shape fits a narrow icon"],
    risks: ["Small parts (gear teeth, wrench jaw) blur below 24px"],
  },
] as const;
