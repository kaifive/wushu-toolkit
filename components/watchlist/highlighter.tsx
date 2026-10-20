"use client";

import { useEffect } from "react";
import { findWatch } from "@/lib/watchlist/match";
import { useWatchLists } from "@/lib/watchlist/store";

/**
 * Colors every element marked data-athlete="<name>" that matches an enabled
 * watch list. Runs on all app pages and re-runs when the DOM or lists change,
 * so client-rendered (paid) views are covered too.
 */
export function WatchlistHighlighter() {
  const lists = useWatchLists();
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll<HTMLElement>("[data-athlete]").forEach((el) => {
        const hit = findWatch(lists, el.dataset.athlete ?? "");
        if (hit) {
          el.dataset.watch = hit.name;
          el.style.setProperty("--watch", hit.color);
          el.title = `${hit.name} watch list`;
        } else if (el.dataset.watch !== undefined) {
          delete el.dataset.watch;
          el.style.removeProperty("--watch");
          el.removeAttribute("title");
        }
      });
      window.dispatchEvent(new Event("wt:watch-applied"));
    };
    apply();
    let queued = false;
    const obs = new MutationObserver((records) => {
      if (queued || !records.some((r) => r.addedNodes.length)) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        apply();
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [lists]);
  return null;
}
