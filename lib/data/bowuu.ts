import type { Schedule, ScheduleEntry } from "@/lib/domain/types";
import { fetchText, source, type DataSource } from "./source";

/**
 * bowuu.com ring schedules (v1 read https://bowuu.com/v1/schedule/ring/<id>):
 * each ring lists its events in order, with every participant's lot order and
 * score once judged.
 */
interface BowuuParticipant {
  name: string;
  lotOrder: number | null;
  teamName?: string | null;
  score?: number | null;
}
interface BowuuEvent {
  eventName: string;
  ageGroupName?: string | null;
  gender?: string | null;
  startTime?: string | null;
  isComplete?: number | boolean;
  completeParticipants?: BowuuParticipant[];
  incompleteParticipants?: BowuuParticipant[];
}
export interface BowuuRing {
  schedule: { ringName: string; events: BowuuEvent[] };
}

const DAYS: Record<string, string> = { Sun: "Sunday", Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday" };

/** "Ring8 Sun, B-TJQ, …" -> "Ring 8 · Sunday". */
export function bowuuRingLabel(ringName: string): string {
  const m = ringName.match(/ring\s*(\d+)\s*(\w{3})?/i);
  if (!m) return ringName.trim();
  return `Ring ${m[1]}${m[2] && DAYS[m[2]] ? ` · ${DAYS[m[2]]}` : ""}`;
}

export function parseBowuuRing(json: BowuuRing): Schedule {
  const { ringName, events } = json.schedule;
  return {
    ring: bowuuRingLabel(ringName),
    blocks: events.map((e) => {
      const gender = e.gender === "M" ? "male" : e.gender === "F" ? "female" : undefined;
      const title = [e.eventName.replace(/\s+/g, " ").trim(), e.ageGroupName ? `Group ${e.ageGroupName}` : "", gender === "male" ? "Male" : gender === "female" ? "Female" : ""]
        .filter(Boolean)
        .join(" · ");
      const people = [...(e.completeParticipants ?? []), ...(e.incompleteParticipants ?? [])].sort((a, b) => (a.lotOrder ?? 999) - (b.lotOrder ?? 999));
      const entries: ScheduleEntry[] = people.map((p) => ({
        time: "",
        athleteName: p.name.replace(/\s*\([A-Z]{3}\)\s*$/, "").trim(),
        event: title,
        gender,
        score: typeof p.score === "number" && p.score > 0 ? p.score.toFixed(3) : undefined,
      }));
      return { type: "session" as const, title, start: e.startTime ?? "", end: "", entries };
    }),
  };
}

export function bowuuSchedule(ringIds: number[]): DataSource<Schedule[]> {
  return source("bowuu ring schedules", async (ctx) =>
    Promise.all(ringIds.map(async (id) => parseBowuuRing(JSON.parse(await fetchText(`https://bowuu.com/v1/schedule/ring/${id}`, ctx)) as BowuuRing))),
  );
}
