import { EVENT_CONFIGS } from "@/content/events";
import { source } from "@/lib/data/source";
import type { EventData, Gender } from "@/lib/domain/types";
import { sameName } from "@/lib/watchlist/match";
import type { EventConfig } from "./types";

/**
 * A 0 means "did not compete" (sheets type it for scratches), not a score:
 * it would drag every average, ranking and team projection down. Treat it as
 * unscored everywhere.
 */
export function dropZeroScores(d: EventData): EventData {
  if (!d.scores.some((s) => s.finalScore === 0)) return d;
  return { ...d, scores: d.scores.map((s) => (s.finalScore === 0 ? { ...s, finalScore: null, didNotCompete: true } : s)) };
}

/** Fill genders the source left blank (EventConfig.genderFixes). */
export function fixGenders(d: EventData, fixes: Record<string, Gender> = {}): EventData {
  const names = Object.keys(fixes);
  if (!names.length) return d;
  const fixFor = (name: string) => fixes[names.find((n) => sameName(n, name)) ?? ""];
  return {
    ...d,
    scores: d.scores.map((s) => (s.gender ? s : { ...s, gender: fixFor(s.athleteName) ?? s.gender })),
    registrations: d.registrations.map((r) => (r.athlete.gender || !fixFor(r.athlete.name) ? r : { ...r, athlete: { ...r.athlete, gender: fixFor(r.athlete.name) } })),
  };
}

/** "GUNAWAN RAIDEN" / "CHEN Stephen" -> "Gunawan Raiden" / "Chen Stephen" (sources shout surnames). */
export const tidyName = (name: string) =>
  // A one-word name is likely a team or acronym ("TFCGW"): leave it.
  name.trim().includes(" ") ? name.replace(/\p{Lu}{2,}/gu, (w) => w[0] + w.slice(1).toLowerCase()) : name;

export function tidyNames(d: EventData): EventData {
  if (!d.scores.some((s) => /\p{Lu}{2,}/u.test(s.athleteName)) && !d.registrations.some((r) => /\p{Lu}{2,}/u.test(r.athlete.name))) return d;
  return {
    ...d,
    scores: d.scores.map((s) => ({ ...s, athleteName: tidyName(s.athleteName) })),
    registrations: d.registrations.map((r) => ({ ...r, athlete: { ...r.athlete, name: tidyName(r.athlete.name) } })),
    schedules: d.schedules.map((sc) => ({ ...sc, blocks: sc.blocks.map((b) => (b.type === "session" ? { ...b, entries: b.entries.map((x) => ({ ...x, athleteName: tidyName(x.athleteName) })) } : b)) })),
  };
}

const normalized = (e: EventConfig): EventConfig => ({
  ...e,
  data: () => {
    const inner = e.data();
    return source(inner.label, async (ctx) => tidyNames(fixGenders(dropZeroScores(await inner.load(ctx)), e.genderFixes)));
  },
});

const EVENTS = EVENT_CONFIGS.map(normalized);
const BY_SLUG = new Map(EVENTS.map((e) => [e.slug, e]));

export function getEvent(slug: string): EventConfig | undefined {
  return BY_SLUG.get(slug);
}

export function allEvents(): EventConfig[] {
  return [...EVENTS].sort((a, b) => b.dates.start.localeCompare(a.dates.start));
}

/** Archived events are always free, whatever the config says. */
export function requiresEntitlement(e: EventConfig): boolean {
  return e.access === "paid" && e.status !== "archived";
}

export function formatEventDates(e: EventConfig): string {
  const start = new Date(`${e.dates.start}T12:00:00Z`);
  const end = new Date(`${e.dates.end}T12:00:00Z`);
  const month = (d: Date) => d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  if (e.dates.approximate) return `${start.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}`;
  if (start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear()) {
    return `${month(start)} ${start.getUTCDate()}–${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  }
  return `${month(start)} ${start.getUTCDate()} – ${month(end)} ${end.getUTCDate()}, ${end.getUTCFullYear()}`;
}

/** Links between an event's views: scores open scorecards, names open the athlete's page. */
export function viewHrefs(e: EventConfig): { scorecardsHref?: string; athletesHref?: string } {
  return {
    scorecardsHref: e.views.includes("scorecards") ? `/events/${e.slug}/scorecards` : undefined,
    athletesHref: e.views.includes("athletes") ? `/events/${e.slug}/athletes` : undefined,
  };
}
