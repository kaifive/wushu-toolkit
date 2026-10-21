"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/brand/logo";
import { ThemeToggle } from "./theme-toggle";

export interface SidebarGroup {
  title?: string;
  items: { href: string; label: string; badge?: string; exact?: boolean }[];
}

/** Desktop navigation in v1's dark sidebar style: every tool and competition one click away. */
export function Sidebar({ groups }: { groups: SidebarGroup[] }) {
  const pathname = usePathname() ?? "/";
  const active = (href: string, exact?: boolean) => (href === "/" || exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`));
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-chrome text-chrome-ink md:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-white/10 pl-5 pr-3">
        <Link href="/" className="flex min-h-tap flex-1 items-center gap-2.5">
          <LogoMark className="h-8 w-8" aria-hidden />
          <span className="font-display text-xl font-bold">Wushu Toolkit</span>
        </Link>
        <ThemeToggle />
      </div>
      <nav aria-label="Primary" className="flex-1 overflow-y-auto py-3">
        {groups.map((g, i) => (
          <div key={g.title ?? i} className="mb-2">
            {g.title && <p className="px-5 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-chrome-muted">{g.title}</p>}
            <ul>
              {g.items.map((item) => {
                const on = active(item.href, item.exact);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={on ? "page" : undefined}
                      className={`flex min-h-tap items-center justify-between gap-2 border-l-[3px] px-5 text-[15px] ${
                        on ? "border-primary bg-white/[0.07] text-white" : "border-transparent text-chrome-ink/80 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {item.badge && <span className="rounded bg-seal px-1.5 text-[11px] font-bold uppercase text-white">{item.badge}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
