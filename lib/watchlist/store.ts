"use client";

import { useSyncExternalStore } from "react";
import type { WatchList } from "./match";

/** Watch lists live in this browser only (localStorage), shared across tabs. */
const KEY = "wt:watchlists:v1";
const EVENT = "wt:watchlists";
const EMPTY: WatchList[] = [];

let cache: { raw: string | null; lists: WatchList[] } = { raw: null, lists: EMPTY };

export function readLists(): WatchList[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cache.lists; // storage blocked: in-memory lists from writeLists
  }
  if (raw === cache.raw) return cache.lists;
  let lists: WatchList[] = EMPTY;
  try {
    const parsed = raw ? (JSON.parse(raw) as { lists?: WatchList[] }) : null;
    if (Array.isArray(parsed?.lists)) lists = parsed.lists;
  } catch {
    /* corrupt value: start empty */
  }
  cache = { raw, lists };
  return lists;
}

export function writeLists(lists: WatchList[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ lists }));
  } catch {
    /* storage blocked: changes last until reload */
    cache = { raw: cache.raw, lists };
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useWatchLists(): WatchList[] {
  return useSyncExternalStore(subscribe, readLists, () => EMPTY);
}

export const newId = () => Math.random().toString(36).slice(2, 10);
