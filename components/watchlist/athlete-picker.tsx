"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { suggestAthletes, type AthleteIndex } from "@/lib/watchlist/suggest";

import { loadAthleteIndex as loadIndex } from "./athlete-index";

type Option = { kind: "athlete"; name: string; detail: string } | { kind: "typed"; name: string };

/** Type-ahead for adding athletes, suggesting names from past competitions. */
export function AthletePicker({ exclude, onAdd }: { exclude: string[]; onAdd: (names: string[]) => void }) {
  const [index, setIndex] = useState<AthleteIndex | null>(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const id = useId();

  useEffect(() => {
    void loadIndex().then(setIndex);
  }, []);

  const options = useMemo<Option[]>(() => {
    if (!q.trim()) return [];
    const people = index ? suggestAthletes(index, q, exclude) : [];
    const out: Option[] = [
      ...people.map((a) => ({ kind: "athlete" as const, name: a.name, detail: [a.clubs[0], a.events.slice(0, 2).join(", ")].filter(Boolean).join(" · ") })),
    ];
    if (q.trim().split(/\s+/).length >= 2 && !people.some((p) => p.name.toLowerCase() === q.trim().toLowerCase())) out.push({ kind: "typed", name: q.trim() });
    return out;
  }, [index, q, exclude]);

  const choose = (o: Option) => {
    onAdd([o.name]);
    setQ("");
    setActive(0);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!options.length) return;
    if (e.key === "ArrowDown") setActive((a) => (a + 1) % options.length);
    else if (e.key === "ArrowUp") setActive((a) => (a - 1 + options.length) % options.length);
    else if (e.key === "Enter") choose(options[active] ?? options[0]!);
    else if (e.key === "Escape") setQ("");
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <label htmlFor={`${id}-input`} className="mb-1 block text-sm font-semibold">
        Add athletes
      </label>
      <input
        id={`${id}-input`}
        role="combobox"
        aria-expanded={options.length > 0}
        aria-controls={`${id}-list`}
        aria-activedescendant={options.length ? `${id}-opt-${active}` : undefined}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder="Start typing a name"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setActive(0);
        }}
        onKeyDown={onKey}
        className="min-h-tap w-full rounded-card border border-line bg-surface px-3"
      />
      {options.length > 0 && (
        <ul id={`${id}-list`} role="listbox" className="mt-1 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {options.map((o, i) => (
            <li
              key={`${o.kind}-${o.name}`}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(o)}
              onMouseEnter={() => setActive(i)}
              className={`flex min-h-tap cursor-pointer flex-col justify-center px-3 py-2 ${i === active ? "bg-primary-soft" : ""}`}
            >
              {o.kind === "athlete" ? (
                <>
                  <span className="font-semibold">{o.name}</span>
                  {o.detail && <span className="truncate text-sm text-ink-muted">{o.detail}</span>}
                </>
              ) : (
                <span>
                  Add &ldquo;<span className="font-semibold">{o.name}</span>&rdquo; <span className="text-ink-muted">(not in past results)</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
