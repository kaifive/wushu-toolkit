import type { EventData } from "@/lib/domain/types";
import { source, withFallback, type DataSource } from "./source";

/**
 * Serve `live`; if it fails, serve `snapshot` marked stale. If both fail the
 * error says why each one failed, so the page can show it.
 */
export function liveWithSnapshot(live: DataSource<EventData>, snapshot: DataSource<EventData>): DataSource<EventData> {
  const layered = withFallback(live, snapshot);
  return source(live.label, async (ctx) => {
    const r = await layered.load(ctx);
    return r.stale ? { ...r.value, stale: true, source: `${r.value.source} (live source unavailable)` } : r.value;
  });
}
