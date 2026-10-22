import type { Metadata } from "next";
import { Suspense } from "react";
import { DeductionSearch, DeductionSearchFromUrl } from "@/components/tools/deduction-search";
import { SourceNote } from "@/components/ui/notice";
import { Container, PageHeader } from "@/components/ui/page-header";
import { DEDUCTION_GROUPS, DEDUCTIONS_SOURCE } from "@/lib/rules/iwuf-2024/deductions";

export const metadata: Metadata = { title: "Deduction codes", description: "Search wushu taolu panel A deduction codes by number or keyword." };

export default function DeductionsPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader title="Deduction codes" />
      {!DEDUCTIONS_SOURCE.verified && <SourceNote>Not yet checked against the IWUF 2024 rules.</SourceNote>}
      <Suspense fallback={<DeductionSearch groups={DEDUCTION_GROUPS} />}>
        <DeductionSearchFromUrl groups={DEDUCTION_GROUPS} />
      </Suspense>
    </Container>
  );
}
