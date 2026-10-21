import type { Metadata } from "next";
import { CONCEPTS } from "@/components/brand/concepts";
import { Container, PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Logo concepts", robots: { index: false, follow: false } };

/** Internal review page for the three logo directions. Not linked from the nav. */
export default function BrandPage() {
  return (
    <Container>
      <PageHeader title="Three logo concepts" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {CONCEPTS.map(({ id, name, Mark, idea, strengths, risks }) => (
          <section key={id} className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="grid grid-cols-2">
              <div className="flex items-center justify-center bg-[#f3f4f7] p-6 [--ink:#1f2430] [--surface:#ffffff] [--seal:#d4371f]">
                <Mark className="h-24 w-24" />
              </div>
              <div className="flex items-center justify-center bg-[#212631] p-6 [--ink:#e8eaef] [--surface:#272c38] [--seal:#ef5a42]">
                <Mark className="h-24 w-24" />
              </div>
            </div>
            <div className="flex items-end gap-4 border-y border-line px-4 py-3">
              <Mark className="h-12 w-12" />
              <Mark className="h-8 w-8" />
              <Mark className="h-4 w-4" />
              <span className="ml-auto font-display text-lg font-bold tracking-wide">
                Wushu Toolkit
              </span>
            </div>
            <div className="p-4 text-sm">
              <h2 className="font-display text-lg font-bold tracking-wide">
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
