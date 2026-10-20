import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { ScorecardCard } from "@/components/events/scorecard";
import { Tabs } from "@/components/ui/tabs";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";
import { GENDERS, scorecards } from "@/lib/events/views";

export const revalidate = 60;
export const generateStaticParams = () => viewParams("scorecards", EVENT_CONFIGS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return { title: e ? `Scorecards · ${e.shortName}` : "Scorecards" };
}

export default async function ScorecardsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <EventBody slug={slug} view="scorecards">
      {(_, data) => {
        const rows = scorecards(data);
        return (
          <Tabs
            label="Gender"
            param="gender"
            tabs={GENDERS}
            panels={GENDERS.map((g) => {
              const mine = rows.filter((r) => r.gender === g.id);
              return (
                <div key={g.id} className="space-y-2">
                  {mine.length ? mine.map((r) => <ScorecardCard key={`${r.athleteName}-${r.raw}`} row={r} />) : <p className="text-sm text-ink-muted">No scorecards.</p>}
                </div>
              );
            })}
          />
        );
      }}
    </EventBody>
  );
}
