import type { Metadata } from "next";
import { DemoBuilder } from "@/components/demo/demo-builder";
import { Container, PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Demo order",
  description: "Build a running order for a wushu demo: no back-to-back performers, mixed levels, a strong open and close.",
};

export default function DemoOrderPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader title="Demo order" />
      <DemoBuilder />
    </Container>
  );
}
