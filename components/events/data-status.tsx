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
          The live source isn&apos;t responding. Showing the last saved copy from {formatAsOf(data.asOf)}.
        </Notice>
      ) : (
        <Notice>
          Scores as of {formatAsOf(data.asOf)} · {data.source}
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

export function Disclaimer() {
  return (
    <p className="mt-8 text-sm text-ink-muted">
      Not an official results service. Projections follow the published rules; confirm results with the organizers.
    </p>
  );
}
