import Link from "next/link";
import { LockIcon } from "@/components/ui/icons";

/** Shown in place of data for paid live events until the viewer has a pass (ADR-005). */
export function GatedNotice({ eventName }: { eventName: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 text-center">
      <LockIcon className="mx-auto h-8 w-8 text-seal" />
      <h2 className="mt-3 font-display text-xl font-semibold">Event pass required</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
        Live standings and team projections for {eventName} are part of the event pass. Sign in with the account that has the pass.
      </p>
      <Link href="/account" className="mt-4 inline-flex min-h-tap items-center rounded-xl bg-seal px-5 font-semibold text-seal-ink">
        Sign in
      </Link>
    </div>
  );
}
