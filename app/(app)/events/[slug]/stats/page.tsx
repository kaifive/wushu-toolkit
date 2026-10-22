import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { StatsBody } from "@/components/events/view-bodies";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";

export const revalidate = 60;
export const generateStaticParams = () => viewParams("stats", EVENT_CONFIGS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return { title: e ? `Stats · ${e.shortName}` : "Stats" };
}

export default async function StatsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <EventBody slug={slug} view="stats">
      {({ event, ruleset }, data) => <StatsBody ruleset={ruleset} data={data} highlights={event.highlights} />}
    </EventBody>
  );
}
