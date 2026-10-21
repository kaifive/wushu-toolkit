"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VIEW_LABEL } from "@/lib/events/labels";
import type { EventView } from "@/lib/events/types";

export function EventNav({ slug, views }: { slug: string; views: EventView[] }) {
  const pathname = usePathname() ?? "";
  const items = [{ href: `/events/${slug}`, label: "Overview" }, ...views.map((v) => ({ href: `/events/${slug}/${v}`, label: VIEW_LABEL[v] }))];
  return (
    <nav aria-label="Event sections" className="-mx-4 mt-3 overflow-x-auto px-4 md:-mx-8 md:px-8">
      <ul className="flex gap-1">
        {items.map((i) => {
          const active = pathname === i.href;
          return (
            <li key={i.href}>
              <Link
                href={i.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-tap items-center whitespace-nowrap border-b-2 px-3 text-[15px] font-semibold ${
                  active ? "border-primary text-ink" : "border-transparent text-ink-muted hover:text-ink"
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
