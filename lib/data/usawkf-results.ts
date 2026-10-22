import { parse, type HTMLElement } from "node-html-parser";
import { athleteKey, clean, eventCodeFromName, genderFromText } from "@/lib/domain/names";
import type { Registration, ScoreEntry } from "@/lib/domain/types";
import { sameName } from "@/lib/watchlist/match";
import { fetchText, source, type DataSource } from "./source";

/**
 * USAWKF's official results pages (usawkf.org/competition-results/?ID=…), the
 * published record of a trials: one table per event ("Taolu Junior Female 1st
 * Set Changquan": place, athlete, score) plus overall rankings with the team
 * each athlete made. Checked against the 2025 Junior Trials hand-kept sheet:
 * these are the corrected, final numbers.
 */
export interface OfficialRow {
  table: string;
  place: number | null;
  name: string;
  score: number | null;
  /** "A Team", "B Team", … on overall-rank tables. */
  prize: string;
}

const direct = (el: HTMLElement, tag: string) => el.childNodes.filter((n): n is HTMLElement => (n as HTMLElement).tagName === tag);
const rowsOf = (table: HTMLElement) => {
  const body = direct(table, "TBODY")[0] ?? table;
  return direct(body, "TR");
};

export function parseUsawkfResults(html: string): OfficialRow[] {
  const out: OfficialRow[] = [];
  for (const t of parse(html).querySelectorAll("table.divbox")) {
    const title = clean(t.querySelector("h3")?.textContent);
    if (!title) continue;
    for (const tr of rowsOf(t)) {
      const tds = direct(tr, "TD");
      if (tds.length < 3) continue;
      const inner = tds[1]!.querySelector("td");
      const name = clean((inner ?? tds[1]!).textContent);
      const place = Number(clean(tds[0]!.textContent));
      const score = Number(clean(tds[2]!.textContent));
      if (!name) continue;
      out.push({ table: title, place: Number.isFinite(place) && place > 0 ? place : null, name, score: Number.isFinite(score) && score > 0 ? score : null, prize: clean(tds[3]?.textContent) });
    }
  }
  return out;
}

/**
 * Per-routine scores joined to the registration: each registered entry gets
 * the official score for the same event and athlete (names compared loosely:
 * order, case, accents). Official results with no registration are kept too.
 */
export function joinOfficial(regs: Registration[], rows: OfficialRow[]): ScoreEntry[] {
  const byEvent = new Map<string, OfficialRow[]>();
  for (const r of rows) {
    if (!/^taolu\s/i.test(r.table)) continue; // per-event tables only
    const k = r.table.toLowerCase();
    byEvent.set(k, [...(byEvent.get(k) ?? []), r]);
  }
  const used = new Set<OfficialRow>();
  const out: ScoreEntry[] = regs.flatMap((reg) =>
    reg.entries
      .filter((e) => !e.waitlisted)
      .map((e) => {
        const hit = byEvent.get(e.raw.toLowerCase())?.find((r) => !used.has(r) && sameName(r.name, reg.athlete.name));
        if (hit) used.add(hit);
        return {
          athleteId: reg.athlete.id,
          athleteName: reg.athlete.name,
          club: reg.athlete.club,
          raw: e.raw,
          code: e.code,
          gender: e.gender ?? reg.athlete.gender,
          division: e.division ?? reg.athlete.division,
          nandu: e.nandu,
          finalScore: hit?.score ?? null,
        } satisfies ScoreEntry;
      }),
  );
  for (const [, list] of byEvent)
    for (const r of list)
      if (!used.has(r) && r.score != null)
        out.push({ athleteId: athleteKey(r.name), athleteName: r.name, raw: r.table, code: eventCodeFromName(r.table), gender: genderFromText(r.table), finalScore: r.score });
  return out;
}

export function usawkfResults(url: string): DataSource<OfficialRow[]> {
  return source("USAWKF official results", async (ctx) => parseUsawkfResults(await fetchText(url, ctx)));
}
