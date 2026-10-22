"use client";

import { haptic } from "@/lib/haptics";
import { DownloadIcon } from "@/components/ui/icons";
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
  | { kind: "overall"; gender: Gender; division: string }
  | { kind: "stats" }
  | { kind: "athlete"; athleteId: string; athleteName: string };

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
      const req = fetch(`/api/events/${slug}/data`)
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json() as Promise<EventData>;
        })
        .catch((err: unknown) => {
          cache.current = null; // network or bad response: the next tap retries
          throw err;
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
    case "stats":
      return { sheet: sheets.statsSheet(ctx.eventName, views.scorecardStats(data)), name: fileName(ctx.eventName, "stats") };
    case "athlete": {
      const a = views.athleteProfiles(data, ruleset).find((x) => x.id === t.athleteId);
      return a ? { sheet: sheets.athleteSheet(ctx.eventName, a), name: fileName(ctx.eventName, a.name) } : null;
    }
  }
}

/**
 * Phones (and in-app browsers) often ignore a download link, so use the share
 * sheet there ("Save Image", "Save to Files"); fall back to a normal download.
 */
async function save(file: File): Promise<"done" | "needs-tap"> {
  const touch = window.matchMedia?.("(pointer: coarse)").matches;
  if (touch && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: file.name });
      return "done";
    } catch (err) {
      const name = (err as Error)?.name;
      if (name === "AbortError") return "done"; // closed the share sheet
      // Building the file took long enough that the browser no longer counts the tap.
      if (name === "NotAllowedError") return "needs-tap";
    }
  }
  download(file, file.name);
  return "done";
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

const labelOf = (t: ExportTarget) =>
  t.kind === "scorecard"
    ? `${t.athleteName} ${t.raw} scorecard`
    : t.kind === "result"
      ? `${t.raw} results`
      : t.kind === "stats"
        ? "stats"
        : t.kind === "athlete"
          ? `${t.athleteName} results`
          : "overall standings";

export function ExportButtons({ target, className = "" }: { target: ExportTarget; className?: string }) {
  const label = labelOf(target);
  const ctx = useContext(ExportContext);
  const [busy, setBusy] = useState<"png" | "pdf" | null>(null);
  const [failed, setFailed] = useState(false);
  const [menu, setMenu] = useState(false);
  const [ready, setReady] = useState<File | null>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menu) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !box.current?.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [menu]);
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
    setReady(null);
    try {
      const built = await build(ctx, target);
      if (!built) throw new Error("not found");
      const { sheetToPdf, sheetToPng } = await import("@/lib/export/render");
      const blob = type === "png" ? await sheetToPng(built.sheet) : await sheetToPdf(built.sheet);
      const file = new File([blob], `${built.name}.${type}`, { type: blob.type });
      if ((await save(file)) === "needs-tap") setReady(file);
    } catch {
      setFailed(true);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div ref={box} className="relative">
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => {
            haptic();
            setMenu((m) => !m);
          }}
          aria-expanded={menu}
          aria-haspopup="menu"
          aria-label={`Download ${label}`}
          title="Download"
          className="flex h-11 w-11 items-center justify-center rounded-card border border-line bg-surface text-ink-muted hover:border-primary hover:text-primary disabled:opacity-50"
        >
          {busy ? <span className="text-xs font-semibold">…</span> : <DownloadIcon className="h-5 w-5" />}
        </button>
        {menu && (
          <div role="menu" className="absolute bottom-full left-0 z-30 mb-1 w-40 overflow-hidden rounded-card border border-line bg-surface shadow-lg">
            {(["png", "pdf"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenu(false);
                  void run(t);
                }}
                className="flex min-h-tap w-full items-center px-3 text-left text-sm font-semibold hover:bg-surface-2"
              >
                {t === "png" ? "Image (PNG)" : "PDF"}
              </button>
            ))}
          </div>
        )}
      </div>
      {busy && <span className="text-sm text-ink-muted">Saving…</span>}
      {ready && (
        <button
          type="button"
          onClick={() => {
            const f = ready;
            setReady(null);
            void save(f);
          }}
          className="min-h-tap rounded-card bg-primary px-3 text-sm font-semibold text-primary-ink"
        >
          Save {ready.name.endsWith(".pdf") ? "PDF" : "image"}
        </button>
      )}
      {failed && <span className="text-sm text-seal">Export failed. Try again.</span>}
    </div>
  );
}
