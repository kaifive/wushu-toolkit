import type { EventData } from "@/lib/domain/types";
import { liveLostData } from "./snapshot";
import { source, type DataSource } from "./source";

/**
 * Serve `live`; serve `snapshot` marked stale when live fails or has lost
 * most of its scores (a cleared or rearranged sheet must never blank an
 * archive). If both fail the error says why each one failed. With
 * `liveOnly` (the snapshot script) only the live source is read.
 */
export function liveWithSnapshot(live: DataSource<EventData>, snapshot: DataSource<EventData>): DataSource<EventData> {
  const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));
  return source(live.label, async (ctx) => {
    if (ctx.liveOnly) return live.load(ctx);
    const [l, s] = await Promise.allSettled([live.load(ctx), snapshot.load(ctx)]);
    if (l.status === "fulfilled") {
      const lost = s.status === "fulfilled" ? liveLostData(s.value, l.value) : null;
      if (!lost || s.status !== "fulfilled") return l.value;
      return { ...s.value, stale: true, source: `${s.value.source} (live source has less: ${lost})` };
    }
    if (s.status === "fulfilled") return { ...s.value, stale: true, source: `${s.value.source} (live source unavailable)` };
    throw new Error(`${msg(l.reason)} (no saved copy: ${msg(s.reason)})`, { cause: l.reason });
  });
}
