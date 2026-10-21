import { authErrorResponse, verifySessionWithPass } from "@/lib/auth/admin";
import { getEvent, requiresEntitlement } from "@/lib/events/registry";

/** Data for paid live events. Requires a valid token, the current device, and a pass. */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return Response.json({ error: "Unknown event." }, { status: 404 });
  if (requiresEntitlement(event)) {
    // Auth failures (and auth-service outages) answer like every other account route.
    try {
      await verifySessionWithPass(req, slug);
    } catch (err) {
      return authErrorResponse(err);
    }
  }
  try {
    const data = await event.data().load({ revalidate: event.revalidate ?? 60 });
    // Free events are public: let the CDN serve repeat requests (export taps).
    const cache = requiresEntitlement(event) ? "private, no-store" : `public, s-maxage=${event.revalidate ?? 60}, stale-while-revalidate=300`;
    return Response.json(data, { headers: { "cache-control": cache } });
  } catch (err) {
    return Response.json({ error: `Couldn't load scores: ${err instanceof Error ? err.message : String(err)}` }, { status: 502 });
  }
}
