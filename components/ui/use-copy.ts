"use client";

import { haptic } from "@/lib/haptics";
import { useRef, useState } from "react";

/**
 * Copy text to the clipboard. `copied` holds the label of what was just copied
 * for 2s, or "blocked" when the browser refused.
 */
export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const copy = async (text: string, label = "all") => {
    haptic("success"); // during the tap: iOS ignores it after an await
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
    } catch {
      setCopied("blocked");
    }
    // A new copy restarts the 2s label instead of an older timer clearing it early.
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 2000);
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
