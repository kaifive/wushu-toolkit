import type { EventCode, EventData, Gender, ScoreEntry } from "@/lib/domain/types";
import { DISCIPLINE_LABEL, EVENTS, type Ruleset, type TeamId } from "@/lib/rules";
import type { Discipline } from "@/lib/domain/types";
import { ageGroupChampions, allAround, grandChampion, standings as aaStandings, type AllAroundAthlete } from "@/lib/rules/all-around";
import { deductionCodes } from "@/lib/rules/iwuf-2024/deductions";
import { runSelection, withDivisions, type Candidate, type Team } from "@/lib/rules/selection";
import { floor3, groupByAthlete } from "@/lib/rules/score";
import type { AthleteHighlight } from "./types";
import { compileWatch } from "@/lib/watchlist/match";

/**
 * View models: plain serializable data computed from EventData + ruleset.
 * Used by server pages and, for paid events, by the client after it fetches data.
 */

export const GENDER_LABEL: Record<Gender, string> = { male: "Male", female: "Female" };

export const GENDERS: { id: Gender; label: string }[] = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
];

export interface DivisionScope {
  id: string;
  label: string;
}

/** Divisions that actually have entries, in ruleset order. "*" when the ruleset doesn't split. */
export function scopes(ruleset: Ruleset, scores: ScoreEntry[]): DivisionScope[] {
  if (ruleset.selection && !ruleset.selection.perDivision) return [{ id: "*", label: "All Athletes" }];
  const present = new Set(scores.map((s) => s.division));
  const list = ruleset.divisions.filter((d) => present.has(d.id)).map((d) => ({ id: d.id, label: d.label }));
  return list.length ? list : [{ id: "*", label: "All Athletes" }];
}

const inScope = (s: ScoreEntry, gender: Gender, division: string) => s.gender === gender && (division === "*" || s.division === division);

export interface OverallRow {
  rank: number;
  athleteId: string;
  athleteName: string;
  club?: string;
  /** Score per event code (best if entered twice); null = entered, not scored. */
  events: Partial<Record<EventCode, number | null>>;
  score: number;
  average: number;
  discipline: string;
  team?: TeamId;
  tied?: boolean;
  counted: EventCode[];
}

export interface ScopeModel {
  gender: Gender;
  division: DivisionScope;
  eventCodes: EventCode[];
  rows: OverallRow[];
  teams: (Omit<Team, "members"> & { members: { athleteName: string; club?: string; score: number; average: number; discipline: string }[] })[];
  scored: number;
  total: number;
}

function eventColumns(scores: ScoreEntry[]): EventCode[] {
  const present = new Set(scores.map((s) => s.code).filter((c): c is EventCode => !!c));
  return (Object.keys(EVENTS) as EventCode[]).filter((c) => present.has(c));
}

const toRow = (c: Candidate & { rank: number; team?: TeamId }, entries: ScoreEntry[]): OverallRow => {
  const events: Partial<Record<EventCode, number | null>> = {};
  for (const e of entries) {
    if (!e.code) continue;
    const prev = events[e.code];
    events[e.code] = prev == null ? e.finalScore : e.finalScore == null ? prev : Math.max(prev, e.finalScore);
  }
  return {
    rank: c.rank,
    athleteId: c.athleteId,
    athleteName: c.athleteName,
    club: c.club,
    events,
    score: c.score,
    average: floor3(c.average),
    discipline: c.key,
    team: c.team,
    tied: c.tiedWithAbove,
    counted: c.counted.map((e) => e.code).filter((x): x is EventCode => !!x),
  };
};

/** Human label for a selection key: a discipline, or a 2025-adults style category. */
export function selectionKeyLabel(ruleset: Ruleset, key: string): string {
  const s = ruleset.selection?.scoring;
  if (s?.method === "category-average") return s.categories.find((c) => c.id === key)?.label ?? key;
  return DISCIPLINE_LABEL[key as Discipline] ?? key;
}

/** Overall standings and team projection for every gender × division. */
export function selectionModel(data: EventData, ruleset: Ruleset): ScopeModel[] {
  if (!ruleset.selection) return [];
  const scores = withDivisions(data.scores, ruleset);
  const out: ScopeModel[] = [];
  for (const g of ruleset.genders) {
    for (const div of scopes(ruleset, scores)) {
      const pool = scores.filter((s) => inScope(s, g, div.id));
      if (!pool.length) continue;
      const result = runSelection(pool, ruleset.selection, div.id);
      const byAthlete = groupByAthlete(pool);
      out.push({
        gender: g,
        division: div,
        eventCodes: eventColumns(pool),
        rows: result.ranked.map((c) => ({ ...toRow(c, byAthlete.get(c.athleteId) ?? []), discipline: selectionKeyLabel(ruleset, c.key) })),
        teams: result.teams.map((t) => ({
          ...t,
          members: [...t.members]
            .sort((a, b) => b.score - a.score)
            .map((m) => ({ athleteName: m.athleteName, club: m.club, score: m.score, average: floor3(m.average), discipline: selectionKeyLabel(ruleset, m.key) })),
        })),
        scored: pool.filter((s) => s.finalScore != null).length,
        total: pool.length,
      });
    }
  }
  return out;
}

export interface EventResult {
  raw: string;
  code?: EventCode;
  gender?: Gender;
  division?: string;
  rows: { place: number; athleteName: string; club?: string; finalScore: number | null; hasScorecard: boolean }[];
}

/**
 * Results grouped by event as printed by the source and by gender (some
 * sources, e.g. 2024 juniors, don't put the gender in the event name), ranked
 * by final score.
 */
export function resultsByEvent(data: EventData, ruleset: Ruleset): EventResult[] {
  const scores = withDivisions(data.scores, ruleset);
  const groups = new Map<string, ScoreEntry[]>();
  for (const s of scores) {
    const key = `${s.raw}\u0000${s.gender ?? ""}`;
    const list = groups.get(key);
    if (list) list.push(s);
    else groups.set(key, [s]);
  }
  return [...groups.entries()]
    .map(([, list]) => {
      const raw = list[0]!.raw; // the map key also carries the gender
      const sorted = [...list].sort((a, b) => (b.finalScore ?? -1) - (a.finalScore ?? -1) || a.athleteName.localeCompare(b.athleteName));
      let place = 0;
      let prev: number | null | undefined;
      const rows = sorted.map((s, i) => {
        if (s.finalScore !== prev) place = i + 1;
        prev = s.finalScore;
        return { place, athleteName: s.athleteName, club: s.club, finalScore: s.finalScore, hasScorecard: !!s.scorecard };
      });
      return { raw, code: list[0]?.code, gender: list[0]?.gender, division: list[0]?.division, rows };
    })
    .sort((a, b) => a.raw.localeCompare(b.raw) || (a.gender ?? "").localeCompare(b.gender ?? ""));
}

export interface ScorecardRow {
  athleteName: string;
  club?: string;
  raw: string;
  code?: EventCode;
  gender?: Gender;
  finalScore: number | null;
  scorecard: NonNullable<ScoreEntry["scorecard"]>;
  nandu?: string[];
}

export function scorecards(data: EventData): ScorecardRow[] {
  return data.scores
    .filter((s): s is ScoreEntry & { scorecard: NonNullable<ScoreEntry["scorecard"]> } => !!s.scorecard)
    .map((s) => ({ athleteName: s.athleteName, club: s.club, raw: s.raw, code: s.code, gender: s.gender, finalScore: s.finalScore, scorecard: s.scorecard, nandu: s.nandu }))
    .sort((a, b) => a.athleteName.localeCompare(b.athleteName) || a.raw.localeCompare(b.raw));
}

export interface AllAroundModel {
  standings: Record<Gender, AllAroundAthlete[]>;
  grandChampion: AllAroundAthlete | null;
  ageGroups: ReturnType<typeof ageGroupChampions>;
  topN: number;
  minForms: number;
}

export function allAroundModel(data: EventData, ruleset: Ruleset): AllAroundModel | null {
  const rules = ruleset.allAround;
  if (!rules) return null;
  const info = new Map(
    data.registrations.map((r) => [r.athlete.id, { age: r.athlete.age, gender: r.athlete.gender, optedIn: r.athlete.tags?.includes("all-around") }]),
  );
  const athletes = allAround(data.scores, rules, info);
  return {
    standings: { male: aaStandings(athletes, "male"), female: aaStandings(athletes, "female") },
    grandChampion: grandChampion(athletes, rules),
    ageGroups: ageGroupChampions(athletes, rules),
    topN: rules.topN,
    minForms: rules.minForms,
  };
}

export type Highlight = { color: string; group: string };
export type HighlightFor = (athleteName: string) => Highlight | undefined;

/**
 * Club highlight for an athlete name, using the same fuzzy matching as watch
 * lists ("Huang LanHong" finds "Lan Hong Huang"). Results are memoized per name.
 */
export function highlighter(highlights: AthleteHighlight[] = []): HighlightFor {
  // Same lookup as watch lists: entries tokenized once, earliest group wins.
  const lookup = compileWatch(highlights.map((h, i) => ({ id: String(i), name: h.name, color: h.color, enabled: true, athletes: h.athletes })));
  return (name) => {
    const hit = lookup(name);
    return hit ? { color: hit.color, group: hit.name } : undefined;
  };
}

/** Left colour bar for a highlighted row or card. */
export const highlightStyle = (h: Highlight | undefined) => (h ? { boxShadow: `inset 3px 0 0 ${h.color}` } : undefined);

export interface ScorecardStats {
  /** Most common panel A codes, with how many routines got each. */
  deductions: { code: string; count: number; eventCode?: EventCode }[];
  /** Average A, B, C (when scorecards exist) and final per event, over scored routines. */
  byEvent: { raw: string; gender?: Gender; routines: number; a: number | null; b: number | null; c: number | null; final: number | null }[];
}

const mean = (xs: (number | null | undefined)[]) => {
  const ok = xs.filter((x): x is number => typeof x === "number" && Number.isFinite(x));
  return ok.length ? ok.reduce((t, x) => t + x, 0) / ok.length : null;
};

/** v1's scorecard stats and 2024 dashboards: top deductions and averages by event. */
export function scorecardStats(data: EventData): ScorecardStats {
  const counts = new Map<string, { count: number; eventCode?: EventCode }>();
  const groups = new Map<string, ScoreEntry[]>();
  for (const s of data.scores) {
    if (s.finalScore == null) continue;
    for (const code of deductionCodes(s.scorecard?.a?.deductions ?? [])) {
      const c = counts.get(code) ?? { count: 0, eventCode: s.code };
      c.count++;
      counts.set(code, c);
    }
    const key = `${s.raw}\u0000${s.gender ?? ""}`;
    groups.set(key, [...(groups.get(key) ?? []), s]);
  }
  const deductions = [...counts.entries()].map(([code, c]) => ({ code, ...c })).sort((x, y) => y.count - x.count || x.code.localeCompare(y.code));
  const byEvent = [...groups.values()]
    .map((list) => ({
      raw: list[0]!.raw,
      gender: list[0]!.gender,
      routines: list.length,
      a: mean(list.map((s) => s.scorecard?.a?.score)),
      b: mean(list.map((s) => s.scorecard?.b?.score)),
      c: mean(list.map((s) => s.scorecard?.c?.score)),
      final: mean(list.map((s) => s.finalScore)),
    }))
    .sort((x, y) => x.raw.localeCompare(y.raw));
  return { deductions, byEvent };
}

export interface AthleteProfile {
  id: string;
  name: string;
  club?: string;
  gender?: Gender;
  routines: { raw: string; score: number | null; place: number | null; of: number; average: number | null; hasScorecard: boolean }[];
  /** Place in each overall ranking the athlete is in (team trials). */
  overall: { scope: string; rank: number; of: number; discipline: string; team?: TeamId }[];
  /** All-around place (top forms total), when the event has one. */
  allAround?: { place: number; of: number; total: number };
}

/**
 * Every athlete's results in one place (v1's athlete dashboard, for every
 * competition): each routine's place and the event average, overall rank and
 * projected team, all-around place.
 */
export function athleteProfiles(data: EventData, ruleset: Ruleset): AthleteProfile[] {
  const results = resultsByEvent(data, ruleset);
  const routines = new Map<string, AthleteProfile["routines"]>();
  const resultKey = (raw: string, gender?: Gender) => `${raw}\u0000${gender ?? ""}`;
  const placeIn = new Map<string, Map<string, number>>();
  const averages = new Map<string, { avg: number | null; of: number }>();
  for (const r of results) {
    const scored = r.rows.filter((x) => x.finalScore != null);
    averages.set(resultKey(r.raw, r.gender), { avg: scored.length ? scored.reduce((t, x) => t + x.finalScore!, 0) / scored.length : null, of: scored.length });
    placeIn.set(resultKey(r.raw, r.gender), new Map(scored.map((x) => [x.athleteName, x.place])));
  }
  for (const s of data.scores) {
    const k = resultKey(s.raw, s.gender);
    const list = routines.get(s.athleteId) ?? [];
    list.push({
      raw: s.raw,
      score: s.finalScore,
      place: s.finalScore != null ? (placeIn.get(k)?.get(s.athleteName) ?? null) : null,
      of: averages.get(k)?.of ?? 0,
      average: averages.get(k)?.avg ?? null,
      hasScorecard: !!s.scorecard,
    });
    routines.set(s.athleteId, list);
  }
  const overall = new Map<string, AthleteProfile["overall"]>();
  for (const m of selectionModel(data, ruleset)) {
    const scope = `${m.gender === "male" ? "Men" : "Women"}${m.division.id === "*" ? "" : ` · ${m.division.label}`}`;
    for (const row of m.rows) {
      const list = overall.get(row.athleteId) ?? [];
      list.push({ scope, rank: row.rank, of: m.rows.length, discipline: selectionKeyLabel(ruleset, row.discipline), team: row.team });
      overall.set(row.athleteId, list);
    }
  }
  const aa = new Map<string, AthleteProfile["allAround"]>();
  const aaModel = allAroundModel(data, ruleset);
  if (aaModel)
    for (const list of Object.values(aaModel.standings))
      list.forEach((a, i) => aa.set(a.athleteId, { place: i + 1, of: list.length, total: a.total }));
  const seen = new Map<string, AthleteProfile>();
  for (const s of data.scores) {
    if (seen.has(s.athleteId)) continue;
    seen.set(s.athleteId, {
      id: s.athleteId,
      name: s.athleteName,
      club: s.club,
      gender: s.gender,
      routines: (routines.get(s.athleteId) ?? []).sort((a, b) => (b.score ?? -1) - (a.score ?? -1)),
      overall: overall.get(s.athleteId) ?? [],
      allAround: aa.get(s.athleteId),
    });
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
}
