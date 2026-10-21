/** Result of a JSON request that never throws: network failures and non-JSON bodies become errors. */
export type JsonResult<T> = { ok: true; status: number; body: T } | { ok: false; status: number; error: string; code?: string };

export async function readJson<T>(request: Promise<Response>, fallback = "Something went wrong. Try again."): Promise<JsonResult<T>> {
  let res: Response;
  try {
    res = await request;
  } catch {
    return { ok: false, status: 0, error: "Couldn't reach the server. Check your connection and try again." };
  }
  const body = (await res.json().catch(() => null)) as (T & { error?: string; code?: string }) | null;
  if (res.ok && body !== null) return { ok: true, status: res.status, body };
  return { ok: false, status: res.status, error: body?.error ?? fallback, code: body?.code };
}
