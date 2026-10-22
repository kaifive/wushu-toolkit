import type { ScoreEntry } from "@/lib/domain/types";

/** Scores are kept to thousandths everywhere (judging precision). */
export const round3 = (n: number) => Math.round(n * 1000) / 1000;

/** A score for display: "—" when missing, else fixed decimals (3 by default). */
export const fmtScore = (n: number | null | undefined, decimals = 3) => (n == null ? "—" : n.toFixed(decimals));

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
