import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <p className="mx-auto max-w-6xl truncate px-4 text-sm text-ink-muted md:px-8">
        {SITE.name} by {SITE.author} ·{" "}
        <Link href="/about" className="inline-flex min-h-tap items-center hover:text-ink">
          About
        </Link>
      </p>
    </footer>
  );
}
