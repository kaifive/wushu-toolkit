import Link from "next/link";
import { AthleteLink } from "./athlete-link";
import { highlightStyle, type HighlightFor } from "@/lib/events/views";
import { Badge } from "@/components/ui/badge";
import { withCurrentCompetitor } from "@/lib/domain/schedule";
import type { Schedule } from "@/lib/domain/types";

export function ScheduleView({
  schedule,
  highlights,
  live = true,
  scorecardsHref,
  athletesHref,
}: {
  schedule: Schedule;
  highlights: HighlightFor;
  live?: boolean;
  /** The event's scorecards page: scores link to the athlete's card. */
  scorecardsHref?: string;
  athletesHref?: string;
}) {
  const blocks = withCurrentCompetitor(schedule.blocks, live);
  if (!blocks.length)
    return (
      <p className="text-sm text-ink-muted">
        No schedule posted for {schedule.ring} yet.
      </p>
    );
  return (
    <div className="space-y-3">
      {blocks.map((b, i) =>
        b.type === "break" ? (
          <p
            key={i}
            className="rounded-card bg-line/40 px-4 py-2 text-center text-sm font-semibold text-ink-muted"
          >
            {b.label}
          </p>
        ) : (
          <details
            key={i}
            open={!b.finished}
            className="rounded-card border border-line bg-surface"
          >
            <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between px-4 py-2">
              <span className="font-semibold">
                {b.title ?? (
                  <>
                    {b.start}
                    {b.end && b.end !== b.start ? ` – ${b.end}` : ""}
                  </>
                )}
              </span>
              <span className="text-xs text-ink-muted">
                {b.finished ? "Finished" : `${b.entries.length} athletes`}
              </span>
            </summary>
            <ol className="divide-y divide-line border-t border-line">
              {b.entries.map((e, j) => {
                const hl = highlights(e.athleteName);
                return (
                  <li
                    key={j}
                    data-athlete={e.athleteName}
                    className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${e.isCurrent ? "bg-seal-soft" : ""}`}
                    style={highlightStyle(hl)}
                    aria-current={e.isCurrent ? "step" : undefined}
                  >
                    <div className="flex min-w-0 items-baseline gap-3">
                      {b.title && (
                        <span className="w-6 shrink-0 text-right text-ink-muted tabular-nums">
                          {j + 1}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          <AthleteLink name={e.athleteName} href={e.score ? athletesHref : undefined} />{" "}
                          {e.isCurrent && (
                            <Badge tone="seal">On the floor</Badge>
                          )}
                        </p>
                        {!b.title && (
                          <p className="truncate text-xs text-ink-muted">
                            {e.time} · {e.event}
                            {e.experience ? ` · ${e.experience}` : ""}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 font-semibold tabular-nums">
                      {e.score && scorecardsHref ? (
                        <Link
                          href={`${scorecardsHref}?${new URLSearchParams({ ...(e.gender ? { gender: e.gender } : {}), athlete: e.athleteName, event: e.event })}`}
                          className="inline-flex min-h-tap items-center text-primary underline decoration-dotted underline-offset-4"
                        >
                          {e.score}
                        </Link>
                      ) : (
                        (e.score ?? "")
                      )}
                    </span>
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
