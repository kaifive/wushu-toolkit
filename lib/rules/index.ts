import { OPEN_TOURNAMENT, PWC_2026, USAWKF_ADULT_TRIALS_2025, USAWKF_JUNIOR_TRIALS_2024 } from "./archived";
import type { Ruleset } from "./types";
import { USAWKF_JUNIOR_TRIALS_2025_26 } from "./usawkf-junior-trials-2025-26";

export * from "./types";
export { EVENTS, DISCIPLINE_LABEL, eventDef } from "./events";

export const RULESETS = {
  "usawkf-junior-trials-2025-26": USAWKF_JUNIOR_TRIALS_2025_26,
  "usawkf-junior-trials-2024": USAWKF_JUNIOR_TRIALS_2024,
  "usawkf-adult-trials-2025": USAWKF_ADULT_TRIALS_2025,
  "pwc-2026": PWC_2026,
  "open-tournament": OPEN_TOURNAMENT,
} satisfies Record<string, Ruleset>;

export type RulesetId = keyof typeof RULESETS;

export function getRuleset(id: RulesetId): Ruleset {
  return RULESETS[id];
}

/** The ruleset used by the Rules page and tools when no event is selected. */
export const CURRENT_RULESET = USAWKF_JUNIOR_TRIALS_2025_26;

export function formatDuration(seconds: number | undefined): string {
  if (seconds === undefined) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
