import type { AthleteIndex } from "@/lib/watchlist/suggest";

let indexPromise: Promise<AthleteIndex> | null = null;

/** Athletes from past competitions (/api/athletes), fetched once per page load. */
export const loadAthleteIndex = () =>
  (indexPromise ??= fetch("/api/athletes")
    .then((r) => (r.ok ? (r.json() as Promise<AthleteIndex>) : { athletes: [] }))
    .catch(() => ({ athletes: [] })));
