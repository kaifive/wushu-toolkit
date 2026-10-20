"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Re-fetch the server-rendered page every `seconds` while the tab is visible (live events only). */
export function LiveRefresh({ seconds }: { seconds: number }) {
  const router = useRouter();
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, seconds * 1000);
    return () => window.clearInterval(id);
  }, [router, seconds]);
  return null;
}
