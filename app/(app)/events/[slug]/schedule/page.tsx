import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { ScheduleBody } from "@/components/events/view-bodies";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent, viewHrefs } from "@/lib/events/registry";

export const revalidate = 60;
export const generateStaticParams = () => viewParams("schedule", EVENT_CONFIGS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return { title: e ? `Schedule · ${e.shortName}` : "Schedule" };
}

export default async function SchedulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <EventBody slug={slug} view="schedule">
      {({ event, ruleset }, data) => <ScheduleBody ruleset={ruleset} data={data} highlights={event.highlights} live={event.status === "live"} {...viewHrefs(event)} />}
    </EventBody>
  );
}
