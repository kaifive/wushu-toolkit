import type { DataSource } from "@/lib/data/source";
import type { EventData } from "@/lib/domain/types";
import type { RulesetId } from "@/lib/rules";

export type EventView = "standings" | "schedule" | "team" | "scorecards" | "all-around";

export type EventStatus = "upcoming" | "live" | "archived";

export interface AthleteHighlight {
  name: string;
  color: string;
  /** [first, last] or full names; matched order-insensitively. */
  athletes: string[];
}

/**
 * One competition. Add a file in content/events/ and register it in
 * content/events/index.ts; the shared engine renders it (ADR-003).
 */
export interface EventConfig {
  slug: string;
  name: string;
  shortName: string;
  /** ISO dates (inclusive). */
  dates: { start: string; end: string; approximate?: boolean };
  location?: string;
  organizer?: string;
  status: EventStatus;
  /** "paid" events need an entitlement to load data (ADR-005). Archived events are always free. */
  access: "free" | "paid";
  rulesetId: RulesetId;
  views: EventView[];
  /** Builds the event's data source. Called on the server only. */
  data: () => DataSource<EventData>;
  /** ISR seconds while live. Archived events are static. */
  revalidate?: number;
  description?: string;
  links?: { label: string; url: string }[];
  highlights?: AthleteHighlight[];
  /**
   * Pre-scrape on a schedule (ADR-008): the snapshot GitHub Action saves this
   * event's live data to data/snapshots/<slug>/ while `until` is in the future.
   */
  snapshot?: { until: string };
  /** Notes shown on the event page (e.g. how scores were collected). */
  notes?: string[];
}
