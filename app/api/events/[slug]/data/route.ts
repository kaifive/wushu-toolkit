import { authErrorResponse, requireEntitlement, verifySession } from "@/lib/auth/admin";
import { getEvent, requiresEntitlement } from "@/lib/events/registry";

/** Data for paid live events. Requires a valid token, the current device, and a pass. */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return Response.json({ error: "Unknown event." }, { status: 404 });
  try {
    if (requiresEntitlement(event)) {
      const { uid } = await verifySession(req);
      await requireEntitlement(uid, slug);
    }
    const data = await event.data().load({ revalidate: event.revalidate ?? 60 });
    return Response.json(data, { headers: { "cache-control": "private, no-store" } });
  } catch (err) {
    if (err instanceof Error && !("status" in err)) return Response.json({ error: `Couldn't load scores: ${err.message}` }, { status: 502 });
    return authErrorResponse(err);
  }
}
