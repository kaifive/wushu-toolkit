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
      <PageHeader crumbs={[{ href: "/tools", label: "Toolkit" }]} title="Demo order">
        Enter groups and solos with a level from 1 to 5, then generate a running order. Saved on this device.
      </PageHeader>
      <DemoBuilder />
    </Container>
  );
}
