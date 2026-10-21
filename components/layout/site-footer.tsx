import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm text-ink-muted sm:flex-row sm:justify-between md:px-8">
        <p>
          {SITE.name} · by {SITE.author}. Not affiliated with USAWKF, IWUF or event organizers.
        </p>
        <p className="flex gap-4">
          <Link href="/about" className="inline-flex min-h-tap items-center hover:text-ink">About</Link>
          <Link href="/rules" className="inline-flex min-h-tap items-center hover:text-ink">Rules</Link>
        </p>
      </div>
    </footer>
  );
}
