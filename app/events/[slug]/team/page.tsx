import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { TeamBody } from "@/components/events/view-bodies";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";

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
      {({ event, ruleset }, data) => <TeamBody ruleset={ruleset} data={data} highlights={event.highlights} />}
    </EventBody>
  );
}
