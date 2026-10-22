import { StatTile } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import type { EventData } from "@/lib/domain/types";
import type { AthleteHighlight, EventView } from "@/lib/events/types";
import { allAroundModel, athleteProfiles, GENDERS, highlighter, resultsByEvent, scorecards, selectionModel } from "@/lib/events/views";
import type { Ruleset } from "@/lib/rules";
import { ExportButtons } from "@/components/export/export-buttons";
import { AllAroundTable, Champions } from "./all-around-view";
import { OverallTable } from "./overall-table";
import { ResultsByEvent } from "./results-by-event";
import { ScheduleView } from "./schedule-view";
import { ScorecardList } from "./scorecard-list";
import { StatsView } from "./stats-view";
import { AthleteFinder } from "./athlete-finder";
import { TeamProjection } from "./team-projection";

/**
 * The body of each event view, as a pure function of ruleset + data. Used by
 * the static server pages and by GatedEventView after a paid fetch.
 */
export interface ViewProps {
  ruleset: Ruleset;
  data: EventData;
  highlights?: AthleteHighlight[];
  /** False for finished competitions (no "On the floor" marker). */
  live?: boolean;
  /** The event's scorecards page, when it has one: standings link each score there. */
  scorecardsHref?: string;
  /** The event's Athletes page, when it has one: names link there. */
  athletesHref?: string;
}

export function StandingsBody({ ruleset, data, highlights, scorecardsHref, athletesHref }: ViewProps) {
  const models = selectionModel(data, ruleset);
  const results = resultsByEvent(data, ruleset);
  const groups = results.filter((r) => !r.gender);
  const hl = highlighter(highlights);
  const scored = data.scores.filter((s) => s.finalScore != null);
  const avg = scored.length ? scored.reduce((t, s) => t + (s.finalScore ?? 0), 0) / scored.length : 0;
  return (
    <>
    <div className="mb-5 grid grid-cols-3 gap-3">
      <StatTile value={data.registrations.length} label="athletes" />
      <StatTile value={`${scored.length}/${data.scores.length}`} label="routines scored" progress={data.scores.length ? scored.length / data.scores.length : 0} />
      <StatTile value={scored.length ? avg.toFixed(3) : "—"} label="average score" progress={avg / 10} />
    </div>
    <Tabs
      label="Gender"
      param="gender"
      tabs={groups.length ? [...GENDERS, { id: "groups", label: "Groups" }] : GENDERS}
      panels={[...GENDERS.map((g) => {
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
                    <h2 className="mb-1 font-display text-lg font-bold">Overall · {m.division.label}</h2>
                    <p className="mb-3 text-xs text-ink-muted">
                      {m.scored}/{m.total} routines scored
                    </p>
                    <OverallTable model={m} highlights={hl} athletesHref={athletesHref} scorecardsHref={scorecardsHref} />
                    <ExportButtons target={{ kind: "overall", gender: m.gender, division: m.division.id }} className="mt-3" />
                  </section>
                ))}
              />
            )}
            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-bold">Results by Event</h2>
                <ExportButtons target={{ kind: "results", gender: g.id }} text="All Events" below />
              </div>
              <ResultsByEvent results={results.filter((r) => r.gender === g.id)} scorecardsHref={scorecardsHref} athletesHref={athletesHref} />
            </section>
          </div>
        );
      }),
      // Entries with no gender (group sets like a taiji group) get their own tab instead of being hidden.
      ...(groups.length
        ? [
            <section key="groups">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-bold">Results by Event</h2>
                <ExportButtons target={{ kind: "results" }} text="All Events" below />
              </div>
              <ResultsByEvent results={groups} scorecardsHref={scorecardsHref} athletesHref={athletesHref} />
            </section>,
          ]
        : []),
      ]}
    />
    </>
  );
}

export function TeamBody({ ruleset, data, highlights, athletesHref, scorecardsHref }: ViewProps) {
  const models = selectionModel(data, ruleset);
  const hl = highlighter(highlights);
  return (
    <>
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
              panels={mine.map((m) => <TeamProjection key={m.division.id} model={m} highlights={hl} athletesHref={athletesHref} scorecardsHref={scorecardsHref} />)}
            />
          );
        })}
      />
    </>
  );
}

export function ScorecardsBody({ data, highlights }: ViewProps) {
  const rows = scorecards(data);
  return (
    <Tabs
      label="Gender"
      param="gender"
      tabs={GENDERS}
      panels={GENDERS.map((g) => {
        return <ScorecardList key={g.id} rows={rows.filter((r) => r.gender === g.id)} highlights={highlights} />;
      })}
    />
  );
}

const ringId = (ring: string) => ring.toLowerCase().replace(/\s+/g, "-");

export function ScheduleBody({ data, highlights, live, scorecardsHref, athletesHref }: ViewProps) {
  if (!data.schedules.length) return <p className="text-sm text-ink-muted">No schedule posted yet.</p>;
  const hl = highlighter(highlights);
  return (
    <Tabs
      label="Ring"
      param="ring"
      tabs={data.schedules.map((s) => ({ id: ringId(s.ring), label: s.ring }))}
      panels={data.schedules.map((s) => <ScheduleView key={s.ring} schedule={s} highlights={hl} live={live} scorecardsHref={scorecardsHref} athletesHref={athletesHref} />)}
    />
  );
}

export function AllAroundBody({ ruleset, data, highlights, athletesHref }: ViewProps) {
  const model = allAroundModel(data, ruleset);
  if (!model) return <p className="text-sm text-ink-muted">This event has no all-around award.</p>;
  const hl = highlighter(highlights);
  return (
    <Tabs
      label="View"
      param="view"
      tabs={[...GENDERS, { id: "champions", label: "Champions" }]}
      panels={[
        ...GENDERS.map((g) => <AllAroundTable key={g.id} athletes={model.standings[g.id]} topN={model.topN} highlights={hl} athletesHref={athletesHref} />),
        <Champions key="champions" model={model} />,
      ]}
    />
  );
}

export function StatsBody({ data }: ViewProps) {
  return <StatsView data={data} />;
}

export function AthletesBody({ data, ruleset, scorecardsHref }: ViewProps) {
  return <AthleteFinder athletes={athleteProfiles(data, ruleset)} scorecardsHref={scorecardsHref} />;
}

export const VIEW_BODY: Record<EventView, (p: ViewProps) => React.ReactNode> = {
  standings: StandingsBody,
  team: TeamBody,
  scorecards: ScorecardsBody,
  stats: StatsBody,
  athletes: AthletesBody,
  schedule: ScheduleBody,
  "all-around": AllAroundBody,
};
