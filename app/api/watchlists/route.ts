import { authErrorResponse, getWatchlists, setWatchlists, verifySession } from "@/lib/auth/admin";
import { fitsInAccount, sanitizeLists } from "@/lib/watchlist/sync";

const noStore = { "cache-control": "private, no-store" };

/** The signed-in account's watch lists. */
export async function GET(req: Request) {
  try {
    const { uid } = await verifySession(req);
    const doc = await getWatchlists(uid);
    return Response.json({ lists: doc?.lists ?? [], updatedAt: doc?.updatedAt ?? 0 }, { headers: noStore });
  } catch (err) {
    return authErrorResponse(err);
  }
}

/** Replace the account's watch lists with the ones sent (cleaned and size-limited). */
export async function PUT(req: Request) {
  try {
    const { uid } = await verifySession(req);
    const text = await req.text();
    if (text.length > 2_000_000) return Response.json({ error: "Too much data." }, { status: 413 });
    let body: { lists?: unknown } | null = null;
    try {
      body = JSON.parse(text) as { lists?: unknown };
    } catch {
      /* fall through to 400 */
    }
    const lists = sanitizeLists(body?.lists);
    if (!lists) return Response.json({ error: "Expected { lists: [...] }." }, { status: 400 });
    if (!fitsInAccount(lists)) return Response.json({ error: "These watch lists are too big to save to an account." }, { status: 413 });
    const updatedAt = await setWatchlists(uid, lists);
    // Send back what was stored (trimmed to the limits) so the device can adopt it.
    return Response.json({ ok: true, updatedAt, lists }, { headers: noStore });
  } catch (err) {
    return authErrorResponse(err);
  }
}
