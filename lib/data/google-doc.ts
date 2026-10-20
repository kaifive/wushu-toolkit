import { parse } from "node-html-parser";
import { clean } from "@/lib/domain/names";
import { parseScorecards } from "./sportdata";
import { fetchText, source, SourceError, type DataSource } from "./source";

/**
 * Published Google Docs (File → Share → Publish to web, ".../pub" URLs).
 * Used for manually tracked data: a doc whose body is JSON, or a doc that
 * holds pasted Sportdata scorecard HTML (the 2025 Junior Trials fallback).
 */

/** Concatenate the doc's paragraph and heading text, in order. */
export function docText(html: string): string {
  return parse(html)
    .querySelectorAll("p, h1, h2, h3, h4, h5, h6")
    .map((el) => el.textContent.replace(/ /g, " ").trim())
    .filter(Boolean)
    .join("");
}

/** Doc body as JSON. Smart quotes from Docs autocorrect are straightened first. */
export function parseDocJson<T = unknown>(html: string): T {
  const body = docText(html).replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  try {
    return JSON.parse(body) as T;
  } catch (err) {
    throw new SourceError(`Published doc is not valid JSON: ${err instanceof Error ? err.message : err}`);
  }
}

/** Doc body as pasted Sportdata scorecard HTML. A leading "html code" label is ignored. */
export function parseDocScorecards(html: string) {
  let body = docText(html);
  if (clean(body.slice(0, 9)).toLowerCase() === "html code") body = body.slice(9);
  return parseScorecards(body);
}

export function publishedDocJson<T>(url: string, label = "Google Doc"): DataSource<T> {
  return source(label, async (ctx) => parseDocJson<T>(await fetchText(url, ctx)));
}

export function publishedDocScorecards(url: string, label = "Google Doc (scorecards)") {
  return source(label, async (ctx) => parseDocScorecards(await fetchText(url, ctx)));
}
