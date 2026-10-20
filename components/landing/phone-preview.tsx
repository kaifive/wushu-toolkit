import { Badge, TeamBadge } from "@/components/ui/badge";

const ROWS = [
  { r: 1, n: "A. Chen", d: "Changquan", s: "18.962", t: "A" as const },
  { r: 2, n: "M. Ortiz", d: "Taijiquan", s: "18.910", t: "A" as const },
  { r: 3, n: "J. Park", d: "Changquan", s: "18.874", t: "B" as const },
  { r: 4, n: "S. Li", d: "Nanquan", s: "18.801", t: "A" as const },
  { r: 5, n: "K. Wu", d: "Nanquan", s: "18.650", t: "B" as const },
];

/** Static illustration of the standings screen, with sample names. */
export function PhonePreview() {
  return (
    <div aria-hidden className="mx-auto w-[17rem] rounded-[2.2rem] border-[10px] border-ink bg-paper p-3 shadow-2xl">
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-line" />
      <div className="flex items-center gap-2">
        <Badge tone="seal">Live</Badge>
        <span className="text-[10px] text-ink-muted">Updated 12s ago</span>
      </div>
      <p className="mt-1 font-display text-sm font-semibold">Junior Trials · Group A</p>
      <div className="mt-2 flex gap-1 rounded-lg bg-line/50 p-0.5 text-[10px] font-semibold">
        <span className="flex-1 rounded-md bg-surface py-1 text-center">Male</span>
        <span className="flex-1 py-1 text-center text-ink-muted">Female</span>
      </div>
      <ol className="mt-2 divide-y divide-line rounded-lg border border-line bg-surface text-[11px]">
        {ROWS.map((x) => (
          <li key={x.r} className="flex items-center gap-2 px-2 py-1.5">
            <span className="w-3 text-ink-muted">{x.r}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{x.n}</span>
              <span className="block text-[9px] text-ink-muted">{x.d}</span>
            </span>
            <span className="scale-75">
              <TeamBadge team={x.t} />
            </span>
            <span className="font-semibold tabular-nums">{x.s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-2 rounded-lg border border-line bg-surface p-2 text-[10px]">
        <p className="font-semibold">Needed to make A team</p>
        <p className="text-ink-muted">J. Park needs 9.087 in Jianshu</p>
      </div>
    </div>
  );
}
