import type { Metadata } from "next";
import { DeductionSearch } from "@/components/tools/deduction-search";
import { Notice } from "@/components/ui/notice";
import { Container, PageHeader } from "@/components/ui/page-header";
import { DEDUCTION_GROUPS, DEDUCTIONS_SOURCE } from "@/lib/rules/iwuf-2024/deductions";

export const metadata: Metadata = { title: "Deduction codes", description: "Search wushu taolu panel A deduction codes by number or keyword." };

export default function DeductionsPage() {
  return (
    <Container className="max-w-3xl">
      <PageHeader crumbs={[{ href: "/tools", label: "Toolkit" }]} title="Deduction codes">
        Panel A (quality of movements) codes by event family.
      </PageHeader>
      {!DEDUCTIONS_SOURCE.verified && (
        <div className="mb-4">
          <Notice tone="warn" title="Pending verification">
            These codes come from the previous version of the toolkit and haven&apos;t been checked against the IWUF 2024 Taolu rules yet.
          </Notice>
        </div>
      )}
      <DeductionSearch groups={DEDUCTION_GROUPS} />
    </Container>
  );
}
