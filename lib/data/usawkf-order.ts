import { clean, titleCaseName } from "@/lib/domain/names";
import type { Schedule, ScheduleBlock } from "@/lib/domain/types";
import { fetchText, source, type DataSource } from "./source";

/**
 * USAWKF "order of competition" pages (e.g. usawkf.org/2025TT/JuniorTaoluOrder.php),
 * the same page the v1 app read: session <h2>s, "Ring N" <h2>s, then one table
 * per category (<h3> header row, then order # | name rows). Returns one
 * schedule per ring, a block per session + category, in posted order.
 */
export function parseUsawkfOrder(html: string): Schedule[] {
  const rings = new Map<string, ScheduleBlock[]>();
  // The page's cells hold unclosed <center> tags, which DOM parsers nest wrongly,
  // so scan headings and rows in document order instead.
  let session = "";
  let ring = "";
  let block: Extract<ScheduleBlock, { type: "session" }> | null = null;
  const text = (s: string) => clean(decode(s.replace(/<[^>]*>/g, " ")));
  for (const m of html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>|<h3[^>]*>([\s\S]*?)<\/h3>|<tr[^>]*>((?:(?!<tr|<h[23])[\s\S])*?)<\/tr>/gi)) {
    if (m[1] !== undefined) {
      const t = text(m[1]);
      if (/^ring\s*\d+/i.test(t)) ring = `Ring ${t.replace(/\D/g, "")}`;
      else if (t) session = t;
      block = null;
    } else if (m[2] !== undefined) {
      const category = text(m[2]);
      block = null;
      if (!ring || !category) continue;
      if (/^break$/i.test(category)) {
        rings.set(ring, [...(rings.get(ring) ?? []), { type: "break", label: "Break" }]);
        continue;
      }
      block = { type: "session", title: session ? `${session} · ${category}` : category, start: "", end: "", entries: [] };
      const list = rings.get(ring) ?? [];
      list.push(block);
      rings.set(ring, list);
    } else if (block) {
      const row = text(m[3]!).match(/^(\d+)\s+(.+)$/);
      if (row) block.entries.push({ time: "", athleteName: titleCaseName(row[2]!.replace(/\p{Lu}{2,}/gu, (w) => w[0] + w.slice(1).toLowerCase())), event: block.title!.split(" · ").pop()! });
    }
  }
  return [...rings.entries()]
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([ring, blocks]) => ({ ring, blocks: blocks.filter((b) => b.type !== "session" || b.entries.length) }));
}

const decode = (s: string) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');

export function usawkfOrder(url: string): DataSource<Schedule[]> {
  return source("USAWKF order of competition", async (ctx) => parseUsawkfOrder(await fetchText(url, ctx)));
}
