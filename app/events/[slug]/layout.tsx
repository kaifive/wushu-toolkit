import { notFound } from "next/navigation";
import { EventNav } from "@/components/events/event-nav";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/page-header";
import { EVENT_CONFIGS } from "@/content/events";
import { formatEventDates, getEvent } from "@/lib/events/registry";

export function generateStaticParams() {
  return EVENT_CONFIGS.map((e) => ({ slug: e.slug }));
}

export default async function EventLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  return (
    <Container>
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {event.status === "live" && <Badge tone="seal">Live</Badge>}
          {event.status === "archived" && <Badge>Archive</Badge>}
          <span className="text-sm text-ink-muted">{formatEventDates(event)}</span>
        </div>
        <h1 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{event.name}</h1>
        {event.location && <p className="text-sm text-ink-muted">{event.location}</p>}
      </div>
      <EventNav slug={event.slug} views={event.views} />
      {children}
    </Container>
  );
}
