import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Container className="max-w-3xl">
      <PageHeader eyebrow="About" title="About Wushu Toolkit">
        Built by {SITE.author}, a wushu athlete, so families and coaches can follow competitions without refreshing five spreadsheets.
      </PageHeader>
      <div className="space-y-4 text-ink-muted">
        <p>
          Wushu Toolkit reads competition data from the organizers&apos; public sources (Sportdata, published Google Sheets and Docs) and
          applies the published selection rules to project teams. It isn&apos;t affiliated with USAWKF, IWUF or any organizer.
        </p>
        <h2 id="contact" className="pt-4 font-display text-xl font-semibold text-ink">
          Contact and event passes
        </h2>
        <p>Event passes are granted by hand while payments are being set up. Reach out to {SITE.author} through your club or team to request one.</p>
      </div>
    </Container>
  );
}
