import { TeamBadge } from "@/components/ui/badge";
import { ScrollTable, stickyCol, td, th } from "@/components/ui/table";
import type { ScopeModel } from "@/lib/events/views";

const fmt = (n: number | null | undefined) => (n == null ? "—" : n.toFixed(3));

export function OverallTable({ model, highlights }: { model: ScopeModel; highlights: Record<string, { color: string; group: string }> }) {
  return (
    <ScrollTable caption={`Overall standings, ${model.gender}, ${model.division.label}`}>
      <thead className="border-b border-line">
        <tr>
          <th className={`${th} ${stickyCol}`}>Athlete</th>
          {model.eventCodes.map((c) => (
            <th key={c} className={`${th} text-right`}>
              {c}
            </th>
          ))}
          <th className={`${th} text-right`}>Total</th>
          <th className={`${th} text-right`}>Avg</th>
        </tr>
      </thead>
      <tbody>
        {model.rows.map((r) => {
          const hl = highlights[r.athleteId];
          return (
            <tr key={`${r.athleteId}-${r.discipline}`} className="border-b border-line last:border-0">
              <td className={`${td} ${stickyCol} max-w-[11rem]`} style={hl ? { boxShadow: `inset 3px 0 0 ${hl.color}` } : undefined}>
                <div className="flex items-start gap-2">
                  <span className="w-6 shrink-0 text-right text-ink-muted">{r.tied ? "=" : r.rank}</span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{r.athleteName}</p>
                    <p className="truncate text-xs text-ink-muted">
                      {r.discipline}
                      {r.club ? ` · ${r.club}` : ""}
                    </p>
                    {r.team && (
                      <div className="mt-1">
                        <TeamBadge team={r.team} />
                      </div>
                    )}
                  </div>
                </div>
              </td>
              {model.eventCodes.map((c) => (
                <td key={c} className={`${td} text-right ${r.counted.includes(c) ? "font-semibold text-ink" : "text-ink-muted"}`}>
                  {c in r.events ? fmt(r.events[c]) : ""}
                </td>
              ))}
              <td className={`${td} text-right font-semibold`}>{r.score.toFixed(3)}</td>
              <td className={`${td} text-right text-ink-muted`}>{r.average.toFixed(3)}</td>
            </tr>
          );
        })}
      </tbody>
    </ScrollTable>
  );
}
