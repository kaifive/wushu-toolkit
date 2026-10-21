"use client";

import { useState } from "react";
import { scoreToBeat } from "@/lib/rules/calculator";

const input = "min-h-tap w-full rounded-card border border-line bg-surface px-3 tabular-nums";

export function ScoreCalculator() {
  const [count, setCount] = useState(2);
  const [target, setTarget] = useState("");
  const [scores, setScores] = useState<string[]>(["", "", ""]);

  const known = scores.slice(0, count).filter((s) => s.trim() !== "").map(Number);
  const result = target.trim() === "" ? null : scoreToBeat(Number(target), known, count);
  const labels = count === 2 ? ["Barehand", "Weapon"] : ["Routine 1", "Routine 2", "Routine 3"];

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend className="mb-1 text-sm font-semibold">Routines in the average</legend>
        <div className="flex gap-2">
          {[2, 3].map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={count === n}
              onClick={() => setCount(n)}
              className={`min-h-tap flex-1 rounded-card border px-3 font-semibold ${count === n ? "border-primary bg-primary-soft text-primary" : "border-line bg-surface"}`}
            >
              {n === 2 ? "2 (barehand + weapon)" : "3"}
            </button>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="target" className="mb-1 block text-sm font-semibold">
          Average to beat
        </label>
        <input id="target" inputMode="decimal" placeholder="e.g. 9.000" value={target} onChange={(e) => setTarget(e.target.value)} className={input} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {labels.map((l, i) => (
          <div key={l}>
            <label htmlFor={`s${i}`} className="mb-1 block text-sm font-semibold">
              {l} <span className="font-normal text-ink-muted">(if known)</span>
            </label>
            <input
              id={`s${i}`}
              inputMode="decimal"
              placeholder="—"
              value={scores[i]}
              onChange={(e) => setScores(scores.map((s, j) => (j === i ? e.target.value : s)))}
              className={input}
            />
          </div>
        ))}
      </div>
      <output aria-live="polite" className="block rounded-card border border-line bg-surface p-4">
        {!result && <span className="text-ink-muted">Enter the average you need to beat.</span>}
        {result?.kind === "invalid" && <span className="text-seal">{result.reason}</span>}
        {result?.kind === "already" && <span className="font-semibold text-jade">Average {result.average.toFixed(3)} already beats it.</span>}
        {result?.kind === "short" && <span className="font-semibold text-primary">Average {result.average.toFixed(3)} doesn&apos;t beat it.</span>}
        {result?.kind === "need" && (
          <span>
            <span className="block text-sm text-ink-muted">
              Lowest score needed{result.missing > 1 ? ` on each of ${result.missing} routines` : ""}
            </span>
            <span className={`block font-display text-3xl font-bold tabular-nums ${result.possible ? "" : "text-seal"}`}>{result.each.toFixed(3)}</span>
            {!result.possible && <span className="text-sm text-seal">That&apos;s above 10, so it can&apos;t be beaten.</span>}
          </span>
        )}
      </output>
    </form>
  );
}
