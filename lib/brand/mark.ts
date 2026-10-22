/**
 * The Wushu Toolkit mark (chosen 2026-10-22, concept 3 "Gear and spear"): a
 * qiang (spear) with its tassel driving diagonally through a gear, on the
 * vermilion seal square. One source for every use: the React LogoMark, the
 * favicon (app/icon.svg) and the export footer (canvas).
 */

/** Gear outline: square-ish teeth between radius r (root) and R (tip). */
function gearPath(cx: number, cy: number, R: number, r: number, teeth: number) {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  const at = (ang: number, rad: number) => `${(cx + Math.cos(ang) * rad).toFixed(2)} ${(cy + Math.sin(ang) * rad).toFixed(2)}`;
  for (let i = 0; i < teeth; i++) {
    const a = i * step - Math.PI / 2;
    pts.push(at(a - step * 0.28, r), at(a - step * 0.18, R), at(a + step * 0.18, R), at(a + step * 0.28, r));
  }
  return `M${pts.join(" L")} Z`;
}

const GEAR = gearPath(31, 33, 17.5, 13.8, 9);

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
    `<rect x="30.3" y="17" width="3.4" height="46" rx="1.7" fill="${ink}" ${cut}/>`,
    // tassel: a flared fan under the head, with two strand lines
    `<path d="M30 16.5 L25.2 27.5 Q32 30.5 38.8 27.5 L34 16.5 Z" fill="${ink}" ${cut}/>`,
    `<path d="M30.4 19.5 L28.2 27.6 M33.6 19.5 L35.8 27.6" stroke="${seal}" stroke-width="1.1" stroke-linecap="round"/>`,
    // head
    `<path d="M32 0.8 L36.6 12 L32 17.6 L27.4 12 Z" fill="${ink}" ${cut}/>`,
    `</g>`,
  ].join("");
}

export const markSvg = (seal = "#d4371f", ink = "#ffffff") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${markInner(seal, ink)}</svg>`;
