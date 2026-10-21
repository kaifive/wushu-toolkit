import Link from "next/link";
import { stickyCol } from "@/components/ui/table";
import { EventRow } from "@/components/events/event-card";
import { TeamBadge } from "@/components/ui/badge";
import { Card, StatTile } from "@/components/ui/card";
import { allEvents, getEvent } from "@/lib/events/registry";
import { selectionModel } from "@/lib/events/views";
import { getRuleset } from "@/lib/rules";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

const AT_EVENT = [
  ["Live standings", "Every routine and division, refreshed while the competition runs."],
  ["Team projections", "A, B and C teams from the published selection rules and minimum averages."],
  ["Scorecards", "Deduction codes, performance marks with drops, difficulty made or missed."],
  ["Ring schedules", "Who's on the floor, and how far your athlete is from their turn."],
] as const;

const FREE = [
  ["/tools/deductions", "Deduction code lookup"],
  ["/tools/nandu", "Nandu calculator"],
  ["/tools/required-movements", "Required movements in routine order"],
  ["/tools/score-calculator", "Score calculator"],
  ["/rules", "2025–26 junior trials rules"],
] as const;

/** A real excerpt from the archive, so the page shows the product instead of a mockup. */
async function sample() {
  const event = getEvent("2025-adults");
  if (!event) return null;
  try {
    const data = await event.data().load();
    const model = selectionModel(data, getRuleset(event.rulesetId)).find((m) => m.gender === "male");
    return model ? { event, rows: model.rows.slice(0, 6) } : null;
  } catch {
    return null;
  }
}

/**
 * Totals across every competition whose data loads. They grow on their own as
 * events are added; a sheet-only event counts once it is reachable or snapshotted.
 */
async function archiveStats() {
  // Load in parallel; a live-only archive that isn't reachable is skipped.
  const loaded = await Promise.all(allEvents().map((e) => e.data().load({ revalidate: 3600 }).catch(() => null)));
  const athletes = new Set<string>(); // the same athlete across years counts once
  let events = 0;
  let routines = 0;
  for (const d of loaded) {
    if (!d) continue;
    events++;
    for (const r of d.registrations) athletes.add(r.athlete.id);
    routines += d.scores.filter((s) => s.finalScore != null).length;
  }
  return { events, athletes: athletes.size, routines };
}

export default async function HomePage() {
  const [ex, stats] = await Promise.all([sample(), archiveStats()]);
  const events = allEvents();
  return (
    <>
      <section className="bg-chrome text-chrome-ink">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:py-14">
          <div className="self-center">
            <h1 className="font-display text-5xl font-bold leading-[0.95] text-white sm:text-6xl">Wushu Toolkit</h1>
            <p className="mt-4 max-w-md text-lg text-chrome-ink/85">
              Live standings, team projections and scorecards for wushu taolu competitions. Made for checking between routines.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/events" className="inline-flex min-h-12 items-center justify-center rounded-card bg-primary px-6 font-semibold text-primary-ink">
                Competitions
              </Link>
              <Link href="/tools" className="inline-flex min-h-12 items-center justify-center rounded-card border border-white/25 px-6 font-semibold text-white hover:bg-white/5">
                Athlete toolkit
              </Link>
            </div>
          </div>
          {ex && (
            <div className="text-ink">
              <Card title="Team projection" context={`${ex.event.shortName} · Men`} bodyClassName="" action={<Link href={`/events/${ex.event.slug}/team`} className="inline-flex min-h-tap items-center text-sm font-semibold text-primary">Open</Link>}>
                {/* Scrolls inside the card at 375px, first column pinned (CLAUDE.md mobile checklist). */}
                <div className="overflow-x-auto">
                <table className="w-full min-w-max text-[15px] tnum [&_tr:nth-child(odd)_td]:bg-surface-2">
                  <caption className="sr-only">{`Team projection, ${ex.event.shortName}, men`}</caption>
                  <tbody>
                    {ex.rows.map((r) => (
                      <tr key={`${r.athleteId}-${r.discipline}`} data-athlete={r.athleteName} className="border-b border-line last:border-0">
                        <td className={`${stickyCol} py-2 pl-3 pr-2`}>
                          <span className="mr-2 inline-block w-5 text-right text-ink-muted">{r.rank}</span>
                          <span className="font-semibold">{r.athleteName}</span>
                        </td>
                        <td className="px-2 py-2">
                          <TeamBadge team={r.team} />
                        </td>
                        <td className="px-3 py-2 text-right font-semibold">{r.score.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </Card>
              <p className="mt-2 text-sm text-chrome-muted">Real results from the archive.</p>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-8">
        <div className="grid grid-cols-3 gap-3">
          <StatTile value={stats.events} label="competitions" />
          <StatTile value={stats.athletes.toLocaleString("en-US")} label="athletes tracked" />
          <StatTile value={stats.routines.toLocaleString("en-US")} label="routines scored" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card title="With an event pass" context="per competition" bodyClassName="divide-y divide-line">
            {AT_EVENT.map(([t, b]) => (
              <div key={t} className="px-4 py-3">
                <p className="font-semibold">{t}</p>
                <p className="text-ink-muted">{b}</p>
              </div>
            ))}
            <div className="px-4 py-3 text-sm text-ink-muted">
              One device at a time. Passes are granted by hand for now.{" "}
              <a href={SITE.contactUrl} className="inline-flex min-h-tap items-center font-semibold text-primary">
                Request a pass
              </a>
            </div>
          </Card>
          <div className="min-w-0 space-y-6">
            <Card title="Free all year" bodyClassName="divide-y divide-line">
              {FREE.map(([href, label]) => (
                <Link key={href} href={href} className="flex min-h-tap items-center px-4 py-2.5 font-semibold hover:bg-surface-2">
                  {label}
                </Link>
              ))}
            </Card>
            <Card title="Competitions" bodyClassName="divide-y divide-line" action={<Link href="/events" className="inline-flex min-h-tap items-center text-sm font-semibold text-primary">All</Link>}>
              {events.slice(0, 3).map((e) => (
                <EventRow key={e.slug} event={e} />
              ))}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
