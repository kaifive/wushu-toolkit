import { authErrorResponse, requireAdmin, setGrant, verifySession } from "@/lib/auth/admin";
import { GrantError } from "@/lib/auth/grants";
import { getEvent } from "@/lib/events/registry";

/** Admin-only: grant or revoke an event pass by email. */
export async function POST(req: Request) {
  try {
    const { uid, email: adminEmail } = await verifySession(req);
    requireAdmin(uid);
    const body = (await req.json().catch(() => ({}))) as { email?: unknown; slug?: unknown; revoke?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const slug = typeof body.slug === "string" ? body.slug : "";
    if (!email.includes("@") || !getEvent(slug)) return Response.json({ error: "Need a valid email and event." }, { status: 400 });
    const revoke = body.revoke === true;
    const result = await setGrant(email, slug, adminEmail ?? uid, { revoke });
    return Response.json({ ok: true, ...result, slug, revoked: revoke });
  } catch (err) {
    if (err instanceof GrantError) return Response.json({ error: err.message, code: err.code }, { status: err.code === "no-user" ? 404 : 409 });
    return authErrorResponse(err);
  }
}
