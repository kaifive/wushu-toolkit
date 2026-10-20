import Link from "next/link";
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
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 pt-4 md:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
            <Link href="/events" className="hover:text-ink">
              Competitions
            </Link>
          </nav>
          <h1 className="mt-0.5 font-display text-3xl font-bold leading-tight tracking-wide sm:text-4xl">{event.name}</h1>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-ink-muted">
            {event.status === "live" && <Badge tone="seal">Live</Badge>}
            {event.status === "archived" && <Badge>Final</Badge>}
            <span>{formatEventDates(event)}</span>
            {event.location && <span>· {event.location}</span>}
          </p>
          <EventNav slug={event.slug} views={event.views} />
        </div>
      </div>
      <Container>{children}</Container>
    </>
  );
}
