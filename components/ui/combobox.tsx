"use client";

import { useId, useMemo, useState } from "react";

export interface ComboOption {
  value: string;
  detail?: string;
}

/**
 * Text box with suggestions. Enter picks the highlighted suggestion, or the
 * typed text when `allowTyped` and nothing matches exactly.
 */
export function Combobox({
  label,
  placeholder,
  suggest,
  onPick,
  allowTyped = true,
  typedLabel = (v) => `Add “${v}”`,
  hideLabel = false,
}: {
  label: string;
  placeholder?: string;
  suggest: (q: string) => ComboOption[];
  onPick: (value: string) => void;
  /** Offer the typed text as an option; a function decides per query. */
  allowTyped?: boolean | ((q: string) => boolean);
  typedLabel?: (v: string) => string;
  hideLabel?: boolean;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const id = useId();

  const options = useMemo(() => {
    const t = q.trim();
    if (!t) return [];
    const list: (ComboOption & { typed?: boolean })[] = suggest(t);
    const typed = typeof allowTyped === "function" ? allowTyped(t) : allowTyped;
    if (typed && !list.some((o) => o.value.toLowerCase() === t.toLowerCase())) list.push({ value: t, typed: true });
    return list;
  }, [q, suggest, allowTyped]);

  // Suggestions can shrink while typing (or when data arrives); keep the highlight in range.
  const current = Math.min(active, Math.max(0, options.length - 1));

  const choose = (v: string) => {
    onPick(v);
    setQ("");
    setActive(0);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!options.length) return;
    if (e.key === "ArrowDown") setActive((a) => (a + 1) % options.length);
    else if (e.key === "ArrowUp") setActive((a) => (a - 1 + options.length) % options.length);
    else if (e.key === "Enter") choose(options[current]!.value);
    else if (e.key === "Escape") setQ("");
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <label htmlFor={`${id}-in`} className={hideLabel ? "sr-only" : "mb-1 block text-sm font-semibold"}>
        {label}
      </label>
      <input
        id={`${id}-in`}
        role="combobox"
        aria-expanded={options.length > 0}
        aria-controls={`${id}-list`}
        aria-activedescendant={options.length ? `${id}-o-${current}` : undefined}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder={placeholder}
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
              key={`${o.typed ? "t" : "s"}-${o.value}`}
              id={`${id}-o-${i}`}
              role="option"
              aria-selected={i === current}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(o.value)}
              onMouseEnter={() => setActive(i)}
              className={`flex min-h-tap cursor-pointer flex-col justify-center px-3 py-2 ${i === current ? "bg-primary-soft" : ""}`}
            >
              {o.typed ? (
                <span>{typedLabel(o.value)}</span>
              ) : (
                <>
                  <span className="font-semibold">{o.value}</span>
                  {o.detail && <span className="truncate text-sm text-ink-muted">{o.detail}</span>}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
