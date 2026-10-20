"use client";

import { useEffect, useState } from "react";
import type { RequiredMovementSet } from "@/lib/rules/iwuf-2024/required-movements";

const KEY = "wt:required-movements:v1";

/** Checklist for one routine type. Ticks are kept on this device only. */
export function MovementChecklist({ sets }: { sets: RequiredMovementSet[] }) {
  const [setId, setSetId] = useState(sets[0]?.id ?? "");
  const [ticked, setTicked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      // Restore saved ticks once on mount; storage is only readable client-side.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setTicked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* storage blocked: start empty */
    }
  }, []);

  const update = (next: Record<string, boolean>) => {
    setTicked(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: keep in memory */
    }
  };

  const set = sets.find((s) => s.id === setId) ?? sets[0]!;
  const keys = set.requirements.flatMap((r, ri) => r.items.map((_, ii) => `${set.id}:${ri}:${ii}`));
  const done = keys.filter((k) => ticked[k]).length;

  return (
    <div>
      <label htmlFor="mv-set" className="mb-1 block text-sm font-semibold">
        Routine
      </label>
      <select id="mv-set" value={setId} onChange={(e) => setSetId(e.target.value)} className="mb-4 min-h-tap w-full rounded-card border border-line bg-surface px-3">
        {sets.map((s) => (
          <option key={s.id} value={s.id}>
            {s.type}
          </option>
        ))}
      </select>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-ink-muted" aria-live="polite">
          {done} of {keys.length} checked
        </p>
        <button
          type="button"
          onClick={() => update(Object.fromEntries(Object.entries(ticked).filter(([k]) => !k.startsWith(`${set.id}:`))))}
          className="min-h-tap rounded-lg px-3 text-sm font-semibold text-primary"
        >
          Reset
        </button>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line" aria-hidden>
        <div className="h-full bg-jade transition-all" style={{ width: `${keys.length ? (done / keys.length) * 100 : 0}%` }} />
      </div>
      <ol className="mt-4 space-y-3">
        {set.requirements.map((r, ri) => (
          <li key={r.title} className="rounded-card border border-line bg-surface p-3">
            <p className="text-sm font-semibold">{r.title}</p>
            <ul className="mt-2 space-y-1">
              {r.items.map((item, ii) => {
                const k = `${set.id}:${ri}:${ii}`;
                return (
                  <li key={k}>
                    <label className="flex min-h-tap cursor-pointer items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={!!ticked[k]}
                        onChange={(e) => update({ ...ticked, [k]: e.target.checked })}
                        className="h-5 w-5 accent-[var(--primary)]"
                      />
                      {item}
                    </label>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
