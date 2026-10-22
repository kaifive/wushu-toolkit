import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ScrollTable, stickyCol, td, th } from "@/components/ui/table";
import type { EventData } from "@/lib/domain/types";
import { scorecardStats } from "@/lib/events/views";
import { deductionGroupFor, findDeduction } from "@/lib/rules/iwuf-2024/deductions";

const f = (x: number | null, digits = 3) => (x == null ? "—" : x.toFixed(digits));

/** Top deductions and average panel scores per event, from the scorecards. */
export function StatsView({ data }: { data: EventData }) {
  const { deductions, byEvent } = scorecardStats(data);
  if (!byEvent.length) return <p className="text-sm text-ink-muted">No scorecards yet.</p>;
  const top = deductions.slice(0, 10);
  return (
    <div className="space-y-6">
      <Card title="Top 10 Deductions" bodyClassName="">
        {top.length ? (
          <ol className="divide-y divide-line">
            {top.map((d, i) => {
              const info = findDeduction(d.code, d.eventCode);
              return (
                <li key={d.code}>
                  <Link
                    href={`/tools/deductions?group=${deductionGroupFor(d.eventCode).id}&code=${encodeURIComponent(d.code)}`}
                    className="flex min-h-tap items-center gap-3 px-4 py-2 hover:bg-surface-2"
                  >
                    <span className="w-5 shrink-0 text-right text-sm text-ink-muted tabular-nums">{i + 1}</span>
                    <span className="w-12 shrink-0 font-mono font-semibold text-seal">{d.code}</span>
                    <span className="min-w-0 flex-1 truncate text-sm">{info?.english ?? ""}</span>
                    <span className="shrink-0 font-semibold tabular-nums">{d.count}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="px-4 py-3 text-sm text-ink-muted">No deductions recorded.</p>
        )}
      </Card>
      <section>
        <h2 className="mb-3 font-display text-lg font-bold">Average Scores by Event</h2>
        <ScrollTable caption="Average scores by event">
          <thead className="border-b border-line">
            <tr>
              <th className={`${th} ${stickyCol}`}>Event</th>
              <th className={`${th} text-right`}>A</th>
              <th className={`${th} text-right`}>B</th>
              <th className={`${th} text-right`}>C</th>
              <th className={`${th} text-right`}>Final</th>
            </tr>
          </thead>
          <tbody>
            {byEvent.map((e) => (
              <tr key={`${e.raw}-${e.gender ?? ""}`} className="border-b border-line last:border-0">
                <td className={`${td} ${stickyCol}`}>
                  <p className="font-semibold">{e.raw}</p>
                  <p className="text-xs text-ink-muted">{e.routines} routines</p>
                </td>
                <td className={`${td} text-right tabular-nums`}>{f(e.a)}</td>
                <td className={`${td} text-right tabular-nums`}>{f(e.b)}</td>
                <td className={`${td} text-right tabular-nums`}>{f(e.c)}</td>
                <td className={`${td} text-right font-semibold tabular-nums`}>{f(e.final)}</td>
              </tr>
            ))}
          </tbody>
        </ScrollTable>
      </section>
    </div>
  );
}
