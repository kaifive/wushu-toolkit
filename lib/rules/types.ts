import type { Discipline, EventCode, Gender } from "@/lib/domain/types";

/** Where a ruleset's values came from, and whether they were checked against the document. */
export interface RuleSource {
  title: string;
  revision?: string;
  url?: string;
  /** False until every value has been checked against the official document. */
  verified: boolean;
  notes?: string[];
}

export interface Division {
  id: string;
  label: string;
  /** Inclusive birth-date range (ISO yyyy-mm-dd). */
  born?: { from?: string; to?: string };
  /** Event set performed, e.g. "3rd Set International Routines". */
  routines?: string;
  /** Words that identify the division in Sportdata / sheet event names. */
  matchers: RegExp[];
  events: EventCode[];
}

export interface TimeLimit {
  division: string;
  events: EventCode[];
  /** Seconds. */
  min?: number;
  max?: number;
  note?: string;
}

export interface MusicRule {
  division: string;
  events: EventCode[];
  requirement: "required" | "optional" | "none";
  note?: string;
}

export type TeamId = "A" | "B" | "C";

/**
 * How an athlete's selection score is computed.
 * - barehand-plus-weapon: best barehand + best weapon. `pairing` "any" pairs
 *   across disciplines (2024); "same-discipline" pairs within one discipline
 *   and the athlete is ranked in their best discipline (2025 juniors, r15).
 * - category-average: average of all events in a category (2025 adults).
 */
export type SelectionScoring =
  | { method: "barehand-plus-weapon"; pairing: "any" | "same-discipline" }
  | { method: "category-average"; categories: { id: string; label: string; events: EventCode[]; /** Counts only if every event was entered. */ complete?: boolean }[] };

export type TieBreak =
  /** Highest single event score among the counted events. */
  | "highest-single-event"
  /** Higher best barehand score. */
  | "higher-barehand"
  /** Higher best weapon score. */
  | "higher-weapon"
  /** More counted events with full difficulty (C panel 2.0). */
  | "more-full-nandu"
  /** Higher B-panel (performance) score in the best event. */
  | "higher-performance"
  /** Higher lowest discarded B mark in the best event. */
  | "higher-lowest-discarded";

export interface TeamRule {
  id: TeamId;
  /** Roster size per division id ("*" = default). */
  size: Record<string, number>;
  /**
   * Minimum selection average to be placed on this team: the candidate's
   * `average` (barehand + weapon over 2, a missing half counting 0; or the
   * category average for category-average scoring).
   */
  minAverage?: number;
  /** Phase 1 places at most one athlete per discipline/category. */
  onePerDiscipline?: boolean;
  /** Phase 1 order of disciplines/categories (2025 adults). Omit to go strictly by score. */
  disciplineOrder?: string[];
  /** After phase 1, fill remaining spots with the best remaining athletes regardless of discipline. */
  fill?: boolean;
  /** Require full difficulty (all nandu made) in at least one counted event (2025 adults A team). */
  requireCleanNandu?: boolean;
}

export interface SelectionRules {
  scoring: SelectionScoring;
  /** Teams in selection order: A first, then B, then C. */
  teams: TeamRule[];
  tieBreaks: TieBreak[];
  /** Selection runs separately per gender and division. */
  perDivision: boolean;
}

/** PWC-style all-around: sum of an athlete's top N scores. */
export interface AllAroundRules {
  topN: number;
  minForms: number;
  /** Age divisions for age-group champions. */
  ageGroups: { id: string; label: string; min: number; max: number }[];
  requiresOptIn: boolean;
}

export interface Ruleset {
  id: string;
  name: string;
  governingBody: "USAWKF" | "IWUF" | "Event organizer";
  season: string;
  source: RuleSource;
  /** Judging rules this ruleset defers to (deductions, nandu, scoring panels). */
  judging?: { rulesetId: string; label: string };
  genders: Gender[];
  divisions: Division[];
  timeLimits: TimeLimit[];
  music: MusicRule[];
  selection?: SelectionRules;
  allAround?: AllAroundRules;
}

export const DISCIPLINES: Discipline[] = ["changquan", "nanquan", "taijiquan"];
