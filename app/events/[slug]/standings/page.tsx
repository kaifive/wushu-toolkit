import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { OverallTable } from "@/components/events/overall-table";
import { ResultsByEvent } from "@/components/events/results-by-event";
import { Tabs } from "@/components/ui/tabs";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";
import { GENDERS, highlightMap, resultsByEvent, selectionModel } from "@/lib/events/views";

export const revalidate = 60;
export const generateStaticParams = () => viewParams("standings", EVENT_CONFIGS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return { title: e ? `Standings · ${e.shortName}` : "Standings" };
}

export default async function StandingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <EventBody slug={slug} view="standings">
      {({ event, ruleset }, data) => {
        const models = selectionModel(data, ruleset);
        const results = resultsByEvent(data, ruleset);
        const hl = highlightMap(event.highlights);
        return (
          <Tabs
            label="Gender"
            param="gender"
            tabs={GENDERS}
            panels={GENDERS.map((g) => {
              const mine = models.filter((m) => m.gender === g.id);
              return (
                <div key={g.id} className="space-y-8">
                  {mine.length > 0 && (
                    <Tabs
                      label="Division"
                      param="division"
                      tabs={mine.map((m) => ({ id: m.division.id, label: m.division.label }))}
                      panels={mine.map((m) => (
                        <section key={m.division.id}>
                          <h2 className="mb-1 font-display text-lg font-semibold">Overall · {m.division.label}</h2>
                          <p className="mb-3 text-xs text-ink-muted">
                            {m.scored}/{m.total} routines scored. Bold scores count toward the total.
                          </p>
                          <OverallTable model={m} highlights={hl} />
                        </section>
                      ))}
                    />
                  )}
                  <section>
                    <h2 className="mb-3 font-display text-lg font-semibold">Results by event</h2>
                    <ResultsByEvent results={results.filter((r) => r.gender === g.id)} />
                  </section>
                </div>
              );
            })}
          />
        );
      }}
    </EventBody>
  );
}
