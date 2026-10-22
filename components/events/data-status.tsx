import { Notice } from "@/components/ui/notice";
import type { EventData } from "@/lib/domain/types";
import type { EventView } from "@/lib/events/types";

/** "Aug 4, 2025, 11:02 AM CDT" in the event's own time zone. */
export function formatAsOf(iso: string, timeZone = "America/Chicago"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const date = d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone });
  const zone = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" }).formatToParts(d).find((p) => p.type === "timeZoneName")?.value;
  return zone ? `${date} ${zone}` : date;
}

/** v1's "Standings as of …" info bar. */
/** Athletes with no gender on any entry; when athletes opt in (all-around), only those who did. */
function athletesWithoutGender(data: EventData): number {
  const tagged = data.registrations.filter((r) => r.athlete.tags?.includes("all-around")).map((r) => r.athlete.id);
  const pool = new Set(tagged.length ? tagged : data.scores.map((s) => s.athleteId));
  const withGender = new Set(data.scores.filter((s) => s.gender).map((s) => s.athleteId));
  data.registrations.forEach((r) => r.athlete.gender && withGender.add(r.athlete.id));
  return [...pool].filter((id) => !withGender.has(id)).length;
}

/** How each view splits by gender, for the missing-gender notice. */
export const GENDER_GAP: Record<EventView, "entries" | "athletes" | "none"> = {
  standings: "none", // no-gender entries get a Groups tab
  team: "entries",
  scorecards: "entries",
  stats: "entries",
  athletes: "none",
  schedule: "none",
  "all-around": "athletes",
};

/**
 * `genderGap`: "entries" for views split by gender per entry, "athletes" for
 * per-athlete views (all-around, which takes the gender from any entry),
 * "none" where nothing is split (schedule).
 */
export function DataStatus({ data, timeZone, genderGap = "entries" }: { data: EventData; timeZone?: string; genderGap?: "entries" | "athletes" | "none" }) {
  // Tables split by gender; an entry the source didn't give one can't be shown, so say so.
  const noGender =
    genderGap === "entries"
      ? data.scores.filter((s) => !s.gender).length
      : genderGap === "athletes"
        ? athletesWithoutGender(data)
        : 0;
  const unit = genderGap === "athletes" ? ["athlete has", "athletes have"] : ["entry has", "entries have"];
  return (
    <div className="mb-4 space-y-2">
      {data.stale ? (
        <Notice tone="warn">
          Live scores unavailable. Showing the saved copy from {formatAsOf(data.asOf, timeZone)}.
        </Notice>
      ) : (
        <p className="text-sm text-ink-muted">As of {formatAsOf(data.asOf, timeZone)}</p>
      )}
      {noGender > 0 && (
        <Notice tone="warn">
          {noGender} {noGender === 1 ? unit[0] : unit[1]} no gender in the source, so {noGender === 1 ? "it isn't" : "they aren't"} in the tables below.
        </Notice>
      )}
    </div>
  );
}

export function LoadError({ error }: { error: string }) {
  return (
    <Notice tone="error" title="Couldn't Load Scores">
      <p>The data source didn&apos;t respond. Try again in a minute.</p>
      <p className="mt-1 font-mono text-xs">{error}</p>
    </Notice>
  );
}
