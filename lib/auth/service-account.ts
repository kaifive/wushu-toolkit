/**
 * FIREBASE_SERVICE_ACCOUNT holds the service-account JSON, either base64
 * encoded (recommended) or pasted as-is. Errors never include the value.
 */
export interface ServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export class ServiceAccountError extends Error {}

export function parseServiceAccount(raw: string): ServiceAccount {
  let text = raw.trim();
  // Dashboards sometimes keep the quotes from a copied value.
  if (/^(['"]).*\1$/s.test(text)) text = text.slice(1, -1).trim();
  if (!text.startsWith("{")) text = Buffer.from(text, "base64").toString("utf8").trim();
  let json: { project_id?: unknown; client_email?: unknown; private_key?: unknown };
  try {
    json = JSON.parse(text) as typeof json;
  } catch {
    throw new ServiceAccountError("FIREBASE_SERVICE_ACCOUNT isn't the service-account JSON (or its base64).");
  }
  const missing = (["project_id", "client_email", "private_key"] as const).filter((k) => typeof json[k] !== "string" || !json[k]);
  if (missing.length) throw new ServiceAccountError(`FIREBASE_SERVICE_ACCOUNT is missing ${missing.join(", ")}.`);
  // A key pasted through some tools keeps its newlines escaped.
  const privateKey = (json.private_key as string).replace(/\\n/g, "\n");
  if (!privateKey.includes("BEGIN PRIVATE KEY")) throw new ServiceAccountError("FIREBASE_SERVICE_ACCOUNT's private_key isn't a private key.");
  return { projectId: json.project_id as string, clientEmail: json.client_email as string, privateKey };
}
