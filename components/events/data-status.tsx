import { Notice } from "@/components/ui/notice";
import type { EventData } from "@/lib/domain/types";

export function formatAsOf(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Chicago" }) + " CT";
}

export function DataStatus({ data }: { data: EventData }) {
  return (
    <div className="mb-4">
      {data.stale ? (
        <Notice tone="warn" title="Showing saved data">
          The live source didn&apos;t respond, so this is the last saved copy from {formatAsOf(data.asOf)}.
        </Notice>
      ) : (
        <p className="text-xs text-ink-muted">
          Source: {data.source} · as of {formatAsOf(data.asOf)}
        </p>
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
    <p className="mt-8 text-xs text-ink-muted">
      Wushu Toolkit is not affiliated with the event organizers and is not an official results service. Projections follow the
      published rules as closely as we can, but always confirm results with the organizers.
    </p>
  );
}
