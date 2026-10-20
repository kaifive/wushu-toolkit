import { Notice } from "@/components/ui/notice";
import { Tabs } from "@/components/ui/tabs";
import type { EventData } from "@/lib/domain/types";
import type { AthleteHighlight, EventView } from "@/lib/events/types";
import { allAroundModel, GENDERS, highlightMap, resultsByEvent, scorecards, selectionModel } from "@/lib/events/views";
import type { Ruleset } from "@/lib/rules";
import { AllAroundTable, Champions } from "./all-around-view";
import { OverallTable } from "./overall-table";
import { ResultsByEvent } from "./results-by-event";
import { ScheduleView } from "./schedule-view";
import { ScorecardCard } from "./scorecard";
import { TeamProjection } from "./team-projection";

/**
 * The body of each event view, as a pure function of ruleset + data. Used by
 * the static server pages and by GatedEventView after a paid fetch.
 */
export interface ViewProps {
  ruleset: Ruleset;
  data: EventData;
  highlights?: AthleteHighlight[];
}

export function StandingsBody({ ruleset, data, highlights }: ViewProps) {
  const models = selectionModel(data, ruleset);
  const results = resultsByEvent(data, ruleset);
  const hl = highlightMap(highlights);
  return (
    <Tabs
      label="Gender"
      param="gender"
      tabs={GENDERS}
      panels={GENDERS.map((g) => {
        const mine = models.filter((m) => m.gender === g.id);
        return (
          <div key={g.id} className="space-y-8">
            {mine.length > 0 && (
              <Tabs
                label="Division"
                param="division"
                tabs={mine.map((m) => ({ id: m.division.id, label: m.division.label }))}
                panels={mine.map((m) => (
                  <section key={m.division.id}>
                    <h2 className="mb-1 font-display text-lg font-semibold">Overall · {m.division.label}</h2>
                    <p className="mb-3 text-xs text-ink-muted">
                      {m.scored}/{m.total} routines scored. Bold scores count toward the total.
                    </p>
                    <OverallTable model={m} highlights={hl} />
                  </section>
                ))}
              />
            )}
            <section>
              <h2 className="mb-3 font-display text-lg font-semibold">Results by event</h2>
              <ResultsByEvent results={results.filter((r) => r.gender === g.id)} />
            </section>
          </div>
        );
      })}
    />
  );
}

export function TeamBody({ ruleset, data }: ViewProps) {
  const models = selectionModel(data, ruleset);
  return (
    <>
      {!ruleset.source.verified && (
        <div className="mb-4">
          <Notice tone="warn" title="Rules pending verification">
            Team math follows {ruleset.source.title}
            {ruleset.source.revision ? ` (${ruleset.source.revision})` : ""}, but some values haven&apos;t been checked against the official
            document yet. <a className="underline" href="/rules">See the rules</a>.
          </Notice>
        </div>
      )}
      <Tabs
        label="Gender"
        param="gender"
        tabs={GENDERS}
        panels={GENDERS.map((g) => {
          const mine = models.filter((m) => m.gender === g.id);
          if (!mine.length) return <p key={g.id} className="text-sm text-ink-muted">No athletes.</p>;
          return (
            <Tabs
              key={g.id}
              label="Division"
              param="division"
              tabs={mine.map((m) => ({ id: m.division.id, label: m.division.label }))}
              panels={mine.map((m) => <TeamProjection key={m.division.id} model={m} />)}
            />
          );
        })}
      />
    </>
  );
}

export function ScorecardsBody({ data }: ViewProps) {
  const rows = scorecards(data);
  return (
    <Tabs
      label="Gender"
      param="gender"
      tabs={GENDERS}
      panels={GENDERS.map((g) => {
        const mine = rows.filter((r) => r.gender === g.id);
        return (
          <div key={g.id} className="space-y-2">
            {mine.length ? mine.map((r) => <ScorecardCard key={`${r.athleteName}-${r.raw}`} row={r} />) : <p className="text-sm text-ink-muted">No scorecards.</p>}
          </div>
        );
      })}
    />
  );
}

const ringId = (ring: string) => ring.toLowerCase().replace(/\s+/g, "-");

export function ScheduleBody({ data, highlights }: ViewProps) {
  if (!data.schedules.length) return <p className="text-sm text-ink-muted">No schedule posted yet.</p>;
  const hl = highlightMap(highlights);
  return (
    <Tabs
      label="Ring"
      param="ring"
      tabs={data.schedules.map((s) => ({ id: ringId(s.ring), label: s.ring }))}
      panels={data.schedules.map((s) => <ScheduleView key={s.ring} schedule={s} highlights={hl} />)}
    />
  );
}

export function AllAroundBody({ ruleset, data, highlights }: ViewProps) {
  const model = allAroundModel(data, ruleset);
  if (!model) return <p className="text-sm text-ink-muted">This event has no all-around award.</p>;
  const hl = highlightMap(highlights);
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
}

export const VIEW_BODY: Record<EventView, (p: ViewProps) => React.ReactNode> = {
  standings: StandingsBody,
  team: TeamBody,
  scorecards: ScorecardsBody,
  schedule: ScheduleBody,
  "all-around": AllAroundBody,
};
