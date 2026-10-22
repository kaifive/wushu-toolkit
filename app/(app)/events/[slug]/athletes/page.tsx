import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { AthletesBody } from "@/components/events/view-bodies";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";

export const revalidate = 60;
export const generateStaticParams = () => viewParams("athletes", EVENT_CONFIGS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return { title: e ? `Athletes · ${e.shortName}` : "Athletes" };
}

export default async function AthletesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <EventBody slug={slug} view="athletes">
      {({ event, ruleset }, data) => <AthletesBody ruleset={ruleset} data={data} highlights={event.highlights} scorecardsHref={event.views.includes("scorecards") ? `/events/${event.slug}/scorecards` : undefined} />}
    </EventBody>
  );
}
