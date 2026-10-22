import Link from "next/link";
import { AthleteLink } from "./athlete-link";
import { Card } from "@/components/ui/card";
import { GENDER_LABEL, highlightStyle, type HighlightFor, type ScopeModel } from "@/lib/events/views";

export function TeamProjection({ model, highlights, athletesHref, scorecardsHref }: { model: ScopeModel; highlights?: HighlightFor; athletesHref?: string; scorecardsHref?: string }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {model.teams.map((t) => (
        <Card
          key={t.id}
          title={`${t.id} Team`}
          context={`${GENDER_LABEL[model.gender]} · ${t.members.length}/${t.size}${t.minAverage !== undefined ? ` · min ${t.minAverage.toFixed(1)}` : ""}`}
          bodyClassName=""
        >
          {t.members.length === 0 ? (
            <p className="px-4 py-3 text-ink-muted">No athlete qualifies yet.</p>
          ) : (
            <ol className="divide-y divide-line">
              {t.members.map((m, i) => (
                <li key={`${i}-${m.athleteName}`} data-athlete={m.athleteName} style={highlightStyle(highlights?.(m.athleteName))} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      <span className="mr-1.5 text-ink-muted tnum">{i + 1}</span>
                      <AthleteLink name={m.athleteName} href={athletesHref} />
                    </p>
                    <p className="truncate text-sm text-ink-muted">
                      {m.discipline}
                      {m.club ? ` · ${m.club}` : ""}
                    </p>
                  </div>
                  <div className="text-right tnum">
                    <p className="font-semibold">
                      {scorecardsHref ? (
                        <Link
                          href={`${scorecardsHref}?${new URLSearchParams({ gender: model.gender, athlete: m.athleteName })}`}
                          className="inline-flex min-h-tap items-center underline decoration-dotted underline-offset-4 hover:text-primary"
                          title="Open scorecards"
                        >
                          {m.score.toFixed(3)}
                        </Link>
                      ) : (
                        m.score.toFixed(3)
                      )}
                    </p>
                    <p className="text-xs text-ink-muted">avg {m.average.toFixed(3)}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Card>
      ))}
    </div>
  );
}
