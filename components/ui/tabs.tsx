"use client";

import { useEffect, useId, useState } from "react";

export interface TabDef {
  id: string;
  label: string;
}

/**
 * Accessible tabs over server-rendered panels. The selected tab is kept in a
 * URL query param (e.g. ?gender=female) so links and the legacy redirect can
 * deep-link, without making the page dynamic.
 */
export function Tabs({ tabs, panels, param, label }: { tabs: TabDef[]; panels: React.ReactNode[]; param: string; label: string }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const uid = useId();

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(param);
    // Sync from the URL once on mount (deep links); the effect only runs client-side.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromUrl && tabs.some((t) => t.id === fromUrl)) setActive(fromUrl);
  }, [param, tabs]);

  const select = (id: string) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.set(param, id);
    window.history.replaceState(null, "", url);
  };

  // WAI-ARIA tabs: arrow keys, Home and End move between tabs.
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = tabs.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next === -1) return;
    e.preventDefault();
    select(tabs[next]!.id);
    document.getElementById(`${uid}-tab-${tabs[next]!.id}`)?.focus();
  };

  if (tabs.length <= 1) return <>{panels[0]}</>;
  // Live data can drop a tab (e.g. a division with no entries left): show the first one then.
  const shown = tabs.some((t) => t.id === active) ? active : tabs[0]!.id;

  return (
    <div>
      <div role="tablist" aria-label={label} className="mb-4 flex overflow-x-auto rounded-card border border-line bg-surface">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            id={`${uid}-tab-${t.id}`}
            aria-selected={shown === t.id}
            aria-controls={`${uid}-panel-${t.id}`}
            tabIndex={shown === t.id ? 0 : -1}
            onClick={() => select(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`min-h-tap flex-1 whitespace-nowrap border-r border-line px-3 text-[15px] font-semibold last:border-r-0 ${
              shown === t.id ? "bg-primary text-primary-ink" : "text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`${uid}-panel-${t.id}`} aria-labelledby={`${uid}-tab-${t.id}`} hidden={shown !== t.id}>
          {panels[i]}
        </div>
      ))}
    </div>
  );
}
