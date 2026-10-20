import { notFound } from "next/navigation";
import type { EventData } from "@/lib/domain/types";
import { loadEvent, type LoadedEvent } from "@/lib/events/load";
import type { EventView } from "@/lib/events/types";
import { DataStatus, Disclaimer, LoadError } from "./data-status";
import { GatedEventView } from "./gated-event-view";
import { WatchLegend } from "@/components/watchlist/legend";
import { LiveRefresh } from "./live-refresh";

type Ok = Extract<LoadedEvent, { state: "ok" }>;

/** Loads the event for a view page and handles not-found, gated and error states. */
export async function EventBody({
  slug,
  view,
  children,
}: {
  slug: string;
  view: EventView | "overview";
  children: (loaded: Ok, data: EventData) => React.ReactNode;
}) {
  const loaded = await loadEvent(slug);
  if (!loaded || (view !== "overview" && !loaded.event.views.includes(view))) notFound();
  if (loaded.state === "gated") {
    if (view === "overview") return null;
    const e = loaded.event;
    return <GatedEventView slug={e.slug} view={view} eventName={e.name} rulesetId={e.rulesetId} highlights={e.highlights} refreshSeconds={e.revalidate ?? 60} />;
  }
  if (loaded.state === "error") return <LoadError error={loaded.error} />;
  return (
    <>
      {loaded.event.status === "live" && <LiveRefresh seconds={loaded.event.revalidate ?? 60} />}
      {view !== "overview" && <DataStatus data={loaded.data} />}
      {view !== "overview" && <WatchLegend />}
      {children(loaded, loaded.data)}
      <Disclaimer />
    </>
  );
}

export function viewParams(view: EventView, configs: { slug: string; views: EventView[] }[]) {
  return configs.filter((e) => e.views.includes(view)).map((e) => ({ slug: e.slug }));
}
