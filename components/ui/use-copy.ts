"use client";

import { useState } from "react";

/**
 * Copy text to the clipboard. `copied` holds the label of what was just copied
 * for 2s, or "blocked" when the browser refused.
 */
export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string, label = "all") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
    } catch {
      setCopied("blocked");
    }
    window.setTimeout(() => setCopied(null), 2000);
  };
  return { copied, copy };
}

/** Swap item i with its neighbour in direction d; returns the same list when out of range. */
export function moveItem<T>(list: T[], i: number, d: -1 | 1): T[] {
  const j = i + d;
  if (i < 0 || i >= list.length || j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j]!, next[i]!];
  return next;
}
