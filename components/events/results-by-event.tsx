import { AthleteLink } from "./athlete-link";
import Link from "next/link";
import { ScrollTable, stickyCol, td, th } from "@/components/ui/table";
import { ExportButtons } from "@/components/export/export-buttons";
import type { EventResult } from "@/lib/events/views";

export function ResultsByEvent({ results, scorecardsHref, athletesHref }: { results: EventResult[]; scorecardsHref?: string; athletesHref?: string }) {
  const cardHref = (r: EventResult, athlete: string) =>
    `${scorecardsHref}?${new URLSearchParams({ ...(r.gender ? { gender: r.gender } : {}), athlete, event: r.raw })}`;
  if (!results.length) return <p className="text-sm text-ink-muted">No results yet.</p>;
  return (
    <div className="space-y-2">
      {results.map((r) => {
        const scored = r.rows.filter((x) => x.finalScore != null).length;
        return (
          <details key={`${r.raw}-${r.gender ?? ""}`} className="group rounded-card border border-line bg-surface">
            <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between gap-3 px-4 py-2">
              <span className="font-semibold">{r.raw}</span>
              <span className="shrink-0 text-xs text-ink-muted">
                {scored}/{r.rows.length} scored
              </span>
            </summary>
            <div className="px-4 pb-4">
              <ScrollTable caption={r.raw}>
                <thead className="border-b border-line">
                  <tr>
                    <th className={`${th} ${stickyCol}`}>Athlete</th>
                    <th className={`${th} text-right`}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {r.rows.map((row, i) => (
                    <tr key={`${i}-${row.athleteName}`} data-athlete={row.athleteName} className="border-b border-line last:border-0">
                      <td data-sort={row.athleteName} className={`${td} ${stickyCol}`}>
                        <div className="flex items-start gap-2">
                          <span className="w-6 shrink-0 text-right text-ink-muted">{row.finalScore == null ? "" : row.place}</span>
                          <div className="min-w-0">
                            <p className="font-semibold">
                              <AthleteLink name={row.athleteName} href={athletesHref} />
                            </p>
                            {row.club && <p className="text-xs text-ink-muted">{row.club}</p>}
                          </div>
                        </div>
                      </td>
                      <td className={`${td} text-right font-semibold`}>
                        {row.finalScore == null ? (
                          "—"
                        ) : scorecardsHref && row.hasScorecard ? (
                          <Link href={cardHref(r, row.athleteName)} className="inline-flex min-h-tap items-center justify-end text-primary underline decoration-dotted underline-offset-4" title="Open scorecard">
                            {row.finalScore.toFixed(3)}
                          </Link>
                        ) : (
                          row.finalScore.toFixed(3)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ScrollTable>
              <ExportButtons target={{ kind: "result", raw: r.raw, gender: r.gender }} className="mt-3" />
            </div>
          </details>
        );
      })}
    </div>
  );
}
