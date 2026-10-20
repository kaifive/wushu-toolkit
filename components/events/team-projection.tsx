import { TeamBadge } from "@/components/ui/badge";
import type { ScopeModel } from "@/lib/events/views";
import { DISCIPLINE_LABEL } from "@/lib/rules";
import type { Discipline } from "@/lib/domain/types";

export function TeamProjection({ model }: { model: ScopeModel }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {model.teams.map((t) => (
        <section key={t.id} className="rounded-2xl border border-line bg-surface p-4">
          <header className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">{t.id} Team</h3>
            <span className="text-xs text-ink-muted">
              {t.members.length}/{t.size}
              {t.minAverage !== undefined ? ` · min avg ${t.minAverage.toFixed(1)}` : ""}
            </span>
          </header>
          {t.members.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">No athlete qualifies yet.</p>
          ) : (
            <ol className="mt-3 space-y-2">
              {t.members.map((m, i) => (
                <li key={m.athleteName} className="flex items-start justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-semibold">
                      <span className="mr-1 text-ink-muted">{i + 1}.</span>
                      {m.athleteName}
                    </p>
                    <p className="truncate text-xs text-ink-muted">
                      {DISCIPLINE_LABEL[m.discipline as Discipline] ?? m.discipline}
                      {m.club ? ` · ${m.club}` : ""}
                    </p>
                  </div>
                  <div className="text-right tabular-nums">
                    <p className="font-semibold">{m.score.toFixed(3)}</p>
                    <p className="text-xs text-ink-muted">avg {m.average.toFixed(3)}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
      <p className="text-xs text-ink-muted md:col-span-3">
        Projection only. <TeamBadge team="A" /> <TeamBadge team="B" /> <TeamBadge team="C" /> labels are where athletes would land if the
        competition ended now.
      </p>
    </div>
  );
}
