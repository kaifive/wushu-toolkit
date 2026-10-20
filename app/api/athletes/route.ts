import { allEvents } from "@/lib/events/registry";
import { buildAthleteIndex } from "@/lib/watchlist/suggest";

/** Every athlete and club seen in past competitions, for watch-list type-ahead. Static, refreshed hourly. */
export const revalidate = 3600;

export async function GET() {
  const loaded = await Promise.all(
    allEvents().map(async (e) => {
      try {
        return { label: e.shortName, data: await e.data().load({ revalidate: 3600 }) };
      } catch {
        return null; // live source down and no snapshot: skip this event
      }
    }),
  );
  return Response.json(buildAthleteIndex(loaded.filter((x) => x !== null)));
}
