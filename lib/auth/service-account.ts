/** FIREBASE_SERVICE_ACCOUNT is base64 of the service-account JSON (Vercel env, scripts). */
export interface ServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export function parseServiceAccount(raw: string): ServiceAccount {
  const json = JSON.parse(Buffer.from(raw, "base64").toString("utf8")) as { project_id: string; client_email: string; private_key: string };
  return { projectId: json.project_id, clientEmail: json.client_email, privateKey: json.private_key };
}
