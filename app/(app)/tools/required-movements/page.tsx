import type { Metadata } from "next";
import { MovementChecklist } from "@/components/tools/movement-checklist";
import { SourceNote } from "@/components/ui/notice";
import { Container, PageHeader } from "@/components/ui/page-header";
import { REQUIRED_MOVEMENTS, REQUIRED_MOVEMENTS_SOURCE } from "@/lib/rules/iwuf-2024/required-movements";

export const metadata: Metadata = { title: "Required movements", description: "Checklist of required content for optional wushu taolu routines." };

export default function RequiredMovementsPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader crumbs={[{ href: "/tools", label: "Toolkit" }]} title="Required movements">
        Tick off each required element in your routine.
      </PageHeader>
      {!REQUIRED_MOVEMENTS_SOURCE.verified && <SourceNote>Not yet checked against the IWUF 2024 rules.</SourceNote>}
      <MovementChecklist sets={REQUIRED_MOVEMENTS} />
    </Container>
  );
}
