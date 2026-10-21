import { SITE } from "@/lib/site";
import type { Block, Cell, Sheet } from "./sheet";
import { imagesToPdf } from "./pdf";

/**
 * Draws a Sheet onto canvases (browser only). Always light colours so exports
 * print well whatever theme the viewer uses. Long sheets split into pages
 * between rows; every page carries the "Powered by Wushu Toolkit" footer.
 */

const BASE_W = 1080;
const MAX_W = 2400;
/** Most mobile browsers refuse canvases above ~16.7M pixels (iOS Safari). */
const MAX_PIXELS = 16_000_000;
const PAD = 48;
const FOOTER = 76;
const C = { paper: "#ffffff", strip: "#f3f4f7", ink: "#1f2430", muted: "#5c6577", line: "#dbdfe6", chrome: "#212631", chromeInk: "#e8eaef", chromeMuted: "#8a93a6", seal: "#d4371f", primary: "#5856d6" };

interface Fonts {
  sans: string;
  display: string;
}

function fonts(): Fonts {
  const root = getComputedStyle(document.documentElement);
  const sans = root.getPropertyValue("--font-barlow").trim() || getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
  const display = root.getPropertyValue("--font-barlow-condensed").trim() || sans;
  return { sans, display };
}

async function ensureFonts(f: Fonts) {
  try {
    await Promise.all([document.fonts.load(`400 24px ${f.sans}`), document.fonts.load(`600 24px ${f.sans}`), document.fonts.load(`700 44px ${f.display}`)]);
  } catch {
    /* fall back to whatever is loaded */
  }
}

interface Unit {
  h: number;
  draw: (ctx: CanvasRenderingContext2D, y: number) => void;
  /** Table header to repeat at the top of a continuation page. */
  header?: Unit;
}

function fit(ctx: CanvasRenderingContext2D, text: string, max: number): string {
  if (ctx.measureText(text).width <= max) return text;
  let lo = 0;
  let hi = text.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (ctx.measureText(`${text.slice(0, mid)}…`).width <= max) lo = mid;
    else hi = mid - 1;
  }
  return `${text.slice(0, lo)}…`;
}

function strikeThrough(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.stroke();
  ctx.restore();
}

function cellStyle(cell: Cell, f: Fonts, size: number) {
  return { font: `${cell.bold ? 600 : 400} ${size}px ${f.sans}`, color: cell.miss ? C.seal : cell.muted ? C.muted : C.ink };
}

/** Natural width of each column: its widest cell or label, plus padding. */
function naturalWidths(ctx: CanvasRenderingContext2D, block: Extract<Block, { kind: "table" }>, f: Fonts): number[] {
  return block.columns.map((col, i) => {
    ctx.font = `600 20px ${f.sans}`;
    let w = ctx.measureText(col.label).width;
    for (const row of block.rows) {
      const cell = row[i];
      if (!cell) continue;
      ctx.font = cellStyle(cell, f, 24).font;
      w = Math.max(w, ctx.measureText(cell.text).width);
    }
    return Math.ceil(w) + 24;
  });
}

/** Width a sheet needs so no table column is cut. */
function sheetWidth(ctx: CanvasRenderingContext2D, sheet: Sheet, f: Fonts): number {
  let need = BASE_W;
  for (const b of sheet.blocks) if (b.kind === "table") need = Math.max(need, PAD * 2 + naturalWidths(ctx, b, f).reduce((a, x) => a + x, 0));
  return Math.min(MAX_W, need);
}

function tableUnits(ctx: CanvasRenderingContext2D, block: Extract<Block, { kind: "table" }>, f: Fonts, W: number): Unit[] {
  const inner = W - PAD * 2;
  // Columns get their natural width; spare room goes to the flexible (weight > 1) columns.
  const nat = naturalWidths(ctx, block, f);
  const spare = Math.max(0, inner - nat.reduce((a, x) => a + x, 0));
  const flex = block.columns.map((c) => Math.max(0, (c.weight ?? 1) - 1));
  const flexTotal = flex.reduce((a, x) => a + x, 0) || 1;
  const scale = Math.min(1, inner / nat.reduce((a, x) => a + x, 0));
  const xs: { x: number; w: number }[] = [];
  let x = PAD;
  block.columns.forEach((_, i) => {
    const w = nat[i]! * scale + (spare * flex[i]!) / flexTotal;
    xs.push({ x, w });
    x += w;
  });
  const cellX = (i: number, text: string) => {
    const col = block.columns[i]!;
    const { x: cx, w } = xs[i]!;
    return col.align === "right" ? cx + w - 12 - ctx.measureText(text).width : cx + 12;
  };

  const header: Unit = {
    h: 48,
    draw: (g, y) => {
      g.fillStyle = C.strip;
      g.fillRect(PAD, y, inner, 48);
      g.font = `600 20px ${f.sans}`;
      g.fillStyle = C.muted;
      g.textBaseline = "middle";
      block.columns.forEach((col, i) => {
        const t = fit(g, col.label, xs[i]!.w - 24);
        g.fillText(t, cellX(i, t), y + 24);
      });
      g.fillStyle = C.line;
      g.fillRect(PAD, y + 47, inner, 1);
    },
  };

  const units: Unit[] = [];
  if (block.heading) units.push(headingUnit(block.heading, f));
  units.push(header);
  block.rows.forEach((row, r) => {
    units.push({
      h: 52,
      header,
      draw: (g, y) => {
        if (r % 2 === 1) {
          g.fillStyle = "#f8f9fb";
          g.fillRect(PAD, y, inner, 52);
        }
        g.textBaseline = "middle";
        row.forEach((cell, i) => {
          const s = cellStyle(cell, f, 24);
          g.font = s.font;
          g.fillStyle = s.color;
          const t = fit(g, cell.text, xs[i]!.w - 24);
          const tx = cellX(i, t);
          g.fillText(t, tx, y + 26);
          if (cell.strike || cell.miss) strikeThrough(g, tx, y + 27, g.measureText(t).width, s.color);
        });
        g.fillStyle = C.line;
        g.fillRect(PAD, y + 51, inner, 1);
      },
    });
  });
  return units;
}

function headingUnit(text: string, f: Fonts): Unit {
  return {
    h: 56,
    draw: (g, y) => {
      g.font = `700 30px ${f.display}`;
      g.fillStyle = C.ink;
      g.textBaseline = "alphabetic";
      g.fillText(text, PAD, y + 40);
    },
  };
}

function fieldUnits(ctx: CanvasRenderingContext2D, block: Extract<Block, { kind: "fields" }>, f: Fonts, W: number): Unit[] {
  const units: Unit[] = [];
  if (block.heading) units.push(headingUnit(block.heading, f));
  const inner = W - PAD * 2;
  for (const item of block.items) {
    // Lay out value tokens in wrapped lines.
    const lines: { cell: Cell; x: number }[][] = [[]];
    let x = 0;
    for (const cell of item.value) {
      ctx.font = cellStyle(cell, f, 26).font;
      const w = ctx.measureText(cell.text).width;
      if (x > 0 && x + w > inner) {
        lines.push([]);
        x = 0;
      }
      lines[lines.length - 1]!.push({ cell, x });
      x += w + 20;
    }
    const h = 40 + lines.length * 38 + 16;
    units.push({
      h,
      draw: (g, y) => {
        g.textBaseline = "alphabetic";
        g.font = `600 20px ${f.sans}`;
        g.fillStyle = C.muted;
        g.fillText(item.label.toUpperCase(), PAD, y + 28);
        lines.forEach((line, li) => {
          for (const { cell, x: lx } of line) {
            const s = cellStyle(cell, f, 26);
            g.font = s.font;
            g.fillStyle = s.color;
            const by = y + 40 + 28 + li * 38;
            g.fillText(cell.text, PAD + lx, by);
            if (cell.strike || cell.miss) strikeThrough(g, PAD + lx, by - 9, g.measureText(cell.text).width, s.color);
          }
        });
        g.fillStyle = C.line;
        g.fillRect(PAD, y + h - 1, inner, 1);
      },
    });
  }
  return units;
}

function titleUnit(sheet: Sheet, f: Fonts, cont: boolean, W: number): Unit {
  const h = cont ? 72 : sheet.subtitle ? 128 : 96;
  return {
    h,
    draw: (g, y) => {
      g.textBaseline = "alphabetic";
      g.fillStyle = C.ink;
      g.font = `700 ${cont ? 30 : 48}px ${f.display}`;
      g.fillText(fit(g, cont ? `${sheet.title} (cont.)` : sheet.title, W - PAD * 2), PAD, y + (cont ? 44 : 60));
      if (!cont && sheet.subtitle) {
        g.font = `400 24px ${f.sans}`;
        g.fillStyle = C.muted;
        g.fillText(fit(g, sheet.subtitle, W - PAD * 2), PAD, y + 98);
      }
    },
  };
}

function drawFooter(g: CanvasRenderingContext2D, y: number, f: Fonts, W: number) {
  g.fillStyle = C.chrome;
  g.fillRect(0, y, W, FOOTER);
  // Seal mark: vermilion square with a W.
  g.fillStyle = C.seal;
  g.beginPath();
  g.roundRect(PAD, y + 18, 40, 40, 6);
  g.fill();
  g.fillStyle = "#ffffff";
  g.font = `700 30px ${f.display}`;
  g.textBaseline = "middle";
  g.fillText("W", PAD + 20 - g.measureText("W").width / 2, y + 39);
  g.font = `600 24px ${f.sans}`;
  g.fillStyle = C.chromeInk;
  g.fillText("Powered by Wushu Toolkit", PAD + 56, y + 38);
  const url = SITE.url.replace(/^https?:\/\//, "");
  g.font = `400 22px ${f.sans}`;
  g.fillStyle = C.chromeMuted;
  g.fillText(url, W - PAD - g.measureText(url).width, y + 38);
}

/** Render to one canvas per page. `pageHeight` = Infinity gives a single image. */
export async function renderSheet(sheet: Sheet, pageHeight = Infinity, scale = 2, width?: number): Promise<HTMLCanvasElement[]> {
  const f = fonts();
  await ensureFonts(f);
  const measure = document.createElement("canvas").getContext("2d")!;
  const W = width ?? sheetWidth(measure, sheet, f);
  const body: Unit[] = sheet.blocks.flatMap((b, i) => {
    const gap: Unit = { h: i ? 24 : 8, draw: () => {} };
    return [gap, ...(b.kind === "table" ? tableUnits(measure, b, f, W) : fieldUnits(measure, b, f, W))];
  });

  // Split units into pages.
  const limit = pageHeight - FOOTER - PAD;
  const pages: Unit[][] = [];
  let cur: Unit[] = [titleUnit(sheet, f, false, W)];
  let used = cur[0]!.h + PAD;
  for (const u of body) {
    if (used + u.h > limit && cur.length > 1) {
      pages.push(cur);
      const cont = titleUnit(sheet, f, true, W);
      cur = u.header ? [cont, u.header] : [cont];
      used = PAD + cur.reduce((s, x) => s + x.h, 0);
    }
    cur.push(u);
    used += u.h;
  }
  pages.push(cur);

  return pages.map((units) => {
    const contentH = units.reduce((s, u) => s + u.h, 0);
    const h = Number.isFinite(pageHeight) ? pageHeight : PAD + contentH + PAD + FOOTER;
    const canvas = document.createElement("canvas");
    // Long single-image sheets drop below 2x so they stay under mobile canvas limits.
    const k = Math.min(scale, Math.sqrt(MAX_PIXELS / (W * h)));
    canvas.width = Math.floor(W * k);
    canvas.height = Math.floor(h * k);
    const g = canvas.getContext("2d")!;
    g.scale(k, k);
    g.fillStyle = C.paper;
    g.fillRect(0, 0, W, h);
    let y = PAD - 16;
    for (const u of units) {
      u.draw(g, y);
      y += u.h;
    }
    drawFooter(g, h - FOOTER, f, W);
    return canvas;
  });
}

const toBlob = (canvas: HTMLCanvasElement, type: string, quality?: number) =>
  new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), type, quality));

export async function sheetToPng(sheet: Sheet): Promise<Blob> {
  const [canvas] = await renderSheet(sheet);
  return toBlob(canvas!, "image/png");
}

/** A4 pages at the sheet's width; landscape when a wide table needs it. */
export async function sheetToPdf(sheet: Sheet): Promise<Blob> {
  const f = fonts();
  await ensureFonts(f);
  const width = sheetWidth(document.createElement("canvas").getContext("2d")!, sheet, f);
  const landscape = width > BASE_W * 1.2;
  const page = landscape ? { w: 841.89, h: 595.28 } : { w: 595.28, h: 841.89 };
  const pages = await renderSheet(sheet, Math.round((width * page.h) / page.w), 2, width);
  const images = await Promise.all(
    pages.map(async (cv) => ({ jpeg: new Uint8Array(await (await toBlob(cv, "image/jpeg", 0.92)).arrayBuffer()), width: cv.width, height: cv.height })),
  );
  return new Blob([imagesToPdf(images, page, 0) as BlobPart], { type: "application/pdf" });
}
