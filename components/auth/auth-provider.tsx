"use client";

import type { User } from "firebase/auth";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { authConfigured, firebase } from "@/lib/auth/client";
import { CLAIM_TTL, newSessionId, parseLocalSession, SESSION_HEADER, SESSION_STORAGE_KEY, sessionVerdict, type LocalSession, type SessionDoc } from "@/lib/auth/model";
import { storageGet, storageSet } from "@/lib/storage";

/**
 * Accounts (ADR-005). One sign-in state per page, shared by every component
 * that calls useAuth, with one Firebase auth listener and one session
 * listener. Firebase loads only when something on the page calls useAuth.
 *
 * The single-device lock is decided by sessionVerdict (lib/auth/model.ts)
 * from server claim times, so a stale snapshot or another tab's sign-in in
 * progress can't sign this device out.
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
  /** Google account (verified email, so it can receive passes right away). */
  signInWithGoogle(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  signOut(): Promise<void>;
  /** fetch() with the ID token and this device's session id attached. */
  authedFetch(input: string, init?: RequestInit): Promise<Response>;
}

// ------------------------------------------------------------------ storage (shared by this device's tabs)

const readLocal = () => parseLocalSession(storageGet(SESSION_STORAGE_KEY));
const writeLocal = (s: LocalSession | null) => storageSet(SESSION_STORAGE_KEY, s && JSON.stringify(s));

/** Device that took the account over, so every tab can say why it signed out. */
const KICKED_KEY = `${SESSION_STORAGE_KEY}:kicked-by`;

/** "1" while this device is signed in, so layout-level features know to start accounts. */
export const SIGNED_IN_KEY = "wt:signed-in";
export const SIGNED_IN_EVENT = "wt:signed-in";
function markSignedIn(on: boolean) {
  if ((storageGet(SIGNED_IN_KEY) === "1") === on) return;
  storageSet(SIGNED_IN_KEY, on ? "1" : null);
  window.dispatchEvent(new Event(SIGNED_IN_EVENT));
}

// ------------------------------------------------------------------ store

let snap: Snapshot = { status: "loading", user: null, kicked: null };
const subs = new Set<() => void>();
let started = false;
/** This tab is signing in: its form stays up (status signed-out) until the claim finishes. */
let claiming = false;
/** Latest session doc from the listener. */
let lastDoc: SessionDoc | undefined;
let signOutNow: (() => void) | null = null;
let token: string | null = null;

/** The server is the final word on the lock: a request it refuses as "other device" signs this device out. */
async function serverSaysKicked(res: Response) {
  if (res.status !== 401) return;
  const body = (await res.clone().json().catch(() => null)) as { code?: string } | null;
  // No local id means this device just signed out (or is mid sign-in): not a takeover.
  const local = readLocal();
  if (body?.code !== "other-device" || claiming || !local || local.claimedAt === null) return;
  const device = lastDoc?.device || "another device";
  storageSet(KICKED_KEY, device);
  writeLocal(null);
  set({ kicked: device });
  signOutNow?.();
}
let recheck: number | undefined;

function set(patch: Partial<Snapshot>) {
  snap = { ...snap, ...patch };
  subs.forEach((f) => f());
}

/** Work out this tab's status from the user, the local session and the latest session doc. */
function settle() {
  window.clearTimeout(recheck);
  if (!snap.user) return set({ status: "signed-out" });
  if (claiming) return set({ status: "signed-out" });
  const local = readLocal();
  switch (sessionVerdict(lastDoc, local, Date.now())) {
    case "ok":
      markSignedIn(true);
      return set({ status: "signed-in", kicked: null });
    case "pending":
      // Another tab is signing in; look again when its claim would expire.
      recheck = window.setTimeout(settle, Math.max(0, CLAIM_TTL - (Date.now() - (local?.startedAt ?? 0))) + 50);
      return set({ status: "loading" });
    case "kicked":
      storageSet(KICKED_KEY, lastDoc?.device || "another device");
      writeLocal(null);
      set({ kicked: lastDoc?.device || "another device" });
      return signOutNow?.();
    case "lost":
      set({ kicked: storageGet(KICKED_KEY) });
      return signOutNow?.();
  }
}

function start() {
  if (started) return;
  started = true;
  if (!authConfigured()) return set({ status: "off" });
  // Another tab changing this device's session (claim done, kicked, signed out).
  window.addEventListener("storage", (e) => e.key === SESSION_STORAGE_KEY && settle());
  void firebase().then(async ({ auth, db }) => {
    const [{ onAuthStateChanged, onIdTokenChanged, signOut }, { doc, onSnapshot }] = await Promise.all([import("firebase/auth"), import("firebase/firestore")]);
    signOutNow = () => void signOut(auth);
    // Fresh token kept at hand so unload-time saves can start fetch() without awaiting a refresh.
    onIdTokenChanged(auth, (u) => {
      token = null;
      void u?.getIdToken().then((t) => (token = t));
    });
    let unsubSession = () => {};
    let relisten: number | undefined;
    onAuthStateChanged(auth, (u) => {
      unsubSession();
      window.clearTimeout(relisten);
      lastDoc = undefined;
      set({ user: u });
      if (!u) {
        markSignedIn(false);
        return settle();
      }
      settle();
      // If the listener fails (e.g. permission before the token reaches
      // Firestore), listen again shortly; the server's "other-device" answers
      // (see authedFetch) still sign the device out in the meantime.
      const listen = () => {
        unsubSession = onSnapshot(
          doc(db, "sessions", u.uid),
          (s) => {
            lastDoc = s.data() as SessionDoc | undefined;
            settle();
          },
          () => {
            window.clearTimeout(relisten);
            relisten = window.setTimeout(() => snap.user?.uid === u.uid && listen(), 5000);
          },
        );
      };
      listen();
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

/**
 * Sign in (or up) and claim the account for this device. The pending local
 * session is written first, so other tabs wait instead of signing out; if
 * anything fails the account is signed back out, never left half signed in.
 */
async function withClaim(signInFn: () => Promise<User>) {
  const [{ auth }, { signOut }] = await Promise.all([firebase(), import("firebase/auth")]);
  const id = newSessionId();
  if (!writeLocal({ id, claimedAt: null, startedAt: Date.now() }) || readLocal()?.id !== id) {
    throw new Error("This browser is blocking site storage, which accounts need. Allow storage for this site and try again.");
  }
  claiming = true;
  // Keep the pending claim fresh while this tab works on it (slow networks),
  // so other tabs only treat it as abandoned if this tab really went away.
  const beat = window.setInterval(() => {
    const cur = readLocal();
    if (cur?.id === id && cur.claimedAt === null) writeLocal({ ...cur, startedAt: Date.now() });
  }, 10_000);
  try {
    const user = await signInFn();
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${await user.getIdToken()}` },
        body: JSON.stringify({ sessionId: id }),
      });
      const body = (await res.json().catch(() => ({}))) as { claimedAt?: number; error?: string };
      if (!res.ok || typeof body.claimedAt !== "number") throw new Error(body.error ?? "Couldn't start a session. Try again.");
      writeLocal({ id, claimedAt: body.claimedAt, startedAt: Date.now() });
      storageSet(KICKED_KEY, null);
    } catch (err) {
      writeLocal(null);
      await signOut(auth).catch(() => {});
      throw err;
    }
  } catch (err) {
    if (readLocal()?.id === id) writeLocal(null); // sign-in itself failed (wrong password…)
    throw err;
  } finally {
    claiming = false;
    window.clearInterval(beat);
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

async function signInWithGoogle() {
  const { auth } = await firebase();
  const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await withClaim(async () => (await signInWithPopup(auth, provider)).user);
}

async function resetPassword(email: string) {
  const { auth } = await firebase();
  const { sendPasswordResetEmail } = await import("firebase/auth");
  await sendPasswordResetEmail(auth, email);
}

async function signOutFn() {
  const { auth } = await firebase();
  const { signOut } = await import("firebase/auth");
  writeLocal(null);
  storageSet(KICKED_KEY, null);
  await signOut(auth);
}

// ------------------------------------------------------------------ hook

export function useAuth(): AuthState {
  useEffect(start, []);
  const s = useSyncExternalStore(subscribe, getSnap, () => serverSnap);
  const user = s.user;
  const authedFetch = useCallback(
    async (input: string, init: RequestInit = {}) => {
      const headers = new Headers(init.headers);
      // Unload-time (keepalive) requests use the cached token so fetch starts at once.
      const bearer = init.keepalive && token ? token : user ? await user.getIdToken() : null;
      if (bearer) headers.set("authorization", `Bearer ${bearer}`);
      const sid = readLocal()?.id;
      if (sid) headers.set(SESSION_HEADER, sid);
      const res = await fetch(input, { ...init, headers });
      void serverSaysKicked(res);
      return res;
    },
    [user],
  );
  return useMemo(() => ({ ...s, signIn, signUp, signInWithGoogle, resetPassword, signOut: signOutFn, authedFetch }), [s, authedFetch]);
}
