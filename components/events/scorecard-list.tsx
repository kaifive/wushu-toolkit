"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "@/components/ui/icons";
import { highlighter, type ScorecardRow } from "@/lib/events/views";
import type { AthleteHighlight } from "@/lib/events/types";
import { prepareName } from "@/lib/watchlist/match";
import { ScorecardCard } from "./scorecard";

/** Show at most this many cards until the list is narrowed down. */
const PAGE = 40;

/**
 * Scorecards for one gender, filterable by athlete and event. Opens on
 * ?athlete=…&event=… (links from the standings) with the matching cards expanded.
 */
export function ScorecardList({ rows, highlights }: { rows: ScorecardRow[]; highlights?: AthleteHighlight[] }) {
  const [q, setQ] = useState("");
  const [event, setEvent] = useState("");
  const [fromLink, setFromLink] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const hl = useMemo(() => highlighter(highlights), [highlights]);
  const events = useMemo(() => [...new Set(rows.map((r) => r.raw))].sort(), [rows]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const athlete = p.get("athlete") ?? "";
    const ev = p.get("event") ?? "";
    // Reading the URL once on mount (a static page can't know it at build time).
    /* eslint-disable react-hooks/set-state-in-effect */
    if (athlete) setQ(athlete);
    if (ev && events.includes(ev)) setEvent(ev);
    if (athlete || ev) setFromLink(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [events]);

  const shown = useMemo(() => {
    const words = prepareName(q).tokens;
    return rows.filter((r) => (!event || r.raw === event) && (!words.length || words.every((w) => prepareName(r.athleteName).tokens.some((t) => t.startsWith(w)))));
  }, [rows, q, event]);

  const set = (key: "athlete" | "event", value: string) => {
    if (key === "athlete") setQ(value);
    else setEvent(value);
    setFromLink(false);
    setLimit(PAGE);
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    window.history.replaceState(null, "", url);
  };

  if (!rows.length) return <p className="text-sm text-ink-muted">No scorecards.</p>;
  return (
    <div>
      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            placeholder="Athlete"
            value={q}
            onChange={(e) => set("athlete", e.target.value)}
            aria-label="Find an athlete"
            className="min-h-tap w-full rounded-card border border-line bg-surface pl-10 pr-3"
          />
        </div>
        <select value={event} onChange={(e) => set("event", e.target.value)} aria-label="Event" className="min-h-tap w-full rounded-card border border-line bg-surface px-3">
          <option value="">All events</option>
          {events.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      <p className="mb-2 text-xs text-ink-muted" aria-live="polite">
        {shown.length} of {rows.length} scorecards
      </p>
      <div className="space-y-2">
        {shown.slice(0, limit).map((r, i) => (
          <ScorecardCard key={`${i}-${r.athleteName}-${r.raw}`} row={r} highlights={hl} open={fromLink && shown.length <= 3} />
        ))}
      </div>
      {shown.length > limit && (
        <button type="button" onClick={() => setLimit((n) => n + PAGE * 2)} className="mt-3 min-h-tap w-full rounded-card border border-line bg-surface font-semibold text-primary">
          Show more ({shown.length - limit} left)
        </button>
      )}
    </div>
  );
}
