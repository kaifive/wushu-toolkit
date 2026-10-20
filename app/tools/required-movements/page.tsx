import type { Metadata } from "next";
import { MovementChecklist } from "@/components/tools/movement-checklist";
import { Notice } from "@/components/ui/notice";
import { Container, PageHeader } from "@/components/ui/page-header";
import { REQUIRED_MOVEMENTS, REQUIRED_MOVEMENTS_SOURCE } from "@/lib/rules/iwuf-2024/required-movements";

export const metadata: Metadata = { title: "Required movements", description: "Checklist of required content for optional wushu taolu routines." };

export default function RequiredMovementsPage() {
  return (
    <Container className="max-w-3xl">
      <PageHeader eyebrow="Tools" title="Required movements">
        Tick off each required element as you check your routine. Your ticks stay on this device.
      </PageHeader>
      {!REQUIRED_MOVEMENTS_SOURCE.verified && (
        <div className="mb-4">
          <Notice tone="warn" title="Pending verification">
            From the previous version of the toolkit; not yet checked against the IWUF 2024 Taolu rules.
          </Notice>
        </div>
      )}
      <MovementChecklist sets={REQUIRED_MOVEMENTS} />
    </Container>
  );
}
