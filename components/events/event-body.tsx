import { notFound } from "next/navigation";
import type { EventData } from "@/lib/domain/types";
import { loadEvent, type LoadedEvent } from "@/lib/events/load";
import type { EventView } from "@/lib/events/types";
import { DataStatus, GENDER_GAP, LoadError } from "./data-status";
import { GatedEventView } from "./gated-event-view";
import { WatchLegend } from "@/components/watchlist/legend";
import { LiveRefresh } from "./live-refresh";
import { ExportProvider } from "@/components/export/export-buttons";

type Ok = Extract<LoadedEvent, { state: "ok" }>;

/** Loads the event for a view page and handles not-found, gated and error states. */
export async function EventBody({
  slug,
  view,
  children,
}: {
  slug: string;
  view: EventView;
  children: (loaded: Ok, data: EventData) => React.ReactNode;
}) {
  const loaded = await loadEvent(slug);
  if (!loaded || !loaded.event.views.includes(view)) notFound();
  if (loaded.state === "gated") {
    const e = loaded.event;
    return <GatedEventView slug={e.slug} view={view} eventName={e.name} rulesetId={e.rulesetId} highlights={e.highlights} refreshSeconds={e.revalidate ?? 60} timeZone={e.timeZone} />;
  }
  if (loaded.state === "error") return <LoadError error={loaded.error} />;
  const e = loaded.event;
  return (
    <ExportProvider slug={e.slug} eventName={e.name} rulesetId={e.rulesetId}>
      {loaded.event.status === "live" && <LiveRefresh seconds={loaded.event.revalidate ?? 60} />}
      {/* The schedule doesn't split by gender, so a missing gender hides nothing there. */}
      <DataStatus data={loaded.data} timeZone={loaded.event.timeZone} genderGap={GENDER_GAP[view]} />
      <WatchLegend />
      {children(loaded, loaded.data)}
    </ExportProvider>
  );
}

export function viewParams(view: EventView, configs: { slug: string; views: EventView[] }[]) {
  return configs.filter((e) => e.views.includes(view)).map((e) => ({ slug: e.slug }));
}
