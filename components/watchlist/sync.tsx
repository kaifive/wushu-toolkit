"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { SIGNED_IN_EVENT, SIGNED_IN_KEY, useAuth } from "@/components/auth/auth-provider";
import { authConfigured } from "@/lib/auth/client";
import type { WatchList } from "@/lib/watchlist/match";
import { readLists, useWatchLists, writeLists } from "@/lib/watchlist/store";
import { storageGet, storageSet } from "@/lib/storage";
import { mergeLists, sameLists, SYNC_LIMITS } from "@/lib/watchlist/sync";

/**
 * Account sync for watch lists (ADR-009). <WatchlistSync/> runs once per page
 * in the app layout, and only on devices that have signed in, so anonymous
 * visitors never load Firebase. <WatchlistSyncStatus/> shows its state on
 * /watchlists.
 */

/** Which account this device's lists were last synced with. */
const OWNER_KEY = "wt:watchlists:owner";
/** What was last saved to the account, per user, to tell local edits from stale copies. */
const syncedKey = (uid: string) => `wt:watchlists:synced:${uid}`;
/** Browsers drop keepalive requests with bodies over 64 KB. */
const KEEPALIVE_MAX = 60_000;

type State = "loading" | "saving" | "saved" | "trimmed" | "error";

const wasTrimmed = (stored: WatchList[], sent: WatchList[]) =>
  stored.length !== sent.length || stored.some((l, i) => l.athletes.length !== sent[i]?.athletes.length);

// ------------------------------------------------------------------ shared status

let state: State = "loading";
const STATE_EVENT = "wt:watchlist-sync";
function publish(next: State) {
  if (next === state) return;
  state = next;
  window.dispatchEvent(new Event(STATE_EVENT));
}
const subscribeState = (cb: () => void) => {
  window.addEventListener(STATE_EVENT, cb);
  return () => window.removeEventListener(STATE_EVENT, cb);
};

const signedInHere = () => storageGet(SIGNED_IN_KEY) === "1";
const subscribeSignedIn = (cb: () => void) => {
  window.addEventListener(SIGNED_IN_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(SIGNED_IN_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
const useSignedInHere = () => useSyncExternalStore(subscribeSignedIn, signedInHere, () => false);

// ------------------------------------------------------------------ sync

export function WatchlistSync() {
  return useSignedInHere() ? <Sync /> : null;
}

function Sync() {
  const { status, user, authedFetch } = useAuth();
  const lists = useWatchLists();
  const uid = status === "signed-in" ? user?.uid : undefined;
  // Latest values for the async loop below.
  const fetchRef = useRef(authedFetch);
  useEffect(() => {
    fetchRef.current = authedFetch;
  }, [authedFetch]);

  /** One save at a time; edits made meanwhile are sent next, newest wins. */
  const saver = useRef<{ busy: boolean; next: WatchList[] | null; sent: string; ready: boolean }>({ busy: false, next: null, sent: "", ready: false });

  const saveLoop = async (forUid: string, keepalive = false) => {
    const s = saver.current;
    if (s.busy) return;
    s.busy = true;
    try {
      while (s.next) {
        const next = s.next;
        s.next = null;
        const json = JSON.stringify(next);
        if (json === s.sent) continue;
        publish("saving");
        const body = JSON.stringify({ lists: next });
        const small = new TextEncoder().encode(body).length < KEEPALIVE_MAX;
        const res = await fetchRef.current("/api/watchlists", { method: "PUT", headers: { "content-type": "application/json" }, body, keepalive: keepalive && small }).catch(() => null);
        if (!res?.ok) {
          publish("error");
          s.next ??= next; // try again with the next change or flush
          break;
        }
        // The server trims over-long lists; adopt its copy only when it really cut something
        // (its whitespace tidying must not rewrite a name still being typed).
        const stored = ((await res.json().catch(() => null)) as { lists?: WatchList[] } | null)?.lists ?? next;
        const kept = wasTrimmed(stored, next) ? stored : next;
        s.sent = JSON.stringify(kept);
        storageSet(syncedKey(forUid), s.sent);
        if (kept !== next && !s.next) {
          writeLists(kept);
          publish("trimmed");
        } else publish("saved");
      }
    } finally {
      s.busy = false;
    }
  };

  // On sign-in: pull the account's lists (retrying until it works) and merge.
  useEffect(() => {
    const s = saver.current;
    s.ready = false;
    s.sent = "";
    if (!uid) return;
    let alive = true;
    let wake: () => void = () => {};
    const onOnline = () => wake();
    window.addEventListener("online", onOnline);
    publish("loading");
    void (async () => {
      for (let attempt = 0; alive; attempt++) {
        const res = await fetchRef.current("/api/watchlists").catch(() => null);
        if (!alive) return;
        const remote = res?.ok ? (((await res.json().catch(() => null)) as { lists?: WatchList[] } | null)?.lists ?? null) : null;
        if (remote) {
          const local = readLists();
          // Lists synced with a different account (a shared device) are that
          // account's: take this account's lists instead of merging them in.
          const owner = storageGet(OWNER_KEY);
          const merged = owner && owner !== uid ? remote : mergeLists(local, remote, storageGet(syncedKey(uid)) === JSON.stringify(local));
          storageSet(OWNER_KEY, uid);
          s.sent = JSON.stringify(remote);
          s.ready = true;
          if (!sameLists(merged, local)) writeLists(merged);
          if (sameLists(merged, remote)) {
            storageSet(syncedKey(uid), s.sent);
            publish("saved");
          } else {
            s.next = merged;
            void saveLoop(uid);
          }
          return;
        }
        publish("error");
        // Back off (2s, 5s, 15s, then every minute); coming back online retries at once.
        await new Promise<void>((r) => {
          const t = window.setTimeout(r, [2000, 5000, 15000][attempt] ?? 60000);
          wake = () => {
            window.clearTimeout(t);
            r();
          };
        });
      }
    })();
    return () => {
      alive = false;
      wake();
      window.removeEventListener("online", onOnline);
    };
  }, [uid]);

  // After the first pull, queue each change (debounced) and flush when the page hides.
  useEffect(() => {
    const s = saver.current;
    if (!uid || !s.ready) return;
    const queue = (keepalive = false) => {
      s.next = lists;
      void saveLoop(uid, keepalive);
    };
    const t = window.setTimeout(() => queue(), 800);
    // "hidden" fires while the page is still alive (tab or app switch); pagehide is the last chance.
    const onVisibility = () => document.visibilityState === "hidden" && queue(true);
    const onPageHide = () => queue(true);
    // A save that failed offline goes out when the connection returns.
    const onOnline = () => s.next && void saveLoop(uid);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("online", onOnline);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("online", onOnline);
    };
  }, [lists, uid]);

  return null;
}

// ------------------------------------------------------------------ status line

/** "Saved to your account" / "Sign in to keep lists…" for /watchlists. */
export function WatchlistSyncStatus() {
  const signedIn = useSignedInHere();
  const current = useSyncExternalStore(subscribeState, () => state, () => state);
  if (!authConfigured()) return null;
  if (!signedIn)
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
      {current === "loading"
        ? "Syncing with your account…"
        : current === "saving"
          ? "Saving…"
          : current === "error"
            ? "Couldn't reach your account. Changes are kept on this device and will sync when it's back."
            : current === "trimmed"
              ? `Saved to your account, trimmed to ${SYNC_LIMITS.lists} lists of ${SYNC_LIMITS.athletes} names.`
              : "Saved to your account."}
    </p>
  );
}
