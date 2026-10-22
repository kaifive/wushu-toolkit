"use client";

/**
 * A light tap of feedback on supported phones. Android uses the Vibration
 * API. iPhones have no vibration API, but Safari (iOS 17.4+) plays the
 * system haptic when a `<input type="checkbox" switch>` is toggled through
 * its label, so a hidden one is clicked instead. Does nothing elsewhere, and
 * never throws. Call it from a tap handler (browsers ignore it otherwise).
 */
let iosLabel: HTMLLabelElement | null = null;

export function haptic(kind: "tap" | "success" = "tap") {
  if (typeof window === "undefined") return;
  try {
    if (typeof navigator.vibrate === "function" && !/iP(hone|ad|od)/.test(navigator.userAgent)) {
      navigator.vibrate(kind === "success" ? [10, 40, 10] : 8);
      return;
    }
    if (!window.matchMedia?.("(pointer: coarse)").matches) return;
    if (!iosLabel) {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.setAttribute("switch", "");
      input.id = "wt-haptic";
      input.tabIndex = -1;
      input.setAttribute("aria-hidden", "true");
      iosLabel = document.createElement("label");
      iosLabel.htmlFor = input.id;
      iosLabel.setAttribute("aria-hidden", "true");
      for (const el of [input, iosLabel]) Object.assign(el.style, { position: "fixed", left: "-9999px", width: "1px", height: "1px", opacity: "0", pointerEvents: "none" });
      document.body.append(input, iosLabel);
    }
    iosLabel.click();
  } catch {
    // Haptics are a nicety; never break the tap that asked for one.
  }
}
