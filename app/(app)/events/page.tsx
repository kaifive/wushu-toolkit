import type { Metadata } from "next";
import { EventRow } from "@/components/events/event-card";
import { Card } from "@/components/ui/card";
import { Container, PageHeader } from "@/components/ui/page-header";
import { allEvents } from "@/lib/events/registry";

export const metadata: Metadata = { title: "Competitions", description: "Live and past wushu competitions: standings, team projections, scorecards and schedules." };

export default function EventsPage() {
  const events = allEvents();
  const current = events.filter((e) => e.status !== "archived");
  const archived = events.filter((e) => e.status === "archived");
  return (
    <Container className="space-y-5">
      <PageHeader title="Competitions" />
      <Card title="Live and upcoming" bodyClassName="">
        {current.length ? (
          <div className="divide-y divide-line">{current.map((e) => <EventRow key={e.slug} event={e} />)}</div>
        ) : (
          <p className="px-4 py-4 text-ink-muted">Nothing live right now. The next competition will show up here.</p>
        )}
      </Card>
      <Card title="Past competitions" context={`${archived.length} events, free to view`} bodyClassName="divide-y divide-line">
        {archived.map((e) => <EventRow key={e.slug} event={e} />)}
      </Card>
    </Container>
  );
}
