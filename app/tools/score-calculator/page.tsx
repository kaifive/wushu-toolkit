import type { Metadata } from "next";
import { ScoreCalculator } from "@/components/tools/score-calculator";
import { Container, PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Score calculator", description: "Work out the lowest score you need to beat an average." };

export default function ScoreCalculatorPage() {
  return (
    <Container className="max-w-3xl">
      <PageHeader crumbs={[{ href: "/tools", label: "Toolkit" }]} title="Score calculator">
        Enter the average to beat and any scores you already have. You&apos;ll get the lowest score that beats it (scores have three decimals).
      </PageHeader>
      <ScoreCalculator />
    </Container>
  );
}
