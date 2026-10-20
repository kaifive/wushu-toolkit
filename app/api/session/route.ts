import { authErrorResponse, startSession, verifyUser } from "@/lib/auth/admin";
import { deviceLabel } from "@/lib/auth/model";

/** Called right after sign-in: this device becomes the account's only session. */
export async function POST(req: Request) {
  try {
    const { uid } = await verifyUser(req);
    const body = (await req.json().catch(() => ({}))) as { sessionId?: unknown };
    if (typeof body.sessionId !== "string" || body.sessionId.length < 16 || body.sessionId.length > 100) {
      return Response.json({ error: "Bad session id." }, { status: 400 });
    }
    await startSession(uid, body.sessionId, deviceLabel(req.headers.get("user-agent") ?? ""));
    return Response.json({ ok: true });
  } catch (err) {
    return authErrorResponse(err);
  }
}
