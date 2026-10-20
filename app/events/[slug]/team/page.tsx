import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { TeamProjection } from "@/components/events/team-projection";
import { Notice } from "@/components/ui/notice";
import { Tabs } from "@/components/ui/tabs";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";
import { GENDERS, selectionModel } from "@/lib/events/views";

export const revalidate = 60;
export const generateStaticParams = () => viewParams("team", EVENT_CONFIGS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return { title: e ? `Team projection · ${e.shortName}` : "Team projection" };
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <EventBody slug={slug} view="team">
      {({ ruleset }, data) => {
        const models = selectionModel(data, ruleset);
        return (
          <>
            {!ruleset.source.verified && (
              <div className="mb-4">
                <Notice tone="warn" title="Rules pending verification">
                  Team math follows {ruleset.source.title}
                  {ruleset.source.revision ? ` (${ruleset.source.revision})` : ""}, but some values haven&apos;t been checked against the
                  official document yet. <a className="underline" href="/rules">See the rules</a>.
                </Notice>
              </div>
            )}
            <Tabs
              label="Gender"
              param="gender"
              tabs={GENDERS}
              panels={GENDERS.map((g) => {
                const mine = models.filter((m) => m.gender === g.id);
                if (!mine.length) return <p key={g.id} className="text-sm text-ink-muted">No athletes.</p>;
                return (
                  <Tabs
                    key={g.id}
                    label="Division"
                    param="division"
                    tabs={mine.map((m) => ({ id: m.division.id, label: m.division.label }))}
                    panels={mine.map((m) => <TeamProjection key={m.division.id} model={m} />)}
                  />
                );
              })}
            />
          </>
        );
      }}
    </EventBody>
  );
}
