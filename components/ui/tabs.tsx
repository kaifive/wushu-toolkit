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

  if (tabs.length <= 1) return <>{panels[0]}</>;

  return (
    <div>
      <div role="tablist" aria-label={label} className="mb-4 flex gap-1 overflow-x-auto rounded-xl bg-line/50 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`${uid}-tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`${uid}-panel-${t.id}`}
            onClick={() => select(t.id)}
            className={`min-h-tap flex-1 whitespace-nowrap rounded-lg px-3 text-sm font-semibold ${
              active === t.id ? "bg-surface text-ink shadow-sm" : "text-ink-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`${uid}-panel-${t.id}`} aria-labelledby={`${uid}-tab-${t.id}`} hidden={active !== t.id}>
          {panels[i]}
        </div>
      ))}
    </div>
  );
}
