"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { EventData, Gender } from "@/lib/domain/types";
import type { RulesetId } from "@/lib/rules";
import type { Sheet } from "@/lib/export/sheet";

/**
 * PNG and PDF downloads for event pages. Buttons carry only a small key; the
 * event data comes from ExportProvider when a button is tapped, so static
 * pages don't ship every scorecard twice.
 */
export type ExportTarget =
  | { kind: "scorecard"; athleteName: string; raw: string }
  | { kind: "result"; raw: string; gender?: Gender }
  | { kind: "overall"; gender: Gender; division: string };

interface Ctx {
  eventName: string;
  rulesetId: RulesetId;
  getData: () => Promise<EventData>;
}

const ExportContext = createContext<Ctx | null>(null);

/** Static pages pass `slug` (data is fetched on first export); client-rendered pages pass `data`. */
export function ExportProvider({ slug, eventName, rulesetId, data, children }: { slug: string; eventName: string; rulesetId: RulesetId; data?: EventData; children: React.ReactNode }) {
  // Fetched data is reused for 30s: live pages refresh every minute, so exports match the screen.
  const cache = useRef<{ key: string; at: number; data: Promise<EventData> } | null>(null);
  const value = useMemo<Ctx>(() => {
    const getData = () => {
      if (data) return Promise.resolve(data);
      const hit = cache.current;
      if (hit && hit.key === slug && Date.now() - hit.at < 30_000) return hit.data;
      const req = fetch(`/api/events/${slug}/data`).then((r) => {
        if (!r.ok) {
          cache.current = null;
          throw new Error(`HTTP ${r.status}`);
        }
        return r.json() as Promise<EventData>;
      });
      cache.current = { key: slug, at: Date.now(), data: req };
      return req;
    };
    return { eventName, rulesetId, getData };
  }, [slug, eventName, rulesetId, data]);
  return <ExportContext.Provider value={value}>{children}</ExportContext.Provider>;
}

async function build(ctx: Ctx, t: ExportTarget): Promise<{ sheet: Sheet; name: string } | null> {
  const [data, views, rules, sheets] = await Promise.all([ctx.getData(), import("@/lib/events/views"), import("@/lib/rules"), import("@/lib/export/sheet")]);
  const ruleset = rules.getRuleset(ctx.rulesetId);
  const { fileName } = sheets;
  switch (t.kind) {
    case "scorecard": {
      const row = views.scorecards(data).find((r) => r.athleteName === t.athleteName && r.raw === t.raw);
      return row ? { sheet: sheets.scorecardSheet(ctx.eventName, row), name: fileName(ctx.eventName, row.athleteName, row.raw) } : null;
    }
    case "result": {
      const r = views.resultsByEvent(data, ruleset).find((x) => x.raw === t.raw && x.gender === t.gender);
      return r ? { sheet: sheets.resultSheet(ctx.eventName, r), name: fileName(ctx.eventName, r.raw) } : null;
    }
    case "overall": {
      const m = views.selectionModel(data, ruleset).find((x) => x.gender === t.gender && x.division.id === t.division);
      return m ? { sheet: sheets.overallSheet(ctx.eventName, m), name: fileName(ctx.eventName, "overall", m.gender, m.division.label) } : null;
    }
  }
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

const labelOf = (t: ExportTarget) => (t.kind === "scorecard" ? `${t.athleteName} ${t.raw} scorecard` : t.kind === "result" ? `${t.raw} results` : "overall standings");

export function ExportButtons({ target, className = "" }: { target: ExportTarget; className?: string }) {
  const label = labelOf(target);
  const ctx = useContext(ExportContext);
  const [busy, setBusy] = useState<"png" | "pdf" | null>(null);
  const [failed, setFailed] = useState(false);
  // Inside a closed <details>, wait until it opens: keeps long pages light.
  const probe = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const details = probe.current?.closest("details");
    if (!details) {
      // No collapsible parent: show right after mount.
      setShown(true);
      return;
    }
    const sync = () => details.open && setShown(true);
    sync();
    details.addEventListener("toggle", sync);
    return () => details.removeEventListener("toggle", sync);
  }, []);
  if (!ctx) return null;
  if (!shown) return <span ref={probe} hidden />;

  const run = async (type: "png" | "pdf") => {
    setBusy(type);
    setFailed(false);
    try {
      const built = await build(ctx, target);
      if (!built) throw new Error("not found");
      const { sheetToPdf, sheetToPng } = await import("@/lib/export/render");
      download(type === "png" ? await sheetToPng(built.sheet) : await sheetToPdf(built.sheet), `${built.name}.${type}`);
    } catch {
      setFailed(true);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {(["png", "pdf"] as const).map((t) => (
        <button
          key={t}
          type="button"
          disabled={busy !== null}
          onClick={() => void run(t)}
          aria-label={`Download ${label} as ${t.toUpperCase()}`}
          className="min-h-tap rounded-card border border-line bg-surface px-3 text-sm font-semibold disabled:opacity-50"
        >
          {busy === t ? "Saving…" : `↓ ${t.toUpperCase()}`}
        </button>
      ))}
      {failed && <span className="text-sm text-seal">Export failed. Try again.</span>}
    </div>
  );
}
