/**
 * localStorage that never throws: private modes, blocked site data and quota
 * errors read as "nothing stored" and writes are dropped.
 */
export function storageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Returns false when the browser refused the write. */
export function storageSet(key: string, value: string | null): boolean {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/** Parsed JSON, or null when missing or unreadable. Callers still check the shape. */
export function storageJson(key: string): unknown {
  const raw = storageGet(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}
