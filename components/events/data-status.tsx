import { Notice } from "@/components/ui/notice";
import type { EventData } from "@/lib/domain/types";

/** "Aug 4, 2025, 11:02 AM CDT" in the event's own time zone. */
export function formatAsOf(iso: string, timeZone = "America/Chicago"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const date = d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone });
  const zone = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" }).formatToParts(d).find((p) => p.type === "timeZoneName")?.value;
  return zone ? `${date} ${zone}` : date;
}

/** v1's "Standings as of …" info bar. */
export function DataStatus({ data, timeZone, byGender = true }: { data: EventData; timeZone?: string; byGender?: boolean }) {
  // Tables split by gender; an entry the source didn't give one can't be shown, so say so.
  const noGender = byGender ? data.scores.filter((s) => !s.gender).length : 0;
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
          {noGender} {noGender === 1 ? "entry has" : "entries have"} no gender in the source, so {noGender === 1 ? "it isn't" : "they aren't"} in the tables below.
        </Notice>
      )}
    </div>
  );
}

export function LoadError({ error }: { error: string }) {
  return (
    <Notice tone="error" title="Couldn't load scores">
      <p>The data source didn&apos;t respond. Try again in a minute.</p>
      <p className="mt-1 font-mono text-xs">{error}</p>
    </Notice>
  );
}
