import { sameName } from "@/lib/watchlist/match";
import type { Schedule, ScoreEntry } from "./types";
import type { ScheduleBlock, ScheduleEntry } from "./types";

export type FlaggedEntry = ScheduleEntry & { isCurrent: boolean };
export type FlaggedBlock =
  | { type: "session"; start: string; end: string; entries: FlaggedEntry[]; finished: boolean; title?: string }
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

/**
 * A schedule from a posted order of competition (no times): one block per
 * event, each athlete with their score once it is in.
 */
export function orderSchedule(ring: string, order: { event: string; athletes: string[] }[], scores: ScoreEntry[]): Schedule {
  return {
    ring,
    blocks: order.map(({ event, athletes }) => {
      const inEvent = scores.filter((s) => s.raw === event);
      return {
        type: "session" as const,
        title: event,
        start: "",
        end: "",
        entries: athletes.map((name) => {
          const hit = inEvent.find((s) => sameName(s.athleteName, name)) ?? looseMatch(inEvent, name);
          return { time: "", athleteName: hit?.athleteName ?? name, event, score: hit?.finalScore != null ? hit.finalScore.toFixed(3) : undefined, gender: hit?.gender };
        }),
      };
    }),
  };
}

/** "Yang Chien-Mu" in a posted order vs "Yang Chien" on Sportdata: one name's words inside the other's, if only one athlete fits. */
function looseMatch(scores: ScoreEntry[], name: string): ScoreEntry | undefined {
  const words = (n: string) => new Set(n.toLowerCase().split(/[\s-]+/).filter(Boolean));
  const a = words(name);
  const within = (x: Set<string>, y: Set<string>) => x.size >= 2 && [...x].every((w) => y.has(w));
  const hits = scores.filter((s) => {
    const b = words(s.athleteName);
    return within(a, b) || within(b, a);
  });
  return hits.length === 1 ? hits[0] : undefined;
}
