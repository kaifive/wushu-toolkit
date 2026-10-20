import type { Metadata } from "next";
import { CONCEPTS } from "@/components/brand/concepts";
import { Container, PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Logo concepts", robots: { index: false, follow: false } };

/** Internal review page for the three logo directions. Not linked from the nav. */
export default function BrandPage() {
  return (
    <Container>
      <PageHeader eyebrow="Brand review" title="Three logo concepts">
        Each mark at app-icon, header and favicon sizes, on light and dark.
      </PageHeader>
      <div className="grid gap-6 lg:grid-cols-3">
        {CONCEPTS.map(({ id, name, Mark, idea, strengths, risks }) => (
          <section key={id} className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="grid grid-cols-2">
              <div className="flex items-center justify-center bg-[#faf7f2] p-6 [--ink:#1b1a17] [--surface:#ffffff] [--seal:#c8321e]">
                <Mark className="h-24 w-24" />
              </div>
              <div className="flex items-center justify-center bg-[#121110] p-6 [--ink:#f3efe7] [--surface:#1c1b19] [--seal:#e2513a]">
                <Mark className="h-24 w-24" />
              </div>
            </div>
            <div className="flex items-end gap-4 border-y border-line px-4 py-3">
              <Mark className="h-12 w-12" />
              <Mark className="h-8 w-8" />
              <Mark className="h-4 w-4" />
              <span className="ml-auto font-display text-lg font-semibold">
                Wushu <span className="text-seal">Toolkit</span>
              </span>
            </div>
            <div className="p-4 text-sm">
              <h2 className="font-display text-lg font-semibold">
                {id}. {name}
              </h2>
              <p className="mt-1 text-ink-muted">{idea}</p>
              <p className="mt-3 font-semibold">Strengths</p>
              <ul className="list-disc pl-5 text-ink-muted">{strengths.map((s) => <li key={s}>{s}</li>)}</ul>
              <p className="mt-2 font-semibold">Risks</p>
              <ul className="list-disc pl-5 text-ink-muted">{risks.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
