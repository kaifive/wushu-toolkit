import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { AllAroundBody } from "@/components/events/view-bodies";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";

export const revalidate = 60;
export const generateStaticParams = () => viewParams("all-around", EVENT_CONFIGS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return { title: e ? `All-around · ${e.shortName}` : "All-around" };
}

export default async function AllAroundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <EventBody slug={slug} view="all-around">
      {({ event, ruleset }, data) => <AllAroundBody ruleset={ruleset} data={data} highlights={event.highlights} />}
    </EventBody>
  );
}
