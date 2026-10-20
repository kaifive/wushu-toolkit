import { EVENT_CONFIGS } from "@/content/events";
import type { EventConfig, EventStatus } from "./types";

const BY_SLUG = new Map(EVENT_CONFIGS.map((e) => [e.slug, e]));

export function getEvent(slug: string): EventConfig | undefined {
  return BY_SLUG.get(slug);
}

export function allEvents(): EventConfig[] {
  return [...EVENT_CONFIGS].sort((a, b) => b.dates.start.localeCompare(a.dates.start));
}

export function eventsByStatus(status: EventStatus): EventConfig[] {
  return allEvents().filter((e) => e.status === status);
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
