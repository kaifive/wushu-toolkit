"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/components/auth/auth-provider";
import { LockIcon } from "@/components/ui/icons";
import { Notice } from "@/components/ui/notice";
import type { EventData } from "@/lib/domain/types";
import type { AthleteHighlight, EventView } from "@/lib/events/types";
import { getRuleset, type RulesetId } from "@/lib/rules";
import { WatchLegend } from "@/components/watchlist/legend";
import { DataStatus } from "./data-status";
import { VIEW_BODY } from "./view-bodies";
import { readJson } from "@/lib/http";
import { ExportProvider } from "@/components/export/export-buttons";

interface Props {
  slug: string;
  view: EventView;
  eventName: string;
  rulesetId: RulesetId;
  highlights?: AthleteHighlight[];
  refreshSeconds: number;
}

/** Paid live events: data is fetched after sign-in, through the entitlement-checked API (ADR-005). */
export function GatedEventView(props: Props) {
  return (
    <AuthProvider>
      <Inner {...props} />
    </AuthProvider>
  );
}

function Inner({ slug, view, eventName, rulesetId, highlights, refreshSeconds }: Props) {
  const { status, user, authedFetch, kicked } = useAuth();
  const [data, setData] = useState<EventData | null>(null);
  const [problem, setProblem] = useState<{ code?: string; error: string } | null>(null);

  const load = useCallback(async () => {
    const r = await readJson<EventData>(authedFetch(`/api/events/${slug}/data`), "Couldn't load scores.");
    if (r.ok) {
      setData(r.body);
      setProblem(null);
    } else setProblem({ code: r.code, error: r.error });
  }, [authedFetch, slug]);

  // A different (or no) account must never see the previous account's paid data.
  const uid = user?.uid ?? null;
  const [shownFor, setShownFor] = useState(uid);
  if (shownFor !== uid) {
    setShownFor(uid);
    setData(null);
    setProblem(null);
  }

  useEffect(() => {
    if (status !== "signed-in") return;
    // Fetch on sign-in, then poll while the tab is visible.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    const id = window.setInterval(() => document.visibilityState === "visible" && void load(), refreshSeconds * 1000);
    return () => window.clearInterval(id);
  }, [status, load, refreshSeconds]);

  if (status === "loading") return <p className="text-ink-muted">Loading…</p>;
  if (status === "off" || status === "signed-out" || problem?.code === "no-pass" || problem?.code === "other-device") {
    return (
      <div className="rounded-card border border-line bg-surface p-6 text-center">
        <LockIcon className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-3 font-display text-xl font-bold tracking-wide">Event pass required</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
          {kicked
            ? `You were signed out because this account signed in on ${kicked}.`
            : problem?.code === "no-pass"
              ? `This account doesn't have a pass for ${eventName} yet.`
              : problem?.code === "other-device"
                ? "This account is now signed in on another device."
                : `Live data for ${eventName} is part of the event pass.`}
        </p>
        <Link href="/account" className="mt-4 inline-flex min-h-tap items-center rounded-card bg-primary px-5 font-semibold text-primary-ink">
          {status === "signed-in" ? "Your account" : "Sign in"}
        </Link>
      </div>
    );
  }
  // A failed poll (network, 5xx) with scores on screen keeps showing them.
  if (problem && (!data || problem.code)) return <Notice tone="error" title="Couldn't load scores">{problem.error}</Notice>;
  if (!data) return <p className="text-ink-muted">Loading scores…</p>;
  const Body = VIEW_BODY[view];
  return (
    <ExportProvider slug={slug} eventName={eventName} rulesetId={rulesetId} data={data}>
      <DataStatus data={data} />
      <WatchLegend />
      <Body ruleset={getRuleset(rulesetId)} data={data} highlights={highlights} />
    </ExportProvider>
  );
}
