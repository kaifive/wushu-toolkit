"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EventView } from "@/lib/events/types";

export const VIEW_LABEL: Record<EventView, string> = {
  standings: "Standings",
  team: "Team",
  scorecards: "Scorecards",
  schedule: "Schedule",
  "all-around": "All-around",
};

export function EventNav({ slug, views }: { slug: string; views: EventView[] }) {
  const pathname = usePathname() ?? "";
  const items = [{ href: `/events/${slug}`, label: "Overview" }, ...views.map((v) => ({ href: `/events/${slug}/${v}`, label: VIEW_LABEL[v] }))];
  return (
    <nav aria-label="Event sections" className="-mx-4 mb-6 overflow-x-auto border-b border-line px-4">
      <ul className="flex gap-1">
        {items.map((i) => {
          const active = pathname === i.href;
          return (
            <li key={i.href}>
              <Link
                href={i.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-tap items-center whitespace-nowrap border-b-2 px-3 text-sm font-semibold ${
                  active ? "border-seal text-ink" : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {i.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
