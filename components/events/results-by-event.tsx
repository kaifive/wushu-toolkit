import { ScrollTable, td, th } from "@/components/ui/table";
import type { EventResult } from "@/lib/events/views";

export function ResultsByEvent({ results }: { results: EventResult[] }) {
  if (!results.length) return <p className="text-sm text-ink-muted">No results yet.</p>;
  return (
    <div className="space-y-2">
      {results.map((r) => {
        const scored = r.rows.filter((x) => x.finalScore != null).length;
        return (
          <details key={r.raw} className="group rounded-card border border-line bg-surface">
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
                    <th className={th}>#</th>
                    <th className={th}>Athlete</th>
                    <th className={`${th} text-right`}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {r.rows.map((row) => (
                    <tr key={row.athleteName} className="border-b border-line last:border-0">
                      <td className={`${td} w-8 text-ink-muted`}>{row.finalScore == null ? "" : row.place}</td>
                      <td className={td}>
                        <p className="font-semibold">{row.athleteName}</p>
                        {row.club && <p className="text-xs text-ink-muted">{row.club}</p>}
                      </td>
                      <td className={`${td} text-right font-semibold`}>{row.finalScore == null ? "—" : row.finalScore.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </ScrollTable>
            </div>
          </details>
        );
      })}
    </div>
  );
}
