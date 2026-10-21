/**
 * Minimal PDF writer: one JPEG image per page, scaled to fit the page width.
 * Enough for exported sheets without pulling in a PDF library.
 */

export interface PdfPage {
  jpeg: Uint8Array;
  width: number;
  height: number;
}

const A4 = { w: 595.28, h: 841.89 };

export function imagesToPdf(pages: PdfPage[], page = A4, margin = 24): Uint8Array {
  const enc = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let length = 0;
  const push = (b: Uint8Array | string) => {
    const bytes = typeof b === "string" ? enc.encode(b) : b;
    chunks.push(bytes);
    length += bytes.length;
  };
  const obj = (n: number, body: () => void) => {
    offsets[n] = length;
    push(`${n} 0 obj\n`);
    body();
    push("\nendobj\n");
  };

  // Objects: 1 catalog, 2 pages, then per page: page, content, image.
  const n = pages.length;
  const pageObj = (i: number) => 3 + i * 3;
  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  obj(1, () => push("<< /Type /Catalog /Pages 2 0 R >>"));
  obj(2, () => push(`<< /Type /Pages /Count ${n} /Kids [${pages.map((_, i) => `${pageObj(i)} 0 R`).join(" ")}] >>`));
  pages.forEach((p, i) => {
    const po = pageObj(i);
    const scale = Math.min((page.w - margin * 2) / p.width, (page.h - margin * 2) / p.height);
    const w = +(p.width * scale).toFixed(2);
    const h = +(p.height * scale).toFixed(2);
    const x = +((page.w - w) / 2).toFixed(2);
    const y = +(page.h - margin - h).toFixed(2);
    const content = `q ${w} 0 0 ${h} ${x} ${y} cm /Im0 Do Q`;
    obj(po, () =>
      push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.w} ${page.h}] /Resources << /XObject << /Im0 ${po + 2} 0 R >> >> /Contents ${po + 1} 0 R >>`),
    );
    obj(po + 1, () => push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`));
    obj(po + 2, () => {
      push(`<< /Type /XObject /Subtype /Image /Width ${p.width} /Height ${p.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.jpeg.length} >>\nstream\n`);
      push(p.jpeg);
      push("\nendstream");
    });
  });

  const total = 3 + n * 3;
  const xref = length;
  push(`xref\n0 ${total}\n0000000000 65535 f \n`);
  for (let i = 1; i < total; i++) push(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);

  const out = new Uint8Array(length);
  let at = 0;
  for (const ch of chunks) {
    out.set(ch, at);
    at += ch.length;
  }
  return out;
}
