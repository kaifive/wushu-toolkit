import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";
import { Container, PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Tools", description: "Deduction code lookup, required movements checklist, score calculator and the current rules." };

const TOOLS = [
  { href: "/tools/deductions", title: "Deduction codes", body: "Search panel A codes by number or keyword." },
  { href: "/tools/required-movements", title: "Required movements", body: "Checklist of content requirements for optional routines." },
  { href: "/tools/score-calculator", title: "Score calculator", body: "The lowest scores you need to beat an average." },
  { href: "/rules", title: "Current rules", body: "Age groups, events, time limits, music and team selection." },
];

export default function ToolsPage() {
  return (
    <Container>
      <PageHeader eyebrow="Tools" title="Athlete toolkit">
        Quick references for competition day.
      </PageHeader>
      <ul className="grid gap-3 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="flex min-h-tap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 hover:border-seal/50">
              <span>
                <span className="block font-semibold">{t.title}</span>
                <span className="block text-sm text-ink-muted">{t.body}</span>
              </span>
              <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
