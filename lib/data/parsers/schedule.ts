import { clean } from "@/lib/domain/names";
import type { ScheduleBlock, ScheduleEntry } from "@/lib/domain/types";

export interface ScheduleColumns {
  time: number;
  firstName: number;
  lastName: number;
  event: number;
  experience?: number;
  score?: number;
}

const at = (cols: string[], i: number | undefined) => (i === undefined ? "" : clean(cols[i]));

/**
 * Parse a ring schedule from CSV rows into sessions and breaks. Data starts
 * after the header row whose first-name column says "First Name". A break is
 * a row with text in the time column and no athlete or event.
 */
export function parseScheduleRows(rows: string[][], c: ScheduleColumns): ScheduleBlock[] {
  const headerIdx = rows.findIndex((cols) => at(cols, c.firstName).toLowerCase() === "first name");
  const body = headerIdx === -1 ? rows : rows.slice(headerIdx + 1);
  const blocks: ScheduleBlock[] = [];
  let current: ScheduleEntry[] = [];

  const flush = () => {
    if (!current.length) return;
    blocks.push({ type: "session", start: current[0]!.time, end: current[current.length - 1]!.time, entries: current });
    current = [];
  };

  for (const cols of body) {
    const time = at(cols, c.time);
    const first = at(cols, c.firstName);
    const last = at(cols, c.lastName);
    const event = at(cols, c.event);
    if (time && !first && !last && !event) {
      flush();
      blocks.push({ type: "break", label: time });
    } else if (first || last || event) {
      current.push({
        time,
        athleteName: clean(`${first} ${last}`),
        event,
        experience: at(cols, c.experience) || undefined,
        score: at(cols, c.score) || undefined,
      });
    }
  }
  flush();
  return blocks;
}
