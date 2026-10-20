import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VIEW_LABEL } from "@/lib/events/labels";
import { ChevronRightIcon } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { getEvent, requiresEntitlement } from "@/lib/events/registry";
import type { EventView } from "@/lib/events/types";
import { getRuleset } from "@/lib/rules";

const VIEW_BLURB: Record<EventView, string> = {
  standings: "Overall ranking and results for every event",
  team: "Projected A, B and C teams from the selection rules",
  scorecards: "Judge-panel breakdowns: deductions, marks and difficulty",
  schedule: "Ring order with the athlete on the floor",
  "all-around": "Top-form totals, grand champion and age-group champions",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return e ? { title: e.shortName, description: e.description } : {};
}

export default async function EventOverview({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const ruleset = getRuleset(event.rulesetId);
  return (
    <div className="space-y-6">
      {event.description && <p className="max-w-2xl text-ink-muted">{event.description}</p>}
      {requiresEntitlement(event) && <Notice title="Event pass">Live data for this event needs an event pass on your account.</Notice>}
      <Card title="Views" bodyClassName="divide-y divide-line">
        {event.views.map((v) => (
          <div key={v}>
            <Link href={`/events/${event.slug}/${v}`} className="group flex min-h-16 items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2">
              <span>
                <span className="block font-semibold">{VIEW_LABEL[v]}</span>
                <span className="block text-ink-muted">{VIEW_BLURB[v]}</span>
              </span>
              <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted group-hover:text-primary" />
            </Link>
          </div>
        ))}
      </Card>
      <Card title="Rules">
        <p className="text-ink-muted">
          {ruleset.name}
          {ruleset.source.revision ? ` · ${ruleset.source.revision}` : ""}
          {ruleset.source.verified ? "" : " · pending verification"}
        </p>
        {event.links?.length ? (
          <ul className="mt-2 space-y-1">
            {event.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} className="text-primary underline" rel="noopener noreferrer" target="_blank">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {event.notes?.map((n) => (
          <p key={n} className="mt-2 text-xs text-ink-muted">
            {n}
          </p>
        ))}
      </Card>
    </div>
  );
}
