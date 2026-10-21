import type { ScoreEntry } from "@/lib/domain/types";

/** Scores are kept to thousandths everywhere (judging precision). */
export const round3 = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Averages for display: cut (not rounded) to thousandths, so a shown 9.000
 * always meets a 9.0 minimum (selection compares the exact value).
 */
export const floor3 = (n: number) => Math.floor(n * 1000 + 1e-9) / 1000;

/** Entries per athlete id, in input order. */
export function groupByAthlete(scores: ScoreEntry[]): Map<string, ScoreEntry[]> {
  const m = new Map<string, ScoreEntry[]>();
  for (const s of scores) {
    const list = m.get(s.athleteId);
    if (list) list.push(s);
    else m.set(s.athleteId, [s]);
  }
  return m;
}
