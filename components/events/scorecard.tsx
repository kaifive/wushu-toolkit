import { ExportButtons } from "@/components/export/export-buttons";
import { highlightStyle, type HighlightFor, type ScorecardRow } from "@/lib/events/views";

const f = (n: number | null | undefined, d = 3) => (n == null ? "—" : n.toFixed(d));

/** One athlete's judge-panel breakdown. Struck marks and missed nandu are shown crossed out. */
export function ScorecardCard({ row, highlights }: { row: ScorecardRow; highlights?: HighlightFor }) {
  const { a, b, c, adjustment } = row.scorecard;
  return (
    <details data-athlete={row.athleteName} style={highlightStyle(highlights?.(row.athleteName))} className="rounded-card border border-line bg-surface">
      <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between gap-3 px-4 py-2">
        <span className="min-w-0">
          <span className="block truncate font-semibold">{row.athleteName}</span>
          <span className="block truncate text-xs text-ink-muted">{row.raw}</span>
        </span>
        <span className="shrink-0 font-semibold tabular-nums">{f(row.finalScore)}</span>
      </summary>
      <dl className="grid grid-cols-1 gap-3 px-4 pb-4 text-sm sm:grid-cols-2">
        {a && (
          <div>
            <dt className="text-xs font-semibold uppercase text-ink-muted">A · Quality {f(a.score, 2)}</dt>
            <dd className="mt-1">{a.deductions.length ? `Deduction codes: ${a.deductions.join(", ")}` : "No deductions"}</dd>
          </div>
        )}
        {b && (
          <div>
            <dt className="text-xs font-semibold uppercase text-ink-muted">B · Performance {f(b.score)}</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5 tabular-nums">
              {b.marks.length
                ? b.marks.map((m, i) => (
                    <span key={i} className={b.counted[i] === false ? "text-ink-muted line-through" : ""}>
                      {m.toFixed(2)}
                    </span>
                  ))
                : "—"}
            </dd>
          </div>
        )}
        {c && (
          <div>
            <dt className="text-xs font-semibold uppercase text-ink-muted">C · Difficulty {f(c.score, 2)}</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {c.elements.length
                ? c.elements.map((el, i) => (
                    <span key={i} className={c.made[i] === false ? "text-seal line-through" : ""}>
                      {el}
                    </span>
                  ))
                : "—"}
            </dd>
          </div>
        )}
        {adjustment !== undefined && adjustment !== 0 && (
          <div>
            <dt className="text-xs font-semibold uppercase text-ink-muted">Head judge adjustment</dt>
            <dd className="mt-1 tabular-nums">{adjustment.toFixed(3)}</dd>
          </div>
        )}
        {row.nandu?.length ? (
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase text-ink-muted">Declared nandu</dt>
            <dd className="mt-1 font-mono text-xs">{row.nandu.join(" · ")}</dd>
          </div>
        ) : null}
      </dl>
      <ExportButtons target={{ kind: "scorecard", athleteName: row.athleteName, raw: row.raw }} className="border-t border-line px-4 py-2" />
    </details>
  );
}
