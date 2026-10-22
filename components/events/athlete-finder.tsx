"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SearchIcon } from "@/components/ui/icons";
import { ScrollTable, stickyCol, td, th } from "@/components/ui/table";
import type { AthleteProfile } from "@/lib/events/views";
import { prepareName } from "@/lib/watchlist/match";

/**
 * Pick an athlete (by name or school) and see all their results: v1's athlete
 * dashboard. Opens on ?athlete=… so it can be linked to.
 */
export function AthleteFinder({ athletes, scorecardsHref }: { athletes: AthleteProfile[]; scorecardsHref?: string }) {
  const [q, setQ] = useState("");
  const [club, setClub] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const clubs = useMemo(() => [...new Set(athletes.map((a) => a.club).filter((c): c is string => !!c))].sort(), [athletes]);

  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("athlete");
    if (!name) return;
    const hit = athletes.find((a) => a.name === name);
    // Read the deep link once on mount (static page). A spelling the results
    // don't use goes into the search box instead.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (hit) setPicked(hit.id);
    else setQ(name);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [athletes]);

  const pick = (a: AthleteProfile | null) => {
    setPicked(a?.id ?? null);
    const url = new URL(window.location.href);
    if (a) url.searchParams.set("athlete", a.name);
    else url.searchParams.delete("athlete");
    window.history.replaceState(null, "", url);
  };

  const matches = useMemo(() => {
    const words = prepareName(q).tokens;
    return athletes.filter((a) => (!club || a.club === club) && (!words.length || words.every((w) => prepareName(a.name).tokens.some((t) => t.startsWith(w)))));
  }, [athletes, q, club]);
  const current = athletes.find((a) => a.id === picked);

  if (current) return <Profile a={current} onBack={() => pick(null)} scorecardsHref={scorecardsHref} />;
  return (
    <div>
      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            placeholder="Athlete"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Find an athlete"
            className="min-h-tap w-full rounded-card border border-line bg-surface pl-10 pr-3"
          />
        </div>
        <select value={club} onChange={(e) => setClub(e.target.value)} aria-label="School" className="min-h-tap w-full rounded-card border border-line bg-surface px-3">
          <option value="">All schools</option>
          {clubs.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <p className="mb-2 text-xs text-ink-muted" aria-live="polite">
        {matches.length} of {athletes.length} athletes
      </p>
      <ul className="divide-y divide-line rounded-card border border-line bg-surface">
        {matches.slice(0, 60).map((a) => (
          <li key={a.id}>
            <button type="button" onClick={() => pick(a)} className="flex min-h-tap w-full items-center justify-between gap-3 px-4 py-2 text-left hover:bg-surface-2">
              <span className="min-w-0">
                <span className="block truncate font-semibold">{a.name}</span>
                {a.club && <span className="block truncate text-xs text-ink-muted">{a.club}</span>}
              </span>
              <span className="shrink-0 text-xs text-ink-muted">{a.routines.length} routines</span>
            </button>
          </li>
        ))}
      </ul>
      {matches.length > 60 && <p className="mt-2 text-xs text-ink-muted">Showing 60. Type a name or pick a school to narrow it down.</p>}
    </div>
  );
}

function Profile({ a, onBack, scorecardsHref }: { a: AthleteProfile; onBack: () => void; scorecardsHref?: string }) {
  const best = a.routines.find((r) => r.score != null);
  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="inline-flex min-h-tap items-center font-semibold text-primary">
        ← All athletes
      </button>
      <div>
        <h2 className="font-display text-2xl font-bold">{a.name}</h2>
        {a.club && <p className="text-sm text-ink-muted">{a.club}</p>}
      </div>
      {(a.overall.length > 0 || a.allAround || best) && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {a.overall.map((o) => (
            <div key={`${o.scope}-${o.discipline}`} className="rounded-card border border-line bg-surface p-3">
              <p className="font-display text-xl font-bold tabular-nums">
                #{o.rank} <span className="text-sm font-normal text-ink-muted">of {o.of}</span>
              </p>
              <p className="text-xs text-ink-muted">
                {o.scope} · {o.discipline}
              </p>
              {o.team && (
                <p className="mt-1">
                  <Badge tone="primary">{o.team} Team</Badge>
                </p>
              )}
            </div>
          ))}
          {a.allAround && (
            <div className="rounded-card border border-line bg-surface p-3">
              <p className="font-display text-xl font-bold tabular-nums">
                #{a.allAround.place} <span className="text-sm font-normal text-ink-muted">of {a.allAround.of}</span>
              </p>
              <p className="text-xs text-ink-muted">All-around · {a.allAround.total.toFixed(3)}</p>
            </div>
          )}
          {best && (
            <div className="rounded-card border border-line bg-surface p-3">
              <p className="font-display text-xl font-bold tabular-nums">{best.score!.toFixed(3)}</p>
              <p className="truncate text-xs text-ink-muted">Best · {best.raw}</p>
            </div>
          )}
        </div>
      )}
      <ScrollTable caption={`${a.name}'s routines`}>
        <thead className="border-b border-line">
          <tr>
            <th className={`${th} ${stickyCol}`}>Event</th>
            <th className={`${th} text-right`}>Score</th>
            <th className={`${th} text-right`}>Place</th>
            <th className={`${th} text-right`}>vs Avg</th>
          </tr>
        </thead>
        <tbody>
          {a.routines.map((r, i) => {
            const diff = r.score != null && r.average != null ? r.score - r.average : null;
            const href =
              scorecardsHref && r.hasScorecard && r.score != null
                ? `${scorecardsHref}?${new URLSearchParams({ ...(a.gender ? { gender: a.gender } : {}), athlete: a.name, event: r.raw })}`
                : undefined;
            return (
              <tr key={`${i}-${r.raw}`} className="border-b border-line last:border-0">
                <td className={`${td} ${stickyCol}`}>
                  <p className="font-semibold">{r.raw}</p>
                  {r.average != null && <p className="text-xs text-ink-muted">Average {r.average.toFixed(3)}</p>}
                </td>
                <td className={`${td} text-right font-semibold tabular-nums`}>
                  {r.score == null ? (
                    "—"
                  ) : href ? (
                    <Link href={href} className="inline-flex min-h-tap items-center text-primary underline decoration-dotted underline-offset-4">
                      {r.score.toFixed(3)}
                    </Link>
                  ) : (
                    r.score.toFixed(3)
                  )}
                </td>
                <td className={`${td} text-right tabular-nums`}>{r.place ? `${r.place}/${r.of}` : "—"}</td>
                <td className={`${td} text-right tabular-nums ${diff != null && diff < 0 ? "text-ink-muted" : ""}`}>
                  {diff == null ? "—" : `${diff >= 0 ? "+" : "−"}${Math.abs(diff).toFixed(3)}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </ScrollTable>
    </div>
  );
}
