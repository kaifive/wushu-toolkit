import { allEvents, requiresEntitlement } from "@/lib/events/registry";

/** Declared difficulty from free competitions, for the nandu calculator's "Load From a Competition". */
export const revalidate = 3600;

export async function GET() {
  // Paid live events stay behind their pass (ADR-005).
  const events = allEvents().filter((e) => !requiresEntitlement(e));
  const lists = await Promise.all(
    events.map(async (e) => {
      try {
        const d = await e.data().load({ revalidate: 3600 });
        return d.scores
          .filter((s) => s.code && s.nandu?.length)
          .map((s) => ({ athlete: s.athleteName, club: s.club, competition: e.shortName, raw: s.raw, code: s.code!, nandu: s.nandu! }));
      } catch {
        return []; // live source down and no snapshot: skip this event
      }
    }),
  );
  return Response.json(lists.flat());
}
