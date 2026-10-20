"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { PRIMARY_NAV, isActive } from "@/lib/nav";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex min-h-tap items-center" aria-label="Wushu Toolkit home">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.filter((i) => i.href !== "/").map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-tap items-center rounded-lg px-3 text-sm font-medium ${
                      active ? "bg-seal-soft text-seal" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
