import "server-only";
import { cache } from "react";
import type { EventData } from "@/lib/domain/types";
import { getRuleset, type Ruleset } from "@/lib/rules";
import { getEvent, requiresEntitlement } from "./registry";
import type { EventConfig } from "./types";

export type LoadedEvent =
  | { event: EventConfig; ruleset: Ruleset; state: "ok"; data: EventData }
  | { event: EventConfig; ruleset: Ruleset; state: "gated" }
  | { event: EventConfig; ruleset: Ruleset; state: "error"; error: string };

/** Load an event for a server page. Paid live events return "gated"; data is fetched client-side after auth. */
export const loadEvent = cache(async (slug: string): Promise<LoadedEvent | null> => {
  const event = getEvent(slug);
  if (!event) return null;
  const ruleset = getRuleset(event.rulesetId);
  if (requiresEntitlement(event)) return { event, ruleset, state: "gated" };
  try {
    const data = await event.data().load({ revalidate: event.revalidate ?? 3600 });
    return { event, ruleset, state: "ok", data };
  } catch (err) {
    return { event, ruleset, state: "error", error: err instanceof Error ? err.message : String(err) };
  }
});
