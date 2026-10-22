import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { StandingsBody } from "@/components/events/view-bodies";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";

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
      {({ event, ruleset }, data) => <StandingsBody ruleset={ruleset} data={data} highlights={event.highlights} scorecardsHref={event.views.includes("scorecards") ? `/events/${event.slug}/scorecards` : undefined} />}
    </EventBody>
  );
}
