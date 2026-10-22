import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/events", label: "Competitions" },
  { href: "/tools", label: "Toolkit" },
  { href: "/watchlists", label: "Watch Lists" },
  { href: "/account", label: "Sign In" },
];

/** Landing page top bar. App pages use the sidebar instead. */
export function MarketingNav() {
  return (
    <header className="bg-chrome text-chrome-ink">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex min-h-tap items-center gap-2.5" aria-label="Wushu Toolkit home">
          <LogoMark className="h-8 w-8" aria-hidden />
          <span className="font-display text-xl font-bold">Wushu Toolkit</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            <li>
              <ThemeToggle />
            </li>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`inline-flex min-h-tap items-center rounded-card px-3 font-semibold ${
                    l.href === "/account" ? "ml-2 bg-primary text-primary-ink" : "text-chrome-ink/85 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle className="-mr-2 md:hidden" />
      </div>
    </header>
  );
}
