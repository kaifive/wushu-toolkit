"use client";

import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

/** Public Firebase web config. Missing values mean accounts are off (the rest of the site works). */
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const authConfigured = () => !!(config.apiKey && config.authDomain && config.projectId);

let cached: Promise<{ app: FirebaseApp; auth: Auth; db: Firestore }> | null = null;

/** Load the Firebase SDK on demand, so pages without accounts never download it. */
export function firebase() {
  cached ??= (async () => {
    const [{ initializeApp, getApps }, { getAuth }, { getFirestore }] = await Promise.all([
      import("firebase/app"),
      import("firebase/auth"),
      import("firebase/firestore"),
    ]);
    const app = getApps()[0] ?? initializeApp(config);
    return { app, auth: getAuth(app), db: getFirestore(app) };
  })();
  return cached;
}
