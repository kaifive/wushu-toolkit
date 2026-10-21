import type { ScheduleBlock, ScheduleEntry } from "./types";

export type FlaggedEntry = ScheduleEntry & { isCurrent: boolean };
export type FlaggedBlock =
  | { type: "session"; start: string; end: string; entries: FlaggedEntry[]; finished: boolean }
  | { type: "break"; label: string };

/**
 * Flag the competitor on the floor: the entry right after the last scored
 * one (athletes can be skipped, so key off the latest score, not the first
 * gap). Nothing scored → first entry is current. All scored → none.
 */
export function withCurrentCompetitor(blocks: ScheduleBlock[], live = true): FlaggedBlock[] {
  let lastScored = -1;
  let i = 0;
  for (const b of blocks) {
    if (b.type !== "session") continue;
    for (const e of b.entries) {
      if (e.score) lastScored = i;
      i++;
    }
  }
  // Finished competitions have nobody on the floor (a last scratch isn't "competing").
  const currentIdx = live ? lastScored + 1 : Number.MAX_SAFE_INTEGER;
  let gi = 0;
  return blocks.map((b) => {
    if (b.type !== "session") return b;
    const entries = b.entries.map((e) => ({ ...e, isCurrent: gi++ === currentIdx }));
    return { ...b, entries, finished: !live || gi <= currentIdx };
  });
}
