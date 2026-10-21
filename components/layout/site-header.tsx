import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { ThemeToggle } from "./theme-toggle";

/** Phone top bar (dark, like v1's chrome). Desktop uses the sidebar instead. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-chrome text-chrome-ink md:hidden">
      <div className="flex h-14 items-center px-4">
        <Link href="/" className="flex min-h-tap items-center gap-2.5" aria-label="Wushu Toolkit home">
          <LogoMark className="h-7 w-7" aria-hidden />
          <span className="font-display text-lg font-bold tracking-wide">Wushu Toolkit</span>
        </Link>
        <ThemeToggle className="-mr-2 ml-auto" />
      </div>
    </header>
  );
}
