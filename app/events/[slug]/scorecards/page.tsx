import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { ScorecardsBody } from "@/components/events/view-bodies";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";

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
      {({ event, ruleset }, data) => <ScorecardsBody ruleset={ruleset} data={data} highlights={event.highlights} />}
    </EventBody>
  );
}
