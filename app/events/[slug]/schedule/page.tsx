import type { Metadata } from "next";
import { EventBody, viewParams } from "@/components/events/event-body";
import { ScheduleView } from "@/components/events/schedule-view";
import { Tabs } from "@/components/ui/tabs";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";
import { highlightMap } from "@/lib/events/views";

export const revalidate = 60;
export const generateStaticParams = () => viewParams("schedule", EVENT_CONFIGS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return { title: e ? `Schedule · ${e.shortName}` : "Schedule" };
}

const ringId = (ring: string) => ring.toLowerCase().replace(/\s+/g, "-");

export default async function SchedulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <EventBody slug={slug} view="schedule">
      {({ event }, data) => {
        if (!data.schedules.length) return <p className="text-sm text-ink-muted">No schedule posted yet.</p>;
        const hl = highlightMap(event.highlights);
        return (
          <Tabs
            label="Ring"
            param="ring"
            tabs={data.schedules.map((s) => ({ id: ringId(s.ring), label: s.ring }))}
            panels={data.schedules.map((s) => <ScheduleView key={s.ring} schedule={s} highlights={hl} />)}
          />
        );
      }}
    </EventBody>
  );
}
