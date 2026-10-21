import type { AthleteIndex } from "@/lib/watchlist/suggest";

let indexPromise: Promise<AthleteIndex> | null = null;

/** Athletes from past competitions (/api/athletes), fetched once per page load; a failed load is retried next time. */
export const loadAthleteIndex = () =>
  (indexPromise ??= fetch("/api/athletes")
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json() as Promise<AthleteIndex>;
    })
    .catch(() => {
      indexPromise = null;
      return { athletes: [] };
    }));
