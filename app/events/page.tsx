import type { Metadata } from "next";
import { EventCard } from "@/components/events/event-card";
import { Container, PageHeader } from "@/components/ui/page-header";
import { allEvents } from "@/lib/events/registry";

export const metadata: Metadata = { title: "Events", description: "Live and past wushu competitions: standings, team projections, scorecards and schedules." };

export default function EventsPage() {
  const events = allEvents();
  const current = events.filter((e) => e.status !== "archived");
  const archived = events.filter((e) => e.status === "archived");
  return (
    <Container>
      <PageHeader eyebrow="Events" title="Competitions">
        Standings, team projections, scorecards and schedules for each competition.
      </PageHeader>
      <section aria-labelledby="current" className="mb-8">
        <h2 id="current" className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Live &amp; upcoming
        </h2>
        {current.length ? (
          <div className="grid gap-3 md:grid-cols-2">{current.map((e) => <EventCard key={e.slug} event={e} />)}</div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line p-4 text-sm text-ink-muted">
            No competition is live right now. The next one will show up here.
          </p>
        )}
      </section>
      <section aria-labelledby="archive">
        <h2 id="archive" className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Archive
        </h2>
        <div className="grid gap-3 md:grid-cols-2">{archived.map((e) => <EventCard key={e.slug} event={e} />)}</div>
      </section>
    </Container>
  );
}
