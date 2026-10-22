import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader title="About Wushu Toolkit" />
      <div className="space-y-4 text-ink-muted">
        <p>
          Built by {SITE.author}, a wushu athlete, so families and coaches can follow competitions without refreshing five spreadsheets.
        </p>
        <p>
          Wushu Toolkit reads competition data from the organizers&apos; public sources (Sportdata, published Google Sheets and Docs) and
          applies the published selection rules to project teams. It isn&apos;t affiliated with USAWKF, IWUF or any organizer.
        </p>
        <h2 id="contact" className="pt-4 font-display text-xl font-bold text-ink">
          Contact and Event Passes
        </h2>
        <p>
          Event passes are granted by hand while payments are being set up. Feature requests are welcome too:{" "}
          <Link href="/contact" className="font-semibold text-primary">
            contact us
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
