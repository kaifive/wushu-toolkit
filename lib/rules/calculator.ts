/**
 * "Score beater": the lowest scores that strictly beat a target average.
 * Scores have three decimals, so the math runs in integer thousandths to
 * avoid floating-point surprises (9.1 * 3 !== 27.3 in floats).
 */

export type BeatResult =
  | { kind: "already"; average: number }
  | { kind: "short"; average: number }
  | { kind: "need"; each: number; missing: number; possible: boolean }
  | { kind: "invalid"; reason: string };

const toK = (n: number) => Math.round(n * 1000);

export function scoreToBeat(target: number, known: number[], count: number, maxScore = 10): BeatResult {
  if (!Number.isFinite(target) || target < 0) return { kind: "invalid", reason: "Enter the average to beat." };
  if (count < 1 || known.length > count) return { kind: "invalid", reason: `Enter at most ${count} scores.` };
  if (known.some((s) => !Number.isFinite(s) || s < 0 || s > maxScore)) return { kind: "invalid", reason: `Scores must be between 0 and ${maxScore}.` };

  const targetSumK = toK(target) * count; // sum that only ties
  const haveK = known.reduce((s, x) => s + toK(x), 0);
  const missing = count - known.length;

  if (missing === 0) {
    const average = haveK / count / 1000;
    return haveK > targetSumK ? { kind: "already", average } : { kind: "short", average };
  }
  // Smallest equal per-score value (in thousandths) with have + missing * x > targetSum.
  const needK = Math.max(0, Math.floor((targetSumK - haveK) / missing) + 1);
  if (haveK > targetSumK) return { kind: "need", each: 0, missing, possible: true };
  return { kind: "need", each: needK / 1000, missing, possible: needK <= toK(maxScore) };
}
