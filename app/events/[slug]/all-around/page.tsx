import type { Metadata } from "next";
import { AllAroundTable, Champions } from "@/components/events/all-around-view";
import { EventBody, viewParams } from "@/components/events/event-body";
import { Tabs } from "@/components/ui/tabs";
import { EVENT_CONFIGS } from "@/content/events";
import { getEvent } from "@/lib/events/registry";
import { allAroundModel, GENDERS, highlightMap } from "@/lib/events/views";

export const revalidate = 60;
export const generateStaticParams = () => viewParams("all-around", EVENT_CONFIGS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEvent((await params).slug);
  return { title: e ? `All-around · ${e.shortName}` : "All-around" };
}

export default async function AllAroundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <EventBody slug={slug} view="all-around">
      {({ event, ruleset }, data) => {
        const model = allAroundModel(data, ruleset);
        if (!model) return <p className="text-sm text-ink-muted">This event has no all-around award.</p>;
        const hl = highlightMap(event.highlights);
        return (
          <Tabs
            label="View"
            param="view"
            tabs={[...GENDERS, { id: "champions", label: "Champions" }]}
            panels={[
              ...GENDERS.map((g) => <AllAroundTable key={g.id} athletes={model.standings[g.id]} topN={model.topN} highlights={hl} />),
              <Champions key="champions" model={model} />,
            ]}
          />
        );
      }}
    </EventBody>
  );
}
