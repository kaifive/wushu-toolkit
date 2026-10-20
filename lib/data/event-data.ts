import type { EventData } from "@/lib/domain/types";
import { source, type DataSource } from "./source";

/**
 * Serve `live`; if it fails, serve `snapshot` marked stale. If both fail the
 * error says why each one failed, so the page can show it.
 */
export function liveWithSnapshot(live: DataSource<EventData>, snapshot: DataSource<EventData>): DataSource<EventData> {
  return source(live.label, async (ctx) => {
    try {
      return await live.load(ctx);
    } catch (liveErr) {
      try {
        const snap = await snapshot.load(ctx);
        return { ...snap, stale: true, source: `${snap.source} (live source unavailable)` };
      } catch (snapErr) {
        const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));
        throw new Error(`${msg(liveErr)} (no saved copy: ${msg(snapErr)})`, { cause: liveErr });
      }
    }
  });
}
