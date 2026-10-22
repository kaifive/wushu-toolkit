import type { EventData, Schedule } from "@/lib/domain/types";
import { withScores } from "@/lib/domain/schedule";
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

/**
 * Add a schedule from its own source (an order-of-competition page, a ring
 * feed), with scores filled in. If that source fails, the data's own
 * schedule (e.g. a saved one) is kept.
 */
export function withSchedule(data: DataSource<EventData>, schedule: DataSource<Schedule[]>): DataSource<EventData> {
  return source(data.label, async (ctx) => {
    const [d, s] = await Promise.all([data.load(ctx), schedule.load(ctx).catch(() => null)]);
    return { ...d, schedules: withScores(s?.length ? s : d.schedules, d.scores) };
  });
}
