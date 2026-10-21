import type { Metadata } from "next";
import { RoutineOrder } from "@/components/tools/routine-order";
import { Container, PageHeader } from "@/components/ui/page-header";
import { REQUIRED_MOVEMENTS } from "@/lib/rules/iwuf-2024/required-movements";

export const metadata: Metadata = { title: "Required movements", description: "Put an optional routine's compulsory content in order and copy it for registration." };

export default function RequiredMovementsPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader crumbs={[{ href: "/tools", label: "Toolkit" }]} title="Required movements">
        IWUF 2024 compulsory content. Put it in routine order, then copy it for the registration form.
      </PageHeader>
      <RoutineOrder sets={REQUIRED_MOVEMENTS} />
    </Container>
  );
}
