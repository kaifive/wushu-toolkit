import type { Metadata } from "next";
import { NanduCalculator } from "@/components/tools/nandu-calculator";
import { Container, PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Nandu Calculator",
  description: "Build your degree of difficulty and see how close it gets to 2.0, using the IWUF 2024 tables.",
};

export default function NanduPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader title="Nandu Calculator" />
      <NanduCalculator />
    </Container>
  );
}
