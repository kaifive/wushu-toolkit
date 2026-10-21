import { parse, type HTMLElement, NodeType, type Node } from "node-html-parser";
import { athleteKey, clean, eventCodeFromName, genderFromText, titleCaseName, toNumber } from "@/lib/domain/names";
import type { Registration, ScoreEntry, Scorecard } from "@/lib/domain/types";
import { fetchText, source, type DataSource } from "./source";

/**
 * Sportdata (sportdata.org/wushu/set-online) adapter. Server-only: plain
 * fetch + HTML parsing, no headless browser. Parsers are pure functions over
 * HTML so they can be tested against saved pages in tests/fixtures/sportdata.
 */

export const SPORTDATA_BASE = "https://www.sportdata.org/wushu/set-online/";

export const sportdataUrls = {
  registration: (verid: number) => `${SPORTDATA_BASE}popup_nennungen_main.php?popup_action=nennungenall&verid=${verid}`,
  waitingList: (verid: number) => `${SPORTDATA_BASE}popup_nennungen_main.php?popup_action=waitlistallpublic&verid=${verid}`,
  categories: (verid: number) =>
    `${SPORTDATA_BASE}veranstaltung_info_main.php?active_menu=calendar&vernr=${verid}&ver_info_action=catauslist`,
  scorecard: (verid: number, catid: string) =>
    `${SPORTDATA_BASE}popup_mitschrift_main.php?popup_action=auslosungcatpunktexml&catid=${catid}&verid=${verid}`,
};

const text = (el: HTMLElement | undefined) => clean(el?.textContent.replace(/ /g, " "));
const cells = (tr: HTMLElement) => tr.childNodes.filter((n): n is HTMLElement => n.nodeType === NodeType.ELEMENT_NODE && (n as HTMLElement).tagName === "TD");
const rowsOf = (table: HTMLElement) => table.querySelectorAll("tr").filter((tr) => tr.closest("table") === table);

/** "Abram Tang(Tang)" or "Academy(Academy), UNITED STATES (USA)" or "Dog(Dog) ID:510" -> club name. */
export function clubFromCell(value: string): string | undefined {
  const m = clean(value).match(/^(.*?)\(/);
  const club = clean(m ? m[1] : value.split(",")[0]);
  return club || undefined;
}

function entriesTable(root: HTMLElement): HTMLElement | undefined {
  return root.querySelector("table#ft") ?? undefined;
}

/** Parse "All entries of this event". `filter` keeps only events containing it (e.g. "Taolu"). */
export function parseRegistration(html: string, filter = ""): Registration[] {
  const table = entriesTable(parse(html));
  if (!table) return [];
  const byAthlete = new Map<string, Registration>();
  for (const tr of rowsOf(table)) {
    const tds = cells(tr);
    if (tds.length < 8) continue;
    const name = text(tds[2]);
    const raw = text(tds[6]);
    if (!name || !raw || (filter && !raw.includes(filter))) continue;
    const details = text(tds[7]).split("|").map(clean);
    const diff = details.indexOf("DIFF");
    const nandu = diff !== -1 && details[diff + 1] ? details[diff + 1]!.split(",").map(clean).filter(Boolean) : undefined;
    const id = athleteKey(name);
    const reg = byAthlete.get(id) ?? { athlete: { id, name, club: clubFromCell(text(tds[0])) }, entries: [] };
    reg.entries.push({ raw, code: eventCodeFromName(raw), gender: genderFromText(raw), nandu });
    reg.athlete.gender ??= genderFromText(raw);
    byAthlete.set(id, reg);
  }
  return [...byAthlete.values()];
}

/** Parse the public waiting list. Entries are marked `waitlisted`. */
export function parseWaitingList(html: string, filter = ""): Registration[] {
  const table = entriesTable(parse(html));
  if (!table) return [];
  const byAthlete = new Map<string, Registration>();
  for (const tr of rowsOf(table)) {
    const tds = cells(tr);
    if (tds.length < 7) continue;
    const name = text(tds[1]);
    const raw = text(tds[4]);
    if (!name || !raw || /^sum$/i.test(text(tds[0])) || (filter && !raw.includes(filter))) continue;
    const id = athleteKey(name);
    const reg = byAthlete.get(id) ?? { athlete: { id, name, club: clubFromCell(text(tds[0]).replace(/ID:\d+.*/, "")) }, entries: [] };
    reg.entries.push({ raw, code: eventCodeFromName(raw), gender: genderFromText(raw), waitlisted: true });
    byAthlete.set(id, reg);
  }
  return [...byAthlete.values()];
}

/** Category list: event name -> catid, for every link carrying a catid. */
export function parseCategories(html: string, filter = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const a of parse(html).querySelectorAll("a")) {
    const href = a.getAttribute("href") ?? "";
    const m = href.match(/[?&]catid=(\d+)/);
    const name = text(a);
    if (m && name && (!filter || name.includes(filter))) out[name] = m[1]!;
  }
  return out;
}

const STRUCK = new Set(["STRIKE", "S", "DEL"]);

/** Tokens of a judge-panel row, each flagged false when the source struck it through. */
function panelTokens(tr: HTMLElement): { value: string; struck: boolean }[] {
  const out: { value: string; struck: boolean }[] = [];
  const walk = (node: Node, struck: boolean) => {
    if (node.nodeType === NodeType.TEXT_NODE) {
      for (const part of node.textContent.replace(/ /g, " ").split("|")) {
        const v = clean(part);
        if (v) out.push({ value: v, struck });
      }
      return;
    }
    const el = node as HTMLElement;
    const s = struck || STRUCK.has(el.tagName ?? "");
    el.childNodes.forEach((c) => walk(c, s));
  };
  cells(tr).forEach((td) => walk(td, false));
  return out;
}

function scoreTable(root: HTMLElement): HTMLElement | undefined {
  return root
    .querySelectorAll("table")
    .find((t) => rowsOf(t).some((tr) => cells(tr).length >= 5 && cells(tr).some((td) => td.querySelector("table"))));
}

/**
 * Parse a category's scorecard page. Each athlete row has the name (school)
 * in cell 1, the final score in cell 4, and a nested panel table with rows
 * A (deductions … score), B (marks … score, dropped marks struck through),
 * C (difficulty elements … score, missed elements struck through) and an
 * adjustment row. Keyed by athleteKey(name).
 */
export function parseScorecards(html: string): Map<string, { name: string; club?: string; finalScore: number | null; scorecard: Scorecard }> {
  const out = new Map<string, { name: string; club?: string; finalScore: number | null; scorecard: Scorecard }>();
  const table = scoreTable(parse(html));
  if (!table) return out;
  for (const tr of rowsOf(table)) {
    const tds = cells(tr);
    if (tds.length < 5) continue;
    const nameCell = text(tds[1]);
    if (!nameCell) continue;
    const name = titleCaseName(nameCell.split("(")[0]!);
    const club = clean(nameCell.split("(")[1]?.replace(")", "")) || undefined;
    const scorecard: Scorecard = {};
    const panel = tds.find((td) => td.querySelector("table"))?.querySelector("table");
    const panelRows = panel ? rowsOf(panel) : [];
    panelRows.forEach((prow, idx) => {
      const tokens = panelTokens(prow).slice(1); // drop the row label (A / B / C / adj)
      const last = tokens[tokens.length - 1];
      const middle = tokens.slice(0, -1);
      if (idx === 0) {
        scorecard.a = { score: toNumber(last?.value), deductions: middle.flatMap((t) => t.value.split(" ")).filter(Boolean) };
      } else if (idx === 1) {
        scorecard.b = { score: toNumber(last?.value), marks: middle.map((t) => toNumber(t.value) ?? 0), counted: middle.map((t) => !t.struck) };
      } else if (idx === 2) {
        scorecard.c = { score: toNumber(last?.value), elements: middle.map((t) => t.value), made: middle.map((t) => !t.struck) };
      } else if (idx === 3) {
        scorecard.adjustment = toNumber(last?.value) ?? 0;
      }
    });
    out.set(athleteKey(name), { name, club, finalScore: toNumber(text(tds[4])), scorecard });
  }
  return out;
}

export interface SportdataEventOptions {
  verid: number;
  /** Substring that selects this event's categories, e.g. "Junior Team Trials" or "Taolu". */
  filter: string;
  includeWaitingList?: boolean;
}

export function sportdataRegistration(o: SportdataEventOptions): DataSource<Registration[]> {
  return source("Sportdata registration (live)", async (ctx) => {
    const [main, wait] = await Promise.all([
      fetchText(sportdataUrls.registration(o.verid), ctx).then((h) => parseRegistration(h, o.filter)),
      o.includeWaitingList
        ? fetchText(sportdataUrls.waitingList(o.verid), ctx).then((h) => parseWaitingList(h, o.filter))
        : Promise.resolve([]),
    ]);
    return mergeRegistrations([...main, ...wait]);
  });
}

/** Registrations joined with every category's scorecards. */
export function sportdataScores(o: SportdataEventOptions, registration = sportdataRegistration(o)): DataSource<ScoreEntry[]> {
  return source("Sportdata scorecards (live)", async (ctx) => {
    const [regs, cats] = await Promise.all([
      registration.load(ctx),
      fetchText(sportdataUrls.categories(o.verid), ctx).then((h) => parseCategories(h, o.filter)),
    ]);
    const cards = new Map(
      await Promise.all(
        Object.entries(cats).map(async ([event, catid]) => [event, parseScorecards(await fetchText(sportdataUrls.scorecard(o.verid, catid), ctx))] as const),
      ),
    );
    return joinScores(regs, cards);
  });
}

export function mergeRegistrations(regs: Registration[]): Registration[] {
  const m = new Map<string, Registration>();
  for (const r of regs) {
    const prev = m.get(r.athlete.id);
    if (prev) prev.entries.push(...r.entries);
    else m.set(r.athlete.id, { athlete: { ...r.athlete }, entries: [...r.entries] });
  }
  return [...m.values()];
}

export function joinScores(
  regs: Registration[],
  cards: Map<string, Map<string, { finalScore: number | null; scorecard: Scorecard; club?: string }>>,
): ScoreEntry[] {
  return regs.flatMap((r) =>
    // Waitlisted entries aren't in the competition (same rule as joinRegistrationScores).
    r.entries.filter((e) => !e.waitlisted).map((e) => {
      const card = cards.get(e.raw)?.get(r.athlete.id);
      return {
        athleteId: r.athlete.id,
        athleteName: r.athlete.name,
        club: r.athlete.club ?? card?.club,
        raw: e.raw,
        code: e.code,
        gender: e.gender ?? r.athlete.gender,
        division: e.division,
        nandu: e.nandu,
        finalScore: card?.finalScore ?? null,
        scorecard: card?.scorecard,
      } satisfies ScoreEntry;
    }),
  );
}
