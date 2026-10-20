import { Notice } from "@/components/ui/notice";
import type { EventData } from "@/lib/domain/types";

export function formatAsOf(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Chicago" }) + " CT";
}

/** v1's "Standings as of …" info bar. */
export function DataStatus({ data }: { data: EventData }) {
  return (
    <div className="mb-4">
      {data.stale ? (
        <Notice tone="warn">
          Live scores unavailable. Showing the saved copy from {formatAsOf(data.asOf)}.
        </Notice>
      ) : (
        <p className="text-sm text-ink-muted">As of {formatAsOf(data.asOf)}</p>
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
