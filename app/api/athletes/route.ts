import { allEvents, requiresEntitlement } from "@/lib/events/registry";
import { buildAthleteIndex } from "@/lib/watchlist/suggest";

/** Every athlete and club seen in free competitions, for type-ahead. Static, refreshed hourly. */
export const revalidate = 3600;

export async function GET() {
  // Paid live events stay behind their pass (ADR-005), so their athletes are never listed here.
  const events = allEvents().filter((e) => !requiresEntitlement(e));
  const loaded = await Promise.all(
    events.map(async (e) => {
      try {
        return { label: e.shortName, data: await e.data().load({ revalidate: 3600 }) };
      } catch {
        return null; // live source down and no snapshot: skip this event
      }
    }),
  );
  return Response.json(buildAthleteIndex(loaded.filter((x) => x !== null)));
}
