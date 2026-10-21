"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Notice } from "@/components/ui/notice";
import { readJson } from "@/lib/http";
import { useAuth } from "./auth-provider";
import { SignInForm } from "./sign-in-form";

interface Me {
  email?: string;
  passes: string[];
  admin: boolean;
}

export function AccountPanel({ events }: { events: { slug: string; name: string }[] }) {
  const { status, user, signOut, authedFetch } = useAuth();
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Forget the previous account's passes (and admin panel) when the user changes.
  const uid = user?.uid ?? null;
  const [shownFor, setShownFor] = useState(uid);
  if (shownFor !== uid) {
    setShownFor(uid);
    setMe(null);
    setError(null);
  }

  useEffect(() => {
    if (status !== "signed-in") return;
    let alive = true;
    void readJson<Me>(authedFetch("/api/me"), "Couldn't load your account.").then((r) => {
      if (!alive) return;
      setMe(r.ok ? r.body : null);
      setError(r.ok ? null : r.error);
    });
    return () => {
      alive = false;
    };
  }, [status, authedFetch]);

  if (status === "off") {
    return (
      <Notice title="Accounts are coming soon">
        Everything on the site is free to use right now. Event passes will need an account.
      </Notice>
    );
  }
  if (status === "loading") return <p className="text-ink-muted">Loading…</p>;
  if (status === "signed-out" || !user) return <SignInForm />;

  const name = (slug: string) => events.find((e) => e.slug === slug)?.name ?? slug;
  return (
    <div className="space-y-4">
      <section className="rounded-card border border-line bg-surface p-5">
        <p className="text-sm text-ink-muted">Signed in as</p>
        <p className="font-semibold">{user.email}</p>
        {!user.emailVerified && <VerifyEmail />}
        <button type="button" onClick={() => void signOut()} className="mt-3 min-h-tap rounded-card border border-line px-4 font-semibold">
          Sign out
        </button>
      </section>
      <section className="rounded-card border border-line bg-surface p-5">
        <h2 className="font-display text-lg font-bold">Event passes</h2>
        {error && <Notice tone="error">{error}</Notice>}
        {!me && !error && <p className="text-sm text-ink-muted">Loading…</p>}
        {me && me.passes.length === 0 && <p className="mt-1 text-sm text-ink-muted">No passes yet. Past events are free.</p>}
        {me && me.passes.length > 0 && (
          <ul className="mt-2 space-y-1">
            {me.passes.map((slug) => (
              <li key={slug}>
                <Link href={`/events/${slug}`} className="inline-flex min-h-tap items-center font-semibold text-primary">
                  {name(slug)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      {me?.admin && <AdminGrant events={events} />}
    </div>
  );
}

function AdminGrant({ events }: { events: { slug: string; name: string }[] }) {
  const { authedFetch } = useAuth();
  const [email, setEmail] = useState("");
  const [slug, setSlug] = useState(events[0]?.slug ?? "");
  const [result, setResult] = useState<{ tone: "info" | "error"; text: string } | null>(null);

  const send = async (revoke: boolean) => {
    setResult(null);
    const sent = { email, slug }; // the message names what was sent, even if the form changes meanwhile
    const r = await readJson(
      authedFetch("/api/admin/grant", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...sent, revoke }) }),
      "Failed.",
    );
    setResult(r.ok ? { tone: "info", text: `${revoke ? "Revoked" : "Granted"} ${sent.slug} for ${sent.email}.` } : { tone: "error", text: r.error });
  };

  return (
    <section className="space-y-3 rounded-card border border-gold/40 bg-surface p-5">
      <h2 className="font-display text-lg font-bold">Admin: grant a pass</h2>
      <input type="email" placeholder="athlete@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" className="min-h-tap w-full rounded-card border border-line bg-surface px-3" />
      <select value={slug} onChange={(e) => setSlug(e.target.value)} aria-label="Event" className="min-h-tap w-full rounded-card border border-line bg-surface px-3">
        {events.map((e) => (
          <option key={e.slug} value={e.slug}>
            {e.name}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button type="button" onClick={() => void send(false)} className="min-h-tap flex-1 rounded-card bg-primary font-semibold text-primary-ink">
          Grant
        </button>
        <button type="button" onClick={() => void send(true)} className="min-h-tap flex-1 rounded-card border border-line font-semibold">
          Revoke
        </button>
      </div>
      {result && <Notice tone={result.tone}>{result.text}</Notice>}
    </section>
  );
}

/** Passes need a verified email; offer to resend the link. */
function VerifyEmail() {
  const { user } = useAuth();
  const [sent, setSent] = useState<"idle" | "sent" | "failed">("idle");
  const [verified, setVerified] = useState(false);
  // The cached user doesn't learn about a link opened elsewhere: reload on mount and on return to the tab.
  useEffect(() => {
    if (!user) return;
    const check = () => void user.reload().then(() => user.emailVerified && setVerified(true)).catch(() => {});
    check();
    window.addEventListener("focus", check);
    return () => window.removeEventListener("focus", check);
  }, [user]);
  const resend = async () => {
    if (!user) return;
    try {
      const { sendEmailVerification } = await import("firebase/auth");
      await sendEmailVerification(user);
      setSent("sent");
    } catch {
      setSent("failed");
    }
  };
  if (verified) return null;
  return (
    <p className="mt-2 text-sm text-ink-muted">
      Verify your email to receive event passes.{" "}
      {sent === "sent" ? (
        "Link sent; check your inbox."
      ) : (
        <button type="button" onClick={() => void resend()} className="min-h-tap font-semibold text-primary">
          {sent === "failed" ? "Couldn't send. Try again" : "Resend link"}
        </button>
      )}
    </p>
  );
}
