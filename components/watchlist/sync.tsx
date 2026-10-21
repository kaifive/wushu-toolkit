"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AuthProvider, useAuth } from "@/components/auth/auth-provider";
import type { WatchList } from "@/lib/watchlist/match";
import { readLists, useWatchLists, writeLists } from "@/lib/watchlist/store";
import { mergeLists, sameLists } from "@/lib/watchlist/sync";

/** What was last saved to the account, per user, to tell local edits from stale copies. */
const syncedKey = (uid: string) => `wt:watchlists:synced:${uid}`;
const readSynced = (uid: string) => {
  try {
    return window.localStorage.getItem(syncedKey(uid));
  } catch {
    return null;
  }
};
const writeSynced = (uid: string, lists: WatchList[]) => {
  try {
    window.localStorage.setItem(syncedKey(uid), JSON.stringify(lists));
  } catch {
    /* storage blocked */
  }
};

type State = "idle" | "loading" | "saving" | "saved" | "error";

/** Keeps this device's watch lists in step with the signed-in account. */
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
      const res = await authedFetch("/api/watchlists", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ lists: next }), keepalive });
      if (!res.ok) throw new Error(String(res.status));
      lastSaved.current = json;
      writeSynced(uid, next);
      setState("saved");
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
        const merged = mergeLists(local, remote, readSynced(uid) === JSON.stringify(local));
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
    const flush = () => void save(lists, true);
    window.addEventListener("pagehide", flush);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pagehide", flush);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);

  if (status === "off" || status === "loading") return null;
  if (status === "signed-out")
    return (
      <p className="text-sm text-ink-muted">
        <Link href="/account" className="font-semibold text-primary">
          Sign in
        </Link>{" "}
        to keep watch lists on all your devices.
      </p>
    );
  return (
    <p className="text-sm text-ink-muted" aria-live="polite">
      {state === "loading" ? "Syncing with your account…" : state === "saving" ? "Saving…" : state === "error" ? "Couldn't sync with your account. Changes are kept on this device." : "Saved to your account."}
    </p>
  );
}
