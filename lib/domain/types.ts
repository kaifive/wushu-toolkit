/**
 * Normalized domain types. Every DataSource returns these, so pages never
 * know whether data came from a sheet, Sportdata, an API or a snapshot.
 */

export type Gender = "male" | "female";

/** The three taolu disciplines used by team selection. */
export type Discipline = "changquan" | "nanquan" | "taijiquan";

export type EventKind = "barehand" | "weapon";

/** Two-letter event code, e.g. CQ (Changquan), DS (Daoshu), TJ (Taijijian). */
export type EventCode =
  | "CQ" | "DS" | "JS" | "GS" | "QS"
  | "NQ" | "ND" | "NG"
  | "TQ" | "TJ" | "TS";

export interface Athlete {
  /** Stable key: normalized "first last" (order-insensitive). See athleteKey(). */
  id: string;
  name: string;
  gender?: Gender;
  /** Age on the cutoff date, when known. */
  age?: number;
  club?: string;
  /** Division / age-group id from the ruleset, e.g. "A", "B", "C". */
  division?: string;
  /** Opt-ins and labels from the source, e.g. "all-around". */
  tags?: string[];
}

export interface EntryRef {
  /** Event name exactly as the source printed it. */
  raw: string;
  code?: EventCode;
  gender?: Gender;
  division?: string;
}

export interface Registration {
  athlete: Athlete;
  entries: (EntryRef & { nandu?: string[]; waitlisted?: boolean })[];
}

/** One judge-panel breakdown, as Sportdata prints it. */
export interface Scorecard {
  /** Panel A: quality of movements (deductions from 5.0 under IWUF). */
  a?: { score: number | null; deductions: string[] };
  /** Panel B: overall performance; `counted[i]` is false for dropped scores. */
  b?: { score: number | null; marks: number[]; counted: boolean[] };
  /** Panel C: degree of difficulty; `made[i]` is false for missed nandu. */
  c?: { score: number | null; elements: string[]; made: boolean[] };
  adjustment?: number;
}

export interface ScoreEntry extends EntryRef {
  athleteId: string;
  athleteName: string;
  club?: string;
  /** null = registered but not yet scored. */
  finalScore: number | null;
  scorecard?: Scorecard;
  nandu?: string[];
  /** Ring / session label, if the source has one. */
  ring?: string;
}

export interface ScheduleEntry {
  time: string;
  athleteName: string;
  event: string;
  experience?: string;
  score?: string;
}

export type ScheduleBlock =
  | { type: "session"; start: string; end: string; entries: ScheduleEntry[] }
  | { type: "break"; label: string };

export interface Schedule {
  ring: string;
  blocks: ScheduleBlock[];
}

/** Everything an event page needs, plus where and when it came from. */
export interface EventData {
  registrations: Registration[];
  scores: ScoreEntry[];
  schedules: Schedule[];
  /** ISO timestamp of when the data was fetched or snapshotted. */
  asOf: string;
  /** Human description of the source, e.g. "Sportdata (live)", "Snapshot 2025-06-13". */
  source: string;
  /** True when a fallback (snapshot) was served because the live source failed. */
  stale?: boolean;
}
