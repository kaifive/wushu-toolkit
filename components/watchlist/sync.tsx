"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SIGNED_IN_EVENT, SIGNED_IN_KEY, useAuth } from "@/components/auth/auth-provider";
import { authConfigured } from "@/lib/auth/client";
import type { WatchList } from "@/lib/watchlist/match";
import { readLists, useWatchLists, writeLists } from "@/lib/watchlist/store";
import { storageGet, storageJson, storageSet } from "@/lib/storage";
import { mergeLists, sameLists, sanitizeLists, sanitizeReport, SYNC_LIMITS } from "@/lib/watchlist/sync";

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

type State = "loading" | "saving" | "saved" | "trimmed" | "error" | "too-big" | "refused";

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

  /**
   * One save at a time; edits made meanwhile are sent next, newest wins.
   * sent: last stored; rejected: refused as too big; failed: last attempt that hit a network/server error.
   */
  const saver = useRef<{ busy: boolean; next: WatchList[] | null; sent: string; rejected: string; failed: string; cutHere: boolean }>({
    busy: false,
    next: null,
    sent: "",
    rejected: "",
    failed: "",
    cutHere: false,
  });
  // State (not a ref) so the change listeners below start once the first pull is done.
  const [ready, setReady] = useState(false);

  // Both read refs only, so they never change identity.
  const put = useCallback((lists: WatchList[], keepalive: boolean) => {
    const body = JSON.stringify({ lists });
    const small = new TextEncoder().encode(body).length < KEEPALIVE_MAX;
    return fetchRef.current("/api/watchlists", { method: "PUT", headers: { "content-type": "application/json" }, body, keepalive: keepalive && small }).catch(() => null);
  }, []);

  const saveLoop = useCallback(async function saveLoopRef(forUid: string, keepalive = false): Promise<void> {
    const s = saver.current;
    if (s.busy) {
      // The page is going away: the running save won't outlive it, so send the newest lists now.
      if (keepalive && s.next) void put(s.next, true);
      return;
    }
    s.busy = true;
    try {
      while (s.next) {
        const next = s.next;
        s.next = null;
        const json = JSON.stringify(next);
        if (json === s.sent) {
          if (state !== "trimmed") publish("saved"); // back in step (e.g. an edit was undone); keep a "shortened" note
          continue;
        }
        if (json === s.rejected) continue; // already refused as too big; wait for a real change
        publish("saving");
        s.failed = "";
        const res = await put(next, keepalive);
        if (res?.status === 413) {
          s.rejected = json;
          publish("too-big");
          break;
        }
        if (res && (res.status === 401 || res.status === 403)) {
          publish("refused"); // signed out or not allowed; auth handles the rest
          break;
        }
        if (!res?.ok) {
          s.failed = json;
          publish("error");
          s.next ??= next; // network or server trouble: retried when online or on the next change
          break;
        }
        // The server says whether it cut anything to fit the limits; only then adopt its copy
        // (its whitespace tidying must not rewrite a name still being typed).
        const reply = (await res.json().catch(() => null)) as { lists?: WatchList[]; trimmed?: boolean } | null;
        const kept = reply?.trimmed && reply.lists ? reply.lists : next;
        s.sent = JSON.stringify(kept);
        storageSet(syncedKey(forUid), s.sent);
        if (kept !== next && !s.next) {
          writeLists(kept);
          publish("trimmed");
        } else publish(s.cutHere ? "trimmed" : "saved");
        s.cutHere = false;
      }
    } finally {
      s.busy = false;
    }
    // Lists queued while that save ran (and differ from what was refused) go out now.
    // (Never the same lists that just failed: those wait for "online", hide or the next edit.)
    const s2 = saver.current;
    const pending = s2.next && JSON.stringify(s2.next);
    if (pending && pending !== s2.rejected && pending !== s2.sent && pending !== s2.failed) void saveLoopRef(forUid);
  }, [put]);

  // On sign-in: pull the account's lists (retrying until it works) and merge.
  useEffect(() => {
    const s = saver.current;
    // Starting over for this account (state reset is the effect's job here).
    setReady(false);
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
        if (res && (res.status === 401 || res.status === 403)) {
          // Not a passing blip (signed out elsewhere, no access): stop.
          publish("refused");
          return;
        }
        // Canonical form (same keys and order as the base), whatever order the store returned.
        const remote = res?.ok ? sanitizeLists(((await res.json().catch(() => null)) as { lists?: unknown } | null)?.lists) : null;
        if (!alive) return;
        if (remote) {
          const local = readLists();
          const owner = storageGet(OWNER_KEY);
          const synced = storageGet(syncedKey(uid));
          const base = sanitizeLists(storageJson(syncedKey(uid)));
          // Lists synced with a different account (shared device) are that account's and are
          // replaced; lists made or changed here since then are kept and combined.
          // Compare in the server's canonical form (tidied names), like the base and remote.
          const localC = sanitizeLists(local) ?? [];
          // A list with an id the previous account had is theirs, edited or not: never copy it in.
          const prevAccount = owner && owner !== uid ? (sanitizeLists(storageJson(syncedKey(owner))) ?? []) : null;
          const ownHere = prevAccount ? localC.filter((l) => !prevAccount.some((p) => p.id === l.id)) : localC;
          // Whether lists that stay with this account had to be shortened (not the previous account's).
          const keptIds = new Set(ownHere.map((l) => l.id));
          const localReport = sanitizeReport(local.filter((l) => !prevAccount || keptIds.has(l.id)));
          const merged = prevAccount ? mergeLists(ownHere, remote, !ownHere.length) : mergeLists(localC, remote, synced === JSON.stringify(local), base);
          // Record the account's copy now (owner + base), before any save: if the save
          // fails, the next account on this device still knows these lists aren't its own.
          storageSet(OWNER_KEY, uid);
          s.sent = JSON.stringify(remote);
          storageSet(syncedKey(uid), s.sent);
          setReady(true);
          if (!sameLists(merged, local)) writeLists(merged);
          // This device's lists were over the account limits and got shortened: say so.
          s.cutHere = !!localReport?.cut;
          if (sameLists(merged, remote)) {
            publish(s.cutHere ? "trimmed" : "saved");
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
  }, [uid, saveLoop]);

  // After the first pull, queue each change (debounced) and flush when the page hides.
  useEffect(() => {
    const s = saver.current;
    if (!uid || !ready) return;
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
  }, [lists, uid, ready, saveLoop]);

  return null;
}

// ------------------------------------------------------------------ status line

const MESSAGE: Record<State, string> = {
  loading: "Syncing with your account…",
  saving: "Saving…",
  saved: "Saved to your account.",
  trimmed: `Saved to your account, shortened to fit (at most ${SYNC_LIMITS.lists} lists, ${SYNC_LIMITS.athletes} names each, ${SYNC_LIMITS.text} characters per name).`,
  error: "Couldn't reach your account. Changes are kept on this device and will sync when it's back.",
  "too-big": "These watch lists are too big to save to an account. They're kept on this device.",
  refused: "Your account didn't accept the sync. Sign in again to keep lists on all your devices.",
};

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
      {MESSAGE[current]}
    </p>
  );
}
