import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ChevronRightIcon } from "@/components/ui/icons";
import { Container, PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Athlete toolkit", description: "Deduction code lookup, required movements checklist, score calculator and the current rules." };

const TOOLS = [
  { href: "/tools/deductions", title: "Deduction code lookup", body: "Search panel A codes by number or keyword." },
  { href: "/tools/required-movements", title: "Required movements", body: "Order compulsory content and copy it for registration." },
  { href: "/tools/nandu", title: "Nandu calculator", body: "Build your difficulty and see how close you are to 2.0." },
  { href: "/tools/score-calculator", title: "Score calculator", body: "The lowest score you need to beat an average." },
  { href: "/watchlists", title: "Watch lists", body: "Highlight your school's athletes on every competition page." },
  { href: "/rules", title: "Rules", body: "Age groups, events, time limits, music and team selection." },
];

export default function ToolsPage() {
  return (
    <Container className="max-w-3xl">
      <PageHeader title="Athlete toolkit">Free references for competition day.</PageHeader>
      <Card bodyClassName="divide-y divide-line">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="group flex min-h-16 items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2">
            <span>
              <span className="block font-semibold">{t.title}</span>
              <span className="block text-ink-muted">{t.body}</span>
            </span>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted group-hover:text-primary" />
          </Link>
        ))}
      </Card>
    </Container>
  );
}
