import { Badge } from "@/components/ui/badge";
import { athleteKey } from "@/lib/domain/names";
import { withCurrentCompetitor } from "@/lib/domain/schedule";
import type { Schedule } from "@/lib/domain/types";

export function ScheduleView({ schedule, highlights }: { schedule: Schedule; highlights: Record<string, { color: string; group: string }> }) {
  const blocks = withCurrentCompetitor(schedule.blocks);
  if (!blocks.length) return <p className="text-sm text-ink-muted">No schedule posted for {schedule.ring} yet.</p>;
  return (
    <div className="space-y-3">
      {blocks.map((b, i) =>
        b.type === "break" ? (
          <p key={i} className="rounded-lg bg-line/40 px-4 py-2 text-center text-sm font-semibold text-ink-muted">
            {b.label}
          </p>
        ) : (
          <details key={i} open={!b.finished} className="rounded-card border border-line bg-surface">
            <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between px-4 py-2">
              <span className="font-semibold">
                {b.start}
                {b.end && b.end !== b.start ? ` – ${b.end}` : ""}
              </span>
              <span className="text-xs text-ink-muted">{b.finished ? "Finished" : `${b.entries.length} athletes`}</span>
            </summary>
            <ol className="divide-y divide-line border-t border-line">
              {b.entries.map((e, j) => {
                const hl = highlights[athleteKey(e.athleteName)];
                return (
                  <li
                    key={j}
                    data-athlete={e.athleteName}
                    className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${e.isCurrent ? "bg-seal-soft" : ""}`}
                    style={hl ? { boxShadow: `inset 3px 0 0 ${hl.color}` } : undefined}
                    aria-current={e.isCurrent ? "step" : undefined}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {e.athleteName} {e.isCurrent && <Badge tone="seal">On the floor</Badge>}
                      </p>
                      <p className="truncate text-xs text-ink-muted">
                        {e.time} · {e.event}
                        {e.experience ? ` · ${e.experience}` : ""}
                      </p>
                    </div>
                    <span className="shrink-0 font-semibold tabular-nums">{e.score ?? ""}</span>
                  </li>
                );
              })}
            </ol>
          </details>
        ),
      )}
    </div>
  );
}
