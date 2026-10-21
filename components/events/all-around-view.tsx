import { ScrollTable, stickyCol, td, th } from "@/components/ui/table";
import type { AllAroundAthlete } from "@/lib/rules/all-around";
import { type AllAroundModel, type HighlightFor, highlightStyle } from "@/lib/events/views";

const f = (n: number) => n.toFixed(3);

export function AllAroundTable({ athletes, topN, highlights }: { athletes: AllAroundAthlete[]; topN: number; highlights: HighlightFor }) {
  if (!athletes.length) return <p className="text-sm text-ink-muted">No registered all-around athletes yet.</p>;
  return (
    <ScrollTable caption="All-around standings">
      <thead className="border-b border-line">
        <tr>
          <th className={`${th} ${stickyCol}`}>Athlete</th>
          {Array.from({ length: topN }, (_, i) => (
            <th key={i} className={`${th} text-right`}>
              Form {i + 1}
            </th>
          ))}
          <th className={`${th} text-right`}>Total</th>
        </tr>
      </thead>
      <tbody>
        {athletes.map((a, i) => {
          const hl = highlights(a.athleteName);
          // Equal totals share a place ("=" like the overall standings).
          const tied = i > 0 && athletes[i - 1]!.total === a.total;
          return (
            <tr key={a.athleteId} data-athlete={a.athleteName} className="border-b border-line last:border-0">
              <td className={`${td} ${stickyCol} max-w-[11rem]`} style={highlightStyle(hl)}>
                <div className="flex gap-2">
                  <span className="w-6 shrink-0 text-right text-ink-muted">{tied ? "=" : i + 1}</span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{a.athleteName}</p>
                    <p className="truncate text-xs text-ink-muted">
                      {a.age !== undefined ? `Age ${a.age}` : ""}
                      {a.forms.length ? ` · ${a.forms.length} forms` : ""}
                    </p>
                  </div>
                </div>
              </td>
              {Array.from({ length: topN }, (_, k) => {
                const form = a.top[k];
                return (
                  <td key={k} className={`${td} text-right`} title={form?.raw}>
                    {form ? (
                      <>
                        <span className="font-semibold">{form.finalScore?.toFixed(3)}</span>
                        <span className="block text-xs text-ink-muted">{form.code ?? ""}</span>
                      </>
                    ) : (
                      <span className="text-ink-muted">—</span>
                    )}
                  </td>
                );
              })}
              <td className={`${td} text-right font-semibold`}>{f(a.total)}</td>
            </tr>
          );
        })}
      </tbody>
    </ScrollTable>
  );
}

export function Champions({ model }: { model: AllAroundModel }) {
  return (
    <div className="space-y-4">
      <section className="rounded-card border border-gold/40 bg-gold/10 p-4">
        <h2 className="font-semibold">Grand champion</h2>
        {model.grandChampion ? (
          <p className="mt-1 font-display text-2xl font-bold">
            {model.grandChampion.athleteName} <span className="text-base tabular-nums text-ink-muted">{f(model.grandChampion.total)}</span>
          </p>
        ) : (
          <p className="mt-1 text-ink-muted">Not decided yet.</p>
        )}
        <p className="mt-1 text-xs text-ink-muted">
          Highest total of the top {model.topN} forms among registered athletes with at least {model.minForms} forms.
        </p>
      </section>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {model.ageGroups.map(({ group, male, female }) => (
          <section key={group.id} className="rounded-card border border-line bg-surface p-3 text-sm">
            <h3 className="font-semibold">{group.label}</h3>
            <dl className="mt-2 grid grid-cols-[4.5rem_1fr_auto] gap-x-2 gap-y-1">
              {[
                ["Male", male],
                ["Female", female],
              ].map(([label, a]) => (
                <div key={label as string} className="contents">
                  <dt className="text-ink-muted">{label as string}</dt>
                  <dd className="truncate">{a ? (a as AllAroundAthlete).athleteName : "—"}</dd>
                  <dd className="tabular-nums">{a ? f((a as AllAroundAthlete).total) : ""}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
