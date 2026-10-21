"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/ui/icons";
import type { DeductionGroup } from "@/lib/rules/iwuf-2024/deductions";

export function DeductionSearch({ groups }: { groups: DeductionGroup[] }) {
  const [groupId, setGroupId] = useState(groups[0]?.id ?? "northern");
  const [q, setQ] = useState("");
  const group = groups.find((g) => g.id === groupId) ?? groups[0]!;

  const codes = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return group.codes;
    return group.codes.filter(
      (c) =>
        c.code.toLowerCase().startsWith(term) ||
        c.english.toLowerCase().includes(term) ||
        c.name.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term) ||
        c.content.some((x) => x.toLowerCase().includes(term)),
    );
  }, [group, q]);

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold" htmlFor="ded-group">
        Event family
      </label>
      <select
        id="ded-group"
        value={groupId}
        onChange={(e) => setGroupId(e.target.value as DeductionGroup["id"])}
        className="mb-3 min-h-tap w-full rounded-card border border-line bg-surface px-3"
      >
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.title}
          </option>
        ))}
      </select>
      <div className="relative mb-4">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
        <input
          type="search"
          inputMode="search"
          placeholder="Code or keyword, e.g. 22 or balance"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search deduction codes"
          className="min-h-tap w-full rounded-card border border-line bg-surface pl-10 pr-3"
        />
      </div>
      <p className="mb-2 text-xs text-ink-muted" aria-live="polite">
        {codes.length} of {group.codes.length} codes
      </p>
      <ul className="space-y-2">
        {codes.map((c) => (
          <li key={`${c.category}-${c.code}`} className="rounded-card border border-line bg-surface p-3">
            <div className="flex items-baseline gap-3">
              <span className="w-8 shrink-0 font-mono text-lg font-semibold text-primary">{c.code}</span>
              <div className="min-w-0">
                <p className="font-semibold">
                  {c.english}
                  {c.name && <span className="ml-1 font-normal text-ink-muted">· {c.name}</span>}
                </p>
                <p className="text-xs text-ink-muted">{c.category}</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm">
                  {c.content.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <details className="mt-6 rounded-card border border-line bg-surface p-3 text-sm">
        <summary className="min-h-tap cursor-pointer font-semibold">Deduction standards</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-muted">
          {group.standards.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
