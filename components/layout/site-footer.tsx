import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-ink-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Built by {SITE.author}.
        </p>
        <p className="flex gap-4">
          <Link href="/about" className="hover:text-ink">About</Link>
          <Link href="/tools" className="hover:text-ink">Tools</Link>
        </p>
      </div>
    </footer>
  );
}
