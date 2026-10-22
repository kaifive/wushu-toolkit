/**
 * The Wushu Toolkit mark (chosen 2026-10-22, concept 3 "Gear and spear"): a
 * qiang (spear) with its tassel driving diagonally through a gear, on the
 * vermilion seal square. One source for every use: the React LogoMark, the
 * favicon (app/icon.svg) and the export footer (canvas).
 */

/**
 * Gear outline: `teeth` evenly spaced square-ish teeth between radius r (root)
 * and R (tip). The first tooth points at `start` (radians); teeth listed in
 * `skip` are left out (the spear takes their place).
 */
function gearPath(cx: number, cy: number, R: number, r: number, teeth: number, start: number, skip: number[] = []) {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  const at = (ang: number, rad: number) => `${(cx + Math.cos(ang) * rad).toFixed(2)} ${(cy + Math.sin(ang) * rad).toFixed(2)}`;
  for (let i = 0; i < teeth; i++) {
    const a = start + i * step;
    if (skip.includes(i)) pts.push(at(a - step * 0.28, r), at(a + step * 0.28, r));
    else pts.push(at(a - step * 0.28, r), at(a - step * 0.18, R), at(a + step * 0.18, R), at(a + step * 0.28, r));
  }
  return `M${pts.join(" L")} Z`;
}

// Eight teeth, two of them on the spear's line (up-right and down-left, 45°):
// the spear replaces those two, so the others sit evenly around it.
/** Tassel strands, spear upright (the group is turned 45° after). */
const TASSEL = "M30.6 18.4 Q28.6 23 25.6 27.6 M31.3 18.6 Q29.6 24.6 28.6 30 M32.7 18.6 Q34.4 24.6 35.4 30 M33.4 18.4 Q35.4 23 38.4 27.6";

const GEAR = gearPath(31, 33, 17.5, 13.8, 8, -Math.PI / 4, [0, 4]);

/**
 * Inner SVG (viewBox 0 0 64 64). `seal` and `ink` are colours (or CSS
 * variables in the app, so dark mode can lighten the seal).
 */
/** Tassel styles under the spear head (spear upright; the group is turned 45° after). Drawn behind the shaft. */
export type TasselStyle = "strands" | "strands5" | "fan" | "windswept" | "knot" | "ribbons" | "flame";
export const TASSEL_STYLES: { id: TasselStyle; name: string }[] = [
  { id: "strands", name: "Strands (current)" },
  { id: "fan", name: "Fan" },
  { id: "windswept", name: "Windswept" },
  { id: "knot", name: "Knot and strands" },
  { id: "ribbons", name: "Ribbons" },
  { id: "flame", name: "Flame" },
];

function tassel(style: TasselStyle, seal: string, ink: string): string {
  const edge = (d: string, w: number) =>
    `<path d="${d}" stroke="${seal}" stroke-width="${w + 2.4}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` +
    `<path d="${d}" stroke="${ink}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  const shape = (d: string) => `<path d="${d}" fill="${ink}" stroke="${seal}" stroke-width="2.4" paint-order="stroke" stroke-linejoin="round"/>`;
  switch (style) {
    case "strands":
      return edge(TASSEL, 2);
    case "strands5":
      // five strands, the middle one running down over the shaft
      return edge("M30.6 18.4 Q28.2 23 25 27.4 M31.2 18.6 Q29.4 24.4 28.2 29.8 M32 18.8 L32 31 M32.8 18.6 Q34.6 24.4 35.8 29.8 M33.4 18.4 Q35.8 23 39 27.4", 1.9);
    case "fan":
      return shape("M30.6 18 Q25 25 25.8 31 Q32 33.4 38.2 31 Q39 25 33.4 18 Z");
    case "windswept":
      // all strands blown to one side, like the tassel mid-thrust
      return edge("M31 18.4 Q27 21 22.5 25.2 M31.4 18.8 Q27.6 23.4 24.2 28.6 M32 19 Q29.4 25 27.2 31", 2.1);
    case "knot":
      return edge("M31.2 21 Q29 25.5 27.4 29.6 M32 21.6 L32 31 M32.8 21 Q35 25.5 36.6 29.6", 2) + `<circle cx="32" cy="19.8" r="3" fill="${ink}" stroke="${seal}" stroke-width="2.4" paint-order="stroke"/>`;
    case "ribbons":
      return edge("M30.6 18.4 C27 22 30.6 25.4 27 29.4 C25 31.8 27 34 25 37", 1.9) + edge("M33.4 18.4 C37 22 33.4 25.4 37 29.4 C39 31.8 37 34 39 37", 1.9);
    case "flame":
      // one bold swept shape, like a flame trailing the head
      return shape("M30.8 18 C26 21 21.5 24 20 30.5 C24.8 30 28.6 27 31.4 23.4 C30.8 27 31.8 30 33 32.5 C34.6 28.5 34.6 22.5 33.2 18 Z");
  }
}

export function markInner(seal: string, ink: string, style: TasselStyle = "strands", tasselInk = ink, tasselOnTop = false): string {
  const cut = `stroke="${seal}" stroke-width="2.4" paint-order="stroke" stroke-linejoin="round"`;
  return [
    `<rect x="2" y="2" width="60" height="60" rx="13" fill="${seal}"/>`,
    `<path d="${GEAR}" fill="${ink}"/>`,
    `<circle cx="31" cy="33" r="6.2" fill="${seal}"/>`,
    // Spear drawn upright, then turned 45° so it runs bottom-left to top-right.
    `<g transform="rotate(45 32 32)">`,
    // tassel behind the shaft (or in front, below), with a seal edge so it reads over the gear
    tasselOnTop ? "" : tassel(style, seal, tasselInk),
    // shaft, one piece from the butt up into the head; outlined where it crosses the gear
    `<rect x="30.3" y="12" width="3.4" height="51" rx="1.7" fill="${ink}" ${cut}/>`,
    // collar and head (outside the gear, so no outline: they join the shaft)
    `<rect x="29.2" y="15.6" width="5.6" height="2.6" rx="1.2" fill="${ink}"/>`,
    tasselOnTop ? tassel(style, seal, tasselInk) : "",
    `<path d="M32 0.8 L36.8 11.5 L32 16.4 L27.2 11.5 Z" fill="${ink}"/>`,
    `</g>`,
  ].join("");
}

export const markSvg = (seal = "#d4371f", ink = "#ffffff", style: TasselStyle = "strands", tasselInk = ink, tasselOnTop = false) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${markInner(seal, ink, style, tasselInk, tasselOnTop)}</svg>`;
