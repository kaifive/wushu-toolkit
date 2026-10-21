import { Card } from "@/components/ui/card";
import { highlightStyle, type HighlightFor, type ScopeModel } from "@/lib/events/views";

const G = { male: "Male", female: "Female" } as const;

export function TeamProjection({ model, highlights }: { model: ScopeModel; highlights?: HighlightFor }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {model.teams.map((t) => (
        <Card
          key={t.id}
          title={`${t.id} Team`}
          context={`${G[model.gender]} · ${t.members.length}/${t.size}${t.minAverage !== undefined ? ` · min ${t.minAverage.toFixed(1)}` : ""}`}
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
                      {m.athleteName}
                    </p>
                    <p className="truncate text-sm text-ink-muted">
                      {m.discipline}
                      {m.club ? ` · ${m.club}` : ""}
                    </p>
                  </div>
                  <div className="text-right tnum">
                    <p className="font-semibold">{m.score.toFixed(3)}</p>
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
