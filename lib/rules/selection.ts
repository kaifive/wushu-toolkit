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
   * Per-event average, compared against team minimums the inclusive way: it
   * qualifies if either the exact value or the value rounded to thousandths
   * meets the minimum, so 8.9995 passes a 9.0 minimum (OPEN_QUESTIONS #13).
   */
  average: number;
  /** At least one counted routine scored the full 2.0 for difficulty (C). */
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

/** Clean nandu: the C panel gave the full 2.0 (OPEN_QUESTIONS #14). */
function isClean(e: ScoreEntry): boolean {
  return (e.scorecard?.c?.score ?? 0) >= 2;
}

/** Inclusive minimum check: exact or rounded to thousandths, whichever passes. */
export const meetsMinimum = (average: number, min: number) => average >= min || round3(average) >= min;

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
        // Always over two routines: a missing one shows the athlete still has an event to
        // do (Khai, 2026-10-22). Event-wide summary averages skip it instead.
        const counted = [barehand, weapon].filter((e): e is ScoreEntry => !!e);
        const discipline = key === "any" ? (barehand?.code ? EVENTS[barehand.code].discipline : weapon?.code ? EVENTS[weapon.code].discipline : "changquan") : key;
        const c: Candidate = { ...base, key: discipline, counted, barehand, weapon, score: total, average: total / 2, cleanNandu: counted.some(isClean) };
        if (!pick || c.score > pick.score) pick = c;
      }
      if (pick) out.push(pick);
    } else {
      for (const cat of scoring.categories) {
        // Only a category the athlete entered in full (USAWKF ranks CQ/DS/GS and
        // CQ/JS/QS separately; a lone Changquan is in neither).
        if (cat.complete && !cat.events.every((code) => entries.some((e) => e.code === code))) continue;
        // Skipping a routine in the category leaves the athlete unranked there (as USAWKF did in 2025).
        if (cat.complete && entries.some((e) => e.didNotCompete && e.code && cat.events.includes(e.code))) continue;
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
      (rule.minAverage === undefined || meetsMinimum(c.average, rule.minAverage)) &&
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

/**
 * Division from the event name: the division with the most matching words
 * wins (first on a tie), so "Junior Team Trials Children Elementary …" is
 * Children, not Junior.
 */
export function divisionOf(raw: string, ruleset: Ruleset): string | undefined {
  let best: { id: string; hits: number } | undefined;
  for (const d of ruleset.divisions) {
    const hits = d.matchers.filter((m) => m.test(raw)).length;
    if (hits && (!best || hits > best.hits)) best = { id: d.id, hits };
  }
  return best?.id;
}

/** Assign each entry its division from the ruleset's name matchers (keeps an existing division). */
export function withDivisions(scores: ScoreEntry[], ruleset: Ruleset): ScoreEntry[] {
  return scores.map((s) => (s.division ? s : { ...s, division: divisionOf(s.raw, ruleset) }));
}

