"use client";

import { useEffect, useState } from "react";
import { storageSet } from "@/lib/storage";

const KEY = "wt:theme";
const EVENT = "wt:theme";
type Theme = "light" | "dark";

/** Inline script for <head>: applies a saved choice before paint. */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("${KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
const current = (): Theme => {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : systemDark() ? "dark" : "light";
};

/** Light/dark switch. Follows the system until tapped, then remembers the choice. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Read the theme the head script applied (client only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(current());
    mq.addEventListener("change", onChange);
    // Other toggles on the page (sidebar and phone header) flip together.
    window.addEventListener(EVENT, onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener(EVENT, onChange);
    };
  }, []);

  const flip = () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    storageSet(KEY, next); // if storage is blocked the choice lasts until reload
    setTheme(next);
    window.dispatchEvent(new Event(EVENT));
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={flip}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className={`flex h-11 w-11 items-center justify-center rounded-card text-chrome-ink/85 hover:bg-white/[0.07] hover:text-white ${className}`}
    >
      {/* Before mount the icon is hidden so server and client markup match. */}
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${theme ? "" : "invisible"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
}
