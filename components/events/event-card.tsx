import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon, LockIcon } from "@/components/ui/icons";
import { formatEventDates, requiresEntitlement } from "@/lib/events/registry";
import type { EventConfig } from "@/lib/events/types";

const STATUS = { live: ["seal", "Live"], upcoming: ["gold", "Upcoming"], archived: ["neutral", "Archive"] } as const;

export function EventCard({ event }: { event: EventConfig }) {
  const [tone, label] = STATUS[event.status];
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 transition hover:border-seal/50"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Badge tone={tone}>{label}</Badge>
          {requiresEntitlement(event) && (
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <LockIcon className="h-3.5 w-3.5" /> Pass required
            </span>
          )}
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{event.name}</h3>
        <p className="text-sm text-ink-muted">
          {formatEventDates(event)}
          {event.location ? ` · ${event.location}` : ""}
        </p>
      </div>
      <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted group-hover:text-seal" />
    </Link>
  );
}
