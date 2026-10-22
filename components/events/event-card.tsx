import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon, LockIcon } from "@/components/ui/icons";
import { formatEventDates, requiresEntitlement } from "@/lib/events/registry";
import type { EventConfig } from "@/lib/events/types";

// Only live and upcoming events get a badge; past ones need none.
const STATUS = { live: ["seal", "Live"], upcoming: ["gold", "Upcoming"], archived: null } as const;

/** One competition as a list row (sits inside a Card list). */
export function EventRow({ event }: { event: EventConfig }) {
  const status = STATUS[event.status];
  return (
    <Link href={`/events/${event.slug}`} className="group flex min-h-16 items-center gap-3 px-4 py-3 hover:bg-surface-2">
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 font-semibold">
          <span className="truncate">{event.name}</span>
          {requiresEntitlement(event) && <LockIcon className="h-4 w-4 shrink-0 text-ink-muted" aria-label="Pass required" />}
        </p>
        <p className="truncate text-sm text-ink-muted">
          {formatEventDates(event)}
          {event.location ? ` · ${event.location}` : ""}
        </p>
      </div>
      {status && <Badge tone={status[0]}>{status[1]}</Badge>}
      <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted group-hover:text-primary" />
    </Link>
  );
}
