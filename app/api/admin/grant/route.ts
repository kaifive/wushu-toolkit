import { authErrorResponse, requireAdmin, setGrant, verifySession } from "@/lib/auth/admin";
import { getEvent } from "@/lib/events/registry";

/** Admin-only: grant or revoke an event pass by email. */
export async function POST(req: Request) {
  try {
    const { uid, email: adminEmail } = await verifySession(req);
    requireAdmin(uid);
    const body = (await req.json().catch(() => ({}))) as { email?: string; slug?: string; revoke?: boolean };
    if (!body.email || !body.slug || !getEvent(body.slug)) return Response.json({ error: "Need a valid email and event." }, { status: 400 });
    const result = await setGrant(body.email.trim().toLowerCase(), body.slug, adminEmail ?? uid, { revoke: !!body.revoke });
    return Response.json({ ok: true, ...result, slug: body.slug, revoked: !!body.revoke });
  } catch (err) {
    if (err instanceof Error && /no user record/i.test(err.message)) return Response.json({ error: "No account with that email. Ask them to sign up first." }, { status: 404 });
    return authErrorResponse(err);
  }
}
