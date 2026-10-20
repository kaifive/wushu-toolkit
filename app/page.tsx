import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { PhonePreview } from "@/components/landing/phone-preview";
import { allEvents } from "@/lib/events/registry";
import { SITE } from "@/lib/site";

const FEATURES = [
  { t: "Live standings", b: "Every routine, every division, refreshed while the competition runs. Built for one-handed use in the stands." },
  { t: "Team projections", b: "See who's on the A, B and C teams right now, using the published selection rules and minimum averages." },
  { t: "Scorecards", b: "Panel A deduction codes, B-panel marks with drops, and C-panel difficulty made or missed." },
  { t: "Ring schedules", b: "Know who's on the floor and how far your athlete is from their turn." },
  { t: "Rules toolkit", b: "Deduction code lookup, required-movement checklists and a score calculator." },
  { t: "Every past event", b: "Results from past trials and tournaments stay online and free." },
];

const FAQ = [
  {
    q: "Is this official?",
    a: "No. Wushu Toolkit isn't affiliated with USAWKF, IWUF or any organizer. Scores come from the organizers' public sources, and projections follow the published rules. Confirm results with the organizers.",
  },
  {
    q: "How does an event pass work?",
    a: "A pass unlocks live data for one competition on your account. Past events are free. Passes are granted by hand for now.",
  },
  { q: "Can I share my account?", a: "An account can be signed in on one device at a time. Signing in on a new device signs out the old one." },
  { q: "Does it work on my phone?", a: "Yes. It's designed for phones first: big tap targets, tables that fit a small screen, and no app to install." },
];

export default function HomePage() {
  const recent = allEvents().slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-10 md:grid-cols-[1.2fr_1fr] md:pt-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink-muted">
              <LogoMark className="h-4 w-4" aria-hidden /> For athletes, coaches and parents
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Know where you stand <span className="text-seal">before the scores are final.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-muted">
              Live standings, team projections and scorecards for wushu taolu competitions, on the phone already in your hand.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/events" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-seal px-6 font-semibold text-seal-ink">
                See competitions
              </Link>
              <Link href="/tools" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-surface px-6 font-semibold">
                Free rules tools
              </Link>
            </div>
          </div>
          <PhonePreview />
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Everything you check between routines</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.t}>
                <div className="mb-3 h-1 w-8 rounded-full bg-seal" />
                <h3 className="font-semibold">{f.t}</h3>
                <p className="mt-1 text-sm text-ink-muted">{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Pay per competition</h2>
            <p className="mt-2 text-ink-muted">No subscription. Buy a pass for the competition you&apos;re at, and keep using the free tools and archive all year.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-sm font-semibold text-ink-muted">Free</p>
              <p className="mt-1 font-display text-2xl font-semibold">$0</p>
              <ul className="mt-3 space-y-1 text-sm text-ink-muted">
                <li>Past event results</li>
                <li>Rules and deduction lookup</li>
                <li>Score calculator</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-seal bg-surface p-5">
              <p className="text-sm font-semibold text-seal">Event pass</p>
              <p className="mt-1 font-display text-2xl font-semibold">Per event</p>
              <ul className="mt-3 space-y-1 text-sm text-ink-muted">
                <li>Live standings and scorecards</li>
                <li>Team projections</li>
                <li>One device at a time</li>
              </ul>
              <a href={SITE.contactUrl} className="mt-4 inline-flex min-h-tap w-full items-center justify-center rounded-xl bg-seal font-semibold text-seal-ink">
                Request a pass
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold">Recent competitions</h2>
            <Link href="/events" className="text-sm font-semibold text-seal">
              All events
            </Link>
          </div>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {recent.map((e) => (
              <li key={e.slug}>
                <Link href={`/events/${e.slug}`} className="block min-h-tap rounded-2xl border border-line p-4 hover:border-seal/50">
                  <p className="font-semibold">{e.shortName}</p>
                  <p className="text-sm text-ink-muted">{e.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="font-display text-2xl font-semibold">Questions</h2>
        <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface">
          {FAQ.map((f) => (
            <details key={f.q} className="px-4">
              <summary className="flex min-h-14 cursor-pointer list-none items-center font-semibold">{f.q}</summary>
              <p className="pb-4 text-sm text-ink-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
