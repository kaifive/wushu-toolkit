"use client";

import type { User } from "firebase/auth";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { authConfigured, firebase } from "@/lib/auth/client";
import { newSessionId, SESSION_HEADER, SESSION_STORAGE_KEY, type SessionDoc } from "@/lib/auth/model";

type Status = "off" | "loading" | "signed-out" | "signed-in";

interface AuthState {
  status: Status;
  user: User | null;
  /** Set when this device was signed out because the account signed in elsewhere. */
  kicked: string | null;
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
  signOut(): Promise<void>;
  /** fetch() with the ID token and this device's session id attached. */
  authedFetch(input: string, init?: RequestInit): Promise<Response>;
}

const Ctx = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside AuthProvider");
  return v;
}

const readSession = () => {
  try {
    return window.localStorage.getItem(SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
};
const writeSession = (id: string | null) => {
  try {
    if (id) window.localStorage.setItem(SESSION_STORAGE_KEY, id);
    else window.localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    /* storage blocked */
  }
};

/**
 * Claim the account for this device: new session id, registered server-side.
 * Runs while `claiming` is set, so the session listener ignores the old id.
 */
async function claimSession(user: User) {
  const sessionId = newSessionId();
  writeSession(sessionId);
  const res = await fetch("/api/session", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${await user.getIdToken()}` },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw new Error(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "Couldn't start a session.");
}

/** Claim the session, or sign back out so the account isn't left half signed in. */
async function claimOrSignOut(user: User) {
  try {
    await claimSession(user);
  } catch (err) {
    writeSession(null);
    const [{ auth }, { signOut }] = await Promise.all([firebase(), import("firebase/auth")]);
    await signOut(auth).catch(() => {});
    throw err;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>(authConfigured() ? "loading" : "off");
  const [user, setUser] = useState<User | null>(null);
  const [kicked, setKicked] = useState<string | null>(null);
  /**
   * True while this tab signs in and claims the session. Until the claim is
   * stored server-side, session snapshots still show the previous id (which
   * would look like another device) and authed requests would be refused, so
   * the listener waits and status stays "loading".
   */
  const claiming = useRef(false);

  useEffect(() => {
    if (!authConfigured()) return;
    let unsubAuth = () => {};
    let unsubSession = () => {};
    let alive = true;
    void firebase().then(async ({ auth, db }) => {
      const [{ onAuthStateChanged, signOut }, { doc, onSnapshot }] = await Promise.all([import("firebase/auth"), import("firebase/firestore")]);
      if (!alive) return;
      unsubAuth = onAuthStateChanged(auth, (u) => {
        unsubSession();
        setUser(u);
        setStatus(!u ? "signed-out" : claiming.current ? "loading" : "signed-in");
        if (!u) return;
        // Single-device lock: when another device claims the account, sign this one out.
        unsubSession = onSnapshot(doc(db, "sessions", u.uid), (snap) => {
          if (claiming.current) return;
          const data = snap.data() as SessionDoc | undefined;
          const mine = readSession();
          if (data && mine && data.sessionId !== mine) {
            writeSession(null);
            setKicked(data.device || "another device");
            void signOut(auth);
          }
        });
      });
    });
    return () => {
      alive = false;
      unsubAuth();
      unsubSession();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { auth } = await firebase();
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    claiming.current = true;
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await claimOrSignOut(cred.user);
    } finally {
      claiming.current = false;
    }
    setKicked(null);
    if (auth.currentUser) setStatus("signed-in");
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { auth } = await firebase();
    const { createUserWithEmailAndPassword, sendEmailVerification } = await import("firebase/auth");
    claiming.current = true;
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Passes go only to verified emails (lib/auth/grants.ts).
      await sendEmailVerification(cred.user).catch(() => {});
      await claimOrSignOut(cred.user);
    } finally {
      claiming.current = false;
    }
    if (auth.currentUser) setStatus("signed-in");
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { auth } = await firebase();
    const { sendPasswordResetEmail } = await import("firebase/auth");
    await sendPasswordResetEmail(auth, email);
  }, []);

  const signOutFn = useCallback(async () => {
    const { auth } = await firebase();
    const { signOut } = await import("firebase/auth");
    writeSession(null);
    await signOut(auth);
  }, []);

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

  const value = useMemo(
    () => ({ status, user, kicked, signIn, signUp, resetPassword, signOut: signOutFn, authedFetch }),
    [status, user, kicked, signIn, signUp, resetPassword, signOutFn, authedFetch],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
