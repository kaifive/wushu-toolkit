"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AuthProvider, useAuth } from "@/components/auth/auth-provider";
import type { WatchList } from "@/lib/watchlist/match";
import { readLists, useWatchLists, writeLists } from "@/lib/watchlist/store";
import { storageGet, storageSet } from "@/lib/storage";
import { mergeLists, sameLists, SYNC_LIMITS } from "@/lib/watchlist/sync";

/** Which account this device's lists were last synced with. */
const OWNER_KEY = "wt:watchlists:owner";
const readOwner = () => storageGet(OWNER_KEY);
const writeOwner = (uid: string) => storageSet(OWNER_KEY, uid);

/** Browsers drop keepalive requests with bodies over 64 KB. */
const KEEPALIVE_MAX = 60_000;

/** What was last saved to the account, per user, to tell local edits from stale copies. */
const syncedKey = (uid: string) => `wt:watchlists:synced:${uid}`;
const readSynced = (uid: string) => storageGet(syncedKey(uid));
const writeSynced = (uid: string, lists: WatchList[]) => storageSet(syncedKey(uid), JSON.stringify(lists));

type State = "idle" | "loading" | "saving" | "saved" | "trimmed" | "error";

const wasTrimmed = (stored: WatchList[], sent: WatchList[]) =>
  stored.length !== sent.length || stored.some((l, i) => l.athletes.length !== sent[i]?.athletes.length);

/**
 * Sync runs once per page (app layout); the status line on /watchlists reads
 * it from here.
 */
type Shown = { auth: "off" | "loading" | "signed-out" | "signed-in"; state: State };
let shown: Shown = { auth: "loading", state: "idle" };
const SHOWN_EVENT = "wt:watchlist-sync";
function publish(next: Shown) {
  if (next.auth === shown.auth && next.state === shown.state) return;
  shown = next;
  window.dispatchEvent(new Event(SHOWN_EVENT));
}
const subscribeShown = (cb: () => void) => {
  window.addEventListener(SHOWN_EVENT, cb);
  return () => window.removeEventListener(SHOWN_EVENT, cb);
};

/** Keeps this device's watch lists in step with the signed-in account. Mounted once in the app layout. */
export function WatchlistSync() {
  return (
    <AuthProvider>
      <Sync />
    </AuthProvider>
  );
}

function Sync() {
  const { status, user, authedFetch } = useAuth();
  const lists = useWatchLists();
  const [state, setState] = useState<State>("idle");
  const ready = useRef(false);
  const lastSaved = useRef<string>("");
  const uid = user?.uid;

  const save = async (next: WatchList[], keepalive = false) => {
    if (!uid) return;
    const json = JSON.stringify(next);
    if (json === lastSaved.current) return;
    setState("saving");
    try {
      const body = JSON.stringify({ lists: next });
      const small = new TextEncoder().encode(body).length < KEEPALIVE_MAX;
      const res = await authedFetch("/api/watchlists", { method: "PUT", headers: { "content-type": "application/json" }, body, keepalive: keepalive && small });
      if (!res.ok) throw new Error(String(res.status));
      // The server trims over-long lists; keep this device in step with what it stored.
      const stored = ((await res.json().catch(() => null)) as { lists?: WatchList[] } | null)?.lists ?? next;
      lastSaved.current = JSON.stringify(stored);
      writeSynced(uid, stored);
      // Adopt the stored copy only when the server actually cut lists or names;
      // its whitespace tidying must not rewrite a name that is still being typed.
      if (wasTrimmed(stored, next)) {
        writeLists(stored);
        setState("trimmed");
      } else setState("saved");
    } catch {
      setState("error");
    }
  };

  // On sign-in: pull the account's lists and merge them with this device's.
  useEffect(() => {
    ready.current = false;
    if (status !== "signed-in" || !uid) return;
    let alive = true;
    // Show progress while the first sync runs.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState("loading");
    void (async () => {
      try {
        const res = await authedFetch("/api/watchlists");
        if (!res.ok) throw new Error(String(res.status));
        const remote = ((await res.json()) as { lists: WatchList[] }).lists;
        if (!alive) return;
        const local = readLists();
        // Lists synced with a different account (a shared device) are that account's:
        // replace them with this account's lists instead of merging them in.
        const owner = readOwner();
        const merged = owner && owner !== uid ? remote : mergeLists(local, remote, readSynced(uid) === JSON.stringify(local));
        writeOwner(uid);
        lastSaved.current = JSON.stringify(remote);
        if (!sameLists(merged, local)) writeLists(merged);
        ready.current = true;
        if (sameLists(merged, remote)) {
          writeSynced(uid, merged);
          setState("saved");
        } else await save(merged);
      } catch {
        if (alive) setState("error");
      }
    })();
    return () => {
      alive = false;
    };
    // save/authedFetch change identity with the user; uid and status are the real triggers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, uid]);

  // After the first sync, save each change (debounced), and flush when the page hides.
  useEffect(() => {
    if (!ready.current) return;
    const t = window.setTimeout(() => void save(lists), 800);
    // "hidden" fires while the page is still alive (tab switch, app switch on phones),
    // so the token refresh in authedFetch can finish; pagehide is the last chance.
    const flush = () => void save(lists, true);
    const onVisibility = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);

  useEffect(() => publish({ auth: status, state }), [status, state]);
  return null;
}

/** "Saved to your account" / "Sign in to keep lists…" line for /watchlists. */
export function WatchlistSyncStatus() {
  const { auth, state } = useSyncExternalStore(subscribeShown, () => shown, () => shown);
  if (auth === "off" || auth === "loading") return null;
  if (auth === "signed-out")
    return (
      <p className="text-sm text-ink-muted">
        <Link href="/account" className="inline-flex min-h-tap items-center font-semibold text-primary">
          Sign in
        </Link>{" "}
        to keep watch lists on all your devices.
      </p>
    );
  return (
    <p className="text-sm text-ink-muted" aria-live="polite">
      {state === "loading"
        ? "Syncing with your account…"
        : state === "saving"
          ? "Saving…"
          : state === "error"
            ? "Couldn't sync with your account. Changes are kept on this device."
            : state === "trimmed"
              ? `Saved to your account, trimmed to ${SYNC_LIMITS.lists} lists of ${SYNC_LIMITS.athletes} names.`
              : "Saved to your account."}
    </p>
  );
}
