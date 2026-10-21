import { athleteKey } from "@/lib/domain/names";
import type { EventCode, EventData, Gender, ScoreEntry } from "@/lib/domain/types";
import { DISCIPLINE_LABEL, EVENTS, type Ruleset, type TeamId } from "@/lib/rules";
import type { Discipline } from "@/lib/domain/types";
import { ageGroupChampions, allAround, grandChampion, standings as aaStandings, type AllAroundAthlete } from "@/lib/rules/all-around";
import { runSelection, withDivisions, type Candidate, type Team } from "@/lib/rules/selection";
import { groupByAthlete } from "@/lib/rules/score";
import type { AthleteHighlight } from "./types";

/**
 * View models: plain serializable data computed from EventData + ruleset.
 * Used by server pages and, for paid events, by the client after it fetches data.
 */

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
  if (ruleset.selection && !ruleset.selection.perDivision) return [{ id: "*", label: "All athletes" }];
  const present = new Set(scores.map((s) => s.division));
  const list = ruleset.divisions.filter((d) => present.has(d.id)).map((d) => ({ id: d.id, label: d.label }));
  return list.length ? list : [{ id: "*", label: "All athletes" }];
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
    average: c.average,
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
            .map((m) => ({ athleteName: m.athleteName, club: m.club, score: m.score, average: m.average, discipline: selectionKeyLabel(ruleset, m.key) })),
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
    .map(([raw, list]) => {
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

/** name key -> highlight color, for coloring club athletes. */
export function highlightMap(highlights: AthleteHighlight[] = []): Record<string, { color: string; group: string }> {
  const out: Record<string, { color: string; group: string }> = {};
  for (const h of highlights) for (const a of h.athletes) out[athleteKey(a)] ??= { color: h.color, group: h.name };
  return out;
}
