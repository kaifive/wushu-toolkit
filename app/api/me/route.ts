import { authErrorResponse, getEntitlements, verifySession } from "@/lib/auth/admin";
import { activeGrants, parseAdminUids } from "@/lib/auth/model";

export async function GET(req: Request) {
  try {
    const { uid, email } = await verifySession(req);
    return Response.json({ uid, email, passes: activeGrants(await getEntitlements(uid)), admin: parseAdminUids(process.env.ADMIN_UIDS).has(uid) });
  } catch (err) {
    return authErrorResponse(err);
  }
}
