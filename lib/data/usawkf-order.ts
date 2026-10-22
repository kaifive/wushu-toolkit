import { parse, type HTMLElement } from "node-html-parser";
import { clean, titleCaseName } from "@/lib/domain/names";
import type { Schedule, ScheduleBlock } from "@/lib/domain/types";
import { fetchText, source, type DataSource } from "./source";

/**
 * USAWKF "order of competition" pages (e.g. usawkf.org/2025TT/JuniorTaoluOrder.php),
 * the same page the v1 app read. Layout: each session is an <a name> holding an
 * <h2> ("Friday Morning … Dec 19, 2025"); inside it, "Ring N" <h2> headers each
 * followed by one table per category (first row <h3> = category, then
 * order # | name rows). Returns one schedule per ring, a block per
 * session + category, in posted order.
 */
export function parseUsawkfOrder(html: string): Schedule[] {
  const root = parse(html);
  const rings = new Map<string, ScheduleBlock[]>();
  // A layout cell can hold several sessions: read each table once.
  const seen = new Set<HTMLElement>();
  for (const anchor of root.querySelectorAll("a[name]")) {
    const session = clean(anchor.querySelector("h2")?.textContent);
    if (!session) continue;
    const container = closest(anchor, "td") ?? anchor;
    for (const header of container.querySelectorAll("h2")) {
      const ringText = clean(header.textContent);
      if (!/\bring\s*\d/i.test(ringText)) continue;
      const ring = `Ring ${ringText.replace(/\D/g, "")}`;
      for (const table of header.parentNode?.querySelectorAll("table") ?? []) {
        if (seen.has(table)) continue;
        seen.add(table);
        const rows = table.querySelectorAll("tr");
        const category = clean(rows[0]?.querySelector("h3")?.textContent);
        if (!category) continue;
        const entries = rows.slice(1).flatMap((tr) => {
          const tds = tr.querySelectorAll("td");
          const order = clean(tds[0]?.textContent);
          const name = clean(tds[1]?.textContent);
          return order && name ? [{ time: "", athleteName: titleCaseName(name.replace(/\p{Lu}{2,}/gu, (w) => w[0] + w.slice(1).toLowerCase())), event: category }] : [];
        });
        if (!entries.length) continue;
        const list = rings.get(ring) ?? [];
        list.push({ type: "session", title: `${session} · ${category}`, start: "", end: "", entries });
        rings.set(ring, list);
      }
    }
  }
  return [...rings.entries()].sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([ring, blocks]) => ({ ring, blocks }));
}

function closest(el: HTMLElement, tag: string): HTMLElement | undefined {
  for (let p = el.parentNode; p; p = p.parentNode) if (p.tagName?.toLowerCase() === tag) return p;
  return undefined;
}

export function usawkfOrder(url: string): DataSource<Schedule[]> {
  return source("USAWKF order of competition", async (ctx) => parseUsawkfOrder(await fetchText(url, ctx)));
}
