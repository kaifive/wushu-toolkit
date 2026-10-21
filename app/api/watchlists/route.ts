import { authErrorResponse, getWatchlists, setWatchlists, verifySession } from "@/lib/auth/admin";
import { sanitizeLists } from "@/lib/watchlist/sync";

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
    if (Number(req.headers.get("content-length") ?? 0) > 512_000) return Response.json({ error: "Too much data." }, { status: 413 });
    const body = (await req.json().catch(() => null)) as { lists?: unknown } | null;
    const lists = sanitizeLists(body?.lists);
    if (!lists) return Response.json({ error: "Expected { lists: [...] }." }, { status: 400 });
    const updatedAt = await setWatchlists(uid, lists);
    return Response.json({ ok: true, updatedAt }, { headers: noStore });
  } catch (err) {
    return authErrorResponse(err);
  }
}
