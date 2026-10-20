"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useWatchLists } from "@/lib/watchlist/store";

/** "Watching: Nova Wushu (4)" chips for the current page. Hidden when no list matches. */
export function WatchLegend() {
  const lists = useWatchLists();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const count = () => {
      const seen: Record<string, Set<string>> = {};
      document.querySelectorAll<HTMLElement>("[data-watch]").forEach((el) => {
        const list = el.dataset.watch!;
        (seen[list] ??= new Set()).add((el.dataset.athlete ?? "").toLowerCase());
      });
      setCounts(Object.fromEntries(Object.entries(seen).map(([k, v]) => [k, v.size])));
    };
    count();
    window.addEventListener("wt:watch-applied", count);
    return () => window.removeEventListener("wt:watch-applied", count);
  }, []);

  const active = lists.filter((l) => l.enabled && counts[l.name]);
  if (!active.length) return null;
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
      <span className="text-ink-muted">Watching:</span>
      {active.map((l) => (
        <span key={l.id} className="inline-flex items-center gap-1.5 rounded border border-line bg-surface px-2 py-1 font-semibold">
          <span className="h-3 w-3 rounded-sm" style={{ background: l.color }} aria-hidden />
          {l.name} <span className="font-normal text-ink-muted">({counts[l.name]})</span>
        </span>
      ))}
      <Link href="/watchlists" className="font-semibold text-primary">
        Edit
      </Link>
    </div>
  );
}
