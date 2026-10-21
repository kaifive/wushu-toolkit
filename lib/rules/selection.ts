import type { Discipline, Gender, ScoreEntry } from "@/lib/domain/types";
import { EVENTS } from "./events";
import { DISCIPLINES, type Ruleset, type SelectionRules, type SelectionScoring, type TeamId, type TieBreak } from "./types";
import { groupByAthlete, round3 } from "./score";

/** One athlete's selection line: what counts, the total, and where it projects. */
export interface Candidate {
  athleteId: string;
  athleteName: string;
  club?: string;
  gender?: Gender;
  division?: string;
  /** Discipline (barehand-plus-weapon) or category id (category-average). */
  key: string;
  counted: ScoreEntry[];
  barehand?: ScoreEntry;
  weapon?: ScoreEntry;
  /** Ranking value: barehand + weapon, or the category average. */
  score: number;
  /**
   * Per-event average, compared against team minimums. Not rounded: 8.9995
   * must not pass a 9.0 minimum (OPEN_QUESTIONS #13). Display with toFixed(3).
   */
  average: number;
  /** At least one counted event had every difficulty element made. */
  cleanNandu: boolean;
  /** Set when every tie-break failed to separate this athlete from the one above. */
  tiedWithAbove?: boolean;
}

export interface Team {
  id: TeamId;
  size: number;
  members: Candidate[];
  minAverage?: number;
}

export interface SelectionResult {
  ranked: (Candidate & { team?: TeamId; rank: number })[];
  teams: Team[];
}

const scoreOf = (e?: ScoreEntry) => e?.finalScore ?? 0;

function best(entries: ScoreEntry[]): ScoreEntry | undefined {
  return entries.reduce<ScoreEntry | undefined>((b, e) => (e.finalScore != null && (!b || scoreOf(e) > scoreOf(b)) ? e : b), undefined);
}

/** Full difficulty: every declared element made, or the C panel at its 2.0 maximum. */
function isClean(e: ScoreEntry): boolean {
  const c = e.scorecard?.c;
  if (!c) return false;
  if (c.made.length > 0 && c.made.every(Boolean)) return true;
  return (c.score ?? 0) >= 2;
}

function baseOf(entries: ScoreEntry[]) {
  const e = entries[0]!;
  return { athleteId: e.athleteId, athleteName: e.athleteName, club: entries.find((x) => x.club)?.club, gender: e.gender, division: e.division };
}

/** Build selection candidates from one gender/division's score entries. */
export function buildCandidates(scores: ScoreEntry[], scoring: SelectionScoring): Candidate[] {
  const out: Candidate[] = [];
  for (const entries of groupByAthlete(scores).values()) {
    const base = baseOf(entries);
    if (scoring.method === "barehand-plus-weapon") {
      const kindOf = (e: ScoreEntry) => (e.code ? EVENTS[e.code].kind : undefined);
      const pools: { key: Discipline | "any"; list: ScoreEntry[] }[] =
        scoring.pairing === "any"
          ? [{ key: "any", list: entries }]
          : DISCIPLINES.map((d) => ({ key: d, list: entries.filter((e) => e.code && EVENTS[e.code].discipline === d) }));
      let pick: Candidate | undefined;
      for (const { key, list } of pools) {
        const barehand = best(list.filter((e) => kindOf(e) === "barehand"));
        const weapon = best(list.filter((e) => kindOf(e) === "weapon"));
        if (!barehand && !weapon) continue;
        const total = round3(scoreOf(barehand) + scoreOf(weapon));
        const counted = [barehand, weapon].filter((e): e is ScoreEntry => !!e);
        const discipline = key === "any" ? (barehand?.code ? EVENTS[barehand.code].discipline : weapon?.code ? EVENTS[weapon.code].discipline : "changquan") : key;
        const c: Candidate = { ...base, key: discipline, counted, barehand, weapon, score: total, average: total / 2, cleanNandu: counted.some(isClean) };
        if (!pick || c.score > pick.score) pick = c;
      }
      if (pick) out.push(pick);
    } else {
      for (const cat of scoring.categories) {
        // Registered-but-unscored events (live) don't drag the average down.
        const inCat = entries.filter((e) => e.code && cat.events.includes(e.code) && e.finalScore != null);
        if (!inCat.length) continue;
        const exact = inCat.reduce((s, e) => s + scoreOf(e), 0) / inCat.length;
        const avg = round3(exact);
        if (avg <= 0) continue;
        out.push({ ...base, key: cat.id, counted: inCat, score: avg, average: exact, cleanNandu: inCat.some(isClean) });
      }
    }
  }
  return out;
}

function tieValue(c: Candidate, t: TieBreak): number {
  const top = best(c.counted);
  switch (t) {
    case "highest-single-event":
      return scoreOf(top);
    case "higher-barehand":
      return scoreOf(c.barehand);
    case "higher-weapon":
      return scoreOf(c.weapon);
    case "more-full-nandu":
      return c.counted.filter((e) => (e.scorecard?.c?.score ?? 0) >= 2).length;
    case "higher-performance":
      return top?.scorecard?.b?.score ?? 0;
    case "higher-lowest-discarded": {
      const b = top?.scorecard?.b;
      const dropped = b ? b.marks.filter((_, i) => !b.counted[i]) : [];
      return dropped.length ? Math.min(...dropped) : 0;
    }
  }
}

/** Sort by score, then each tie-break in order, then name (stable, so results never flicker). */
export function rankCandidates(cands: Candidate[], tieBreaks: TieBreak[]): Candidate[] {
  const cmpTies = (a: Candidate, b: Candidate) => {
    for (const t of tieBreaks) {
      const d = tieValue(b, t) - tieValue(a, t);
      if (d !== 0) return d;
    }
    return 0;
  };
  const sorted = [...cands].sort((a, b) => b.score - a.score || cmpTies(a, b) || a.athleteName.localeCompare(b.athleteName));
  return sorted.map((c, i) => {
    const prev = sorted[i - 1];
    const tied = !!prev && prev.score === c.score && cmpTies(prev, c) === 0;
    return tied ? { ...c, tiedWithAbove: true } : { ...c, tiedWithAbove: undefined };
  });
}

/** Fill teams A → B → C from the ranked pool following each team's rule. */
export function selectTeams(ranked: Candidate[], rules: SelectionRules, division = "*"): Team[] {
  const assigned = new Set<string>();
  return rules.teams.map((rule) => {
    const size = rule.size[division] ?? rule.size["*"] ?? 0;
    const members: Candidate[] = [];
    const usedKeys = new Set<string>();
    const ok = (c: Candidate) =>
      !assigned.has(c.athleteId) &&
      (rule.minAverage === undefined || c.average >= rule.minAverage) &&
      (!rule.requireCleanNandu || c.cleanNandu);
    const add = (c: Candidate) => {
      members.push(c);
      assigned.add(c.athleteId);
      usedKeys.add(c.key);
    };

    if (rule.onePerDiscipline) {
      if (rule.disciplineOrder) {
        for (const key of rule.disciplineOrder) {
          if (members.length >= size) break;
          const c = ranked.find((x) => x.key === key && ok(x));
          if (c) add(c);
        }
      } else {
        for (const c of ranked) {
          if (members.length >= size) break;
          if (ok(c) && !usedKeys.has(c.key)) add(c);
        }
      }
    }
    if (rule.fill || !rule.onePerDiscipline) {
      for (const c of ranked) {
        if (members.length >= size) break;
        if (ok(c)) add(c);
      }
    }
    return { id: rule.id, size, members, minAverage: rule.minAverage };
  });
}

/** Rank and project teams for one gender + division. */
export function runSelection(scores: ScoreEntry[], rules: SelectionRules, division = "*"): SelectionResult {
  const ranked = rankCandidates(buildCandidates(scores, rules.scoring), rules.tieBreaks);
  const teams = selectTeams(ranked, rules, division);
  const teamOf = new Map<Candidate, TeamId>();
  for (const t of teams) for (const m of t.members) teamOf.set(m, t.id);
  return { teams, ranked: ranked.map((c, i) => ({ ...c, team: teamOf.get(c), rank: i + 1 })) };
}

/** Assign each entry its division from the ruleset's name matchers (keeps an existing division). */
export function withDivisions(scores: ScoreEntry[], ruleset: Ruleset): ScoreEntry[] {
  return scores.map((s) => (s.division ? s : { ...s, division: ruleset.divisions.find((d) => d.matchers.some((m) => m.test(s.raw)))?.id }));
}

