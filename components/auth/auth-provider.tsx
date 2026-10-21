"use client";

import type { User } from "firebase/auth";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { authConfigured, firebase } from "@/lib/auth/client";
import { newSessionId, SESSION_HEADER, SESSION_STORAGE_KEY, type SessionDoc } from "@/lib/auth/model";
import { storageGet, storageJson, storageSet } from "@/lib/storage";

/**
 * Accounts (ADR-005). One sign-in state per page, shared by every component
 * that calls useAuth, with one Firebase auth listener and one session
 * listener. Firebase loads only when something on the page calls useAuth.
 */

type Status = "off" | "loading" | "signed-out" | "signed-in";

interface Snapshot {
  status: Status;
  user: User | null;
  /** Set when this device was signed out because the account signed in elsewhere. */
  kicked: string | null;
}

interface AuthState extends Snapshot {
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
  signOut(): Promise<void>;
  /** fetch() with the ID token and this device's session id attached. */
  authedFetch(input: string, init?: RequestInit): Promise<Response>;
}

// ------------------------------------------------------------------ storage

/** This device's session id, shared by its tabs. */
const readSession = () => storageGet(SESSION_STORAGE_KEY);
const writeSession = (id: string | null) => storageSet(SESSION_STORAGE_KEY, id);

/**
 * A sign-in in progress on this device: { id, at }. Until /api/session has
 * stored `id`, every tab still sees the old id on the server; that is this
 * device's own pending claim, not another device, so nobody signs out.
 */
const CLAIM_KEY = `${SESSION_STORAGE_KEY}:claim`;
const CLAIM_TTL = 30_000;
function pendingClaim(): boolean {
  const c = storageJson(CLAIM_KEY) as { id?: unknown; at?: unknown } | null;
  return !!c && c.id === readSession() && typeof c.at === "number" && Date.now() - c.at < CLAIM_TTL;
}

/** Set while signed in on this device, so layout-level features know to start accounts. */
export const SIGNED_IN_KEY = "wt:signed-in";
export const SIGNED_IN_EVENT = "wt:signed-in";

// ------------------------------------------------------------------ store

let snap: Snapshot = { status: "loading", user: null, kicked: null };
const subs = new Set<() => void>();
let started = false;
/** This tab is signing in right now. */
let claiming = false;

function set(patch: Partial<Snapshot>) {
  snap = { ...snap, ...patch };
  if (patch.status) {
    const on = snap.status === "signed-in";
    if ((storageGet(SIGNED_IN_KEY) === "1") !== on) {
      storageSet(SIGNED_IN_KEY, on ? "1" : null);
      window.dispatchEvent(new Event(SIGNED_IN_EVENT));
    }
  }
  subs.forEach((f) => f());
}

/** Signed in, but wait while a claim (this tab's or another tab's) is still on its way to the server. */
function settle() {
  if (!snap.user) return set({ status: "signed-out" });
  set({ status: claiming || pendingClaim() ? "loading" : "signed-in" });
}

function start() {
  if (started) return;
  started = true;
  if (!authConfigured()) return set({ status: "off" });
  // Another tab finishing its claim clears the marker.
  window.addEventListener("storage", (e) => e.key === CLAIM_KEY && settle());
  void firebase().then(async ({ auth, db }) => {
    const [{ onAuthStateChanged, signOut }, { doc, onSnapshot }] = await Promise.all([import("firebase/auth"), import("firebase/firestore")]);
    let unsubSession = () => {};
    let noIdTimer: number | undefined;
    let waitTimer: number | undefined;
    onAuthStateChanged(auth, (u) => {
      unsubSession();
      set({ user: u });
      settle();
      // A pending claim that never finishes (tab closed) expires; check again then.
      window.clearTimeout(waitTimer);
      if (u && pendingClaim()) waitTimer = window.setTimeout(settle, CLAIM_TTL);
      if (!u) return;
      // Single-device lock: when another device claims the account, sign this one out.
      unsubSession = onSnapshot(doc(db, "sessions", u.uid), (s) => {
        if (claiming) return;
        const data = s.data() as SessionDoc | undefined;
        if (!data) return;
        const mine = readSession();
        if (!mine) {
          // No local id while Firebase kept the user: storage was cleared, or
          // another tab is mid sign-in (it writes the id first). Give that tab
          // a moment, then sign in again if it's still missing.
          window.clearTimeout(noIdTimer);
          noIdTimer = window.setTimeout(() => !readSession() && !claiming && void signOut(auth), 4000);
          return;
        }
        if (data.sessionId === mine) {
          if (snap.status === "loading") settle();
          return;
        }
        if (pendingClaim()) return; // our own claim hasn't landed yet
        writeSession(null);
        set({ kicked: data.device || "another device" });
        void signOut(auth);
      });
    });
  });
}

const subscribe = (cb: () => void) => {
  subs.add(cb);
  return () => subs.delete(cb);
};
const getSnap = () => snap;
const serverSnap: Snapshot = { status: "loading", user: null, kicked: null };

// ------------------------------------------------------------------ actions

/** Claim the account for this device: new session id, registered server-side. */
async function claimSession(user: User) {
  const sessionId = newSessionId();
  if (!storageSet(CLAIM_KEY, JSON.stringify({ id: sessionId, at: Date.now() })) || !writeSession(sessionId) || readSession() !== sessionId) {
    throw new Error("This browser is blocking site storage, which accounts need. Allow storage for this site and try again.");
  }
  const res = await fetch("/api/session", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${await user.getIdToken()}` },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw new Error(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "Couldn't start a session.");
  storageSet(CLAIM_KEY, null);
}

/** Sign in (or up), claim the session, or sign back out so the account isn't left half signed in. */
async function withClaim(signInFn: () => Promise<User>) {
  const [{ auth }, { signOut }] = await Promise.all([firebase(), import("firebase/auth")]);
  claiming = true;
  try {
    const user = await signInFn();
    try {
      await claimSession(user);
    } catch (err) {
      writeSession(null);
      storageSet(CLAIM_KEY, null);
      await signOut(auth).catch(() => {});
      throw err;
    }
  } finally {
    claiming = false;
  }
  set({ kicked: null });
  settle();
}

async function signIn(email: string, password: string) {
  const { auth } = await firebase();
  const { signInWithEmailAndPassword } = await import("firebase/auth");
  await withClaim(async () => (await signInWithEmailAndPassword(auth, email, password)).user);
}

async function signUp(email: string, password: string) {
  const { auth } = await firebase();
  const { createUserWithEmailAndPassword, sendEmailVerification } = await import("firebase/auth");
  await withClaim(async () => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    // Passes go only to verified emails (lib/auth/grants.ts).
    await sendEmailVerification(user).catch(() => {});
    return user;
  });
}

async function resetPassword(email: string) {
  const { auth } = await firebase();
  const { sendPasswordResetEmail } = await import("firebase/auth");
  await sendPasswordResetEmail(auth, email);
}

async function signOutFn() {
  const { auth } = await firebase();
  const { signOut } = await import("firebase/auth");
  writeSession(null);
  await signOut(auth);
}

// ------------------------------------------------------------------ hooks

export function useAuth(): AuthState {
  useEffect(start, []);
  const s = useSyncExternalStore(subscribe, getSnap, () => serverSnap);
  const user = s.user;
  const authedFetch = useCallback(
    async (input: string, init: RequestInit = {}) => {
      const headers = new Headers(init.headers);
      if (user) headers.set("authorization", `Bearer ${await user.getIdToken()}`);
      const sid = readSession();
      if (sid) headers.set(SESSION_HEADER, sid);
      return fetch(input, { ...init, headers });
    },
    [user],
  );
  return useMemo(() => ({ ...s, signIn, signUp, resetPassword, signOut: signOutFn, authedFetch }), [s, authedFetch]);
}

/** Kept so existing pages read the same; the state itself is shared per page. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
