import type { Metadata } from "next";
import { ScoreCalculator } from "@/components/tools/score-calculator";
import { Container, PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Score calculator", description: "Work out the lowest score you need to beat an average." };

export default function ScoreCalculatorPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader title="Score calculator" />
      <ScoreCalculator />
    </Container>
  );
}
