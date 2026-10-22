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
export function markInner(seal: string, ink: string): string {
  const cut = `stroke="${seal}" stroke-width="2.4" paint-order="stroke" stroke-linejoin="round"`;
  return [
    `<rect x="2" y="2" width="60" height="60" rx="13" fill="${seal}"/>`,
    `<path d="${GEAR}" fill="${ink}"/>`,
    `<circle cx="31" cy="33" r="6.2" fill="${seal}"/>`,
    // Spear drawn upright, then turned 45° so it runs bottom-left to top-right.
    `<g transform="rotate(45 32 32)">`,
    // tassel behind the shaft: strands splaying back from the neck, with a seal edge so they read over the gear
    `<path d="${TASSEL}" stroke="${seal}" stroke-width="4.4" stroke-linecap="round" fill="none"/>`,
    `<path d="${TASSEL}" stroke="${ink}" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    // shaft, one piece from the butt up into the head; outlined where it crosses the gear
    `<rect x="30.3" y="12" width="3.4" height="51" rx="1.7" fill="${ink}" ${cut}/>`,
    // collar and head (outside the gear, so no outline: they join the shaft)
    `<rect x="29.2" y="15.6" width="5.6" height="2.6" rx="1.2" fill="${ink}"/>`,
    `<path d="M32 0.8 L36.8 11.5 L32 16.4 L27.2 11.5 Z" fill="${ink}"/>`,
    `</g>`,
  ].join("");
}

export const markSvg = (seal = "#d4371f", ink = "#ffffff") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${markInner(seal, ink)}</svg>`;
