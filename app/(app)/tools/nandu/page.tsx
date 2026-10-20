import type { Metadata } from "next";
import { NanduCalculator } from "@/components/tools/nandu-calculator";
import { Container, PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Nandu calculator",
  description: "Build your degree of difficulty and see how close it gets to 2.0, using the IWUF 2024 tables.",
};

export default function NanduPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader crumbs={[{ href: "/tools", label: "Toolkit" }]} title="Nandu calculator">
        Pick your jumps, balances and kicks, then what each lands in or connects to. Techniques count up to 1.4 and connections up to 0.6,
        for 2.0 full difficulty (IWUF 2024).
      </PageHeader>
      <NanduCalculator />
      <p className="mt-6 text-sm text-ink-muted">
        Assumes every element is completed. Rule breaks are checked from what you declare; how you perform (steps, landing foot, holding
        still) is listed as a reminder. Source: IWUF Wushu Taolu Competition Rules and Judging Methods (2024), Tables 10-3-3 to 10-3-9.
      </p>
    </Container>
  );
}
