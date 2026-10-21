/**
 * DataSource: the one interface every data path implements (ADR-002).
 * A source is a named async loader. Adapters build sources; event configs
 * compose them; pages call load().
 */

export interface LoadContext {
  /** Injected for tests. Defaults to global fetch. */
  fetch?: typeof fetch;
  signal?: AbortSignal;
  /** Next.js ISR revalidate seconds for fetches made by this load. */
  revalidate?: number;
}

export interface DataSource<T> {
  /** Shown to users as "Source: …". */
  readonly label: string;
  load(ctx?: LoadContext): Promise<T>;
}

export function source<T>(label: string, load: (ctx: LoadContext) => Promise<T>): DataSource<T> {
  return { label, load: (ctx = {}) => load(ctx) };
}

/** A source that always resolves to a fixed value (snapshots, tests). */
export function constant<T>(label: string, value: T): DataSource<T> {
  return source(label, async () => value);
}

export function map<A, B>(src: DataSource<A>, fn: (a: A) => B | Promise<B>, label = src.label): DataSource<B> {
  return source(label, async (ctx) => fn(await src.load(ctx)));
}

/** Load several sources in parallel and combine them. */
export function all<T extends readonly DataSource<unknown>[]>(
  sources: T,
  label = sources.map((s) => s.label).join(" + "),
): DataSource<{ [K in keyof T]: T[K] extends DataSource<infer U> ? U : never }> {
  return source(label, async (ctx) => {
    const values = await Promise.all(sources.map((s) => s.load(ctx)));
    return values as { [K in keyof T]: T[K] extends DataSource<infer U> ? U : never };
  });
}

export interface Fallback<T> {
  value: T;
  label: string;
  stale: boolean;
  error?: string;
}

/**
 * Try `primary`; on any error serve `fallback` and report it as stale.
 * This is what the 2024 page did by hand with its bundled snapshot.
 */
export function withFallback<T>(primary: DataSource<T>, fallback: DataSource<T>): DataSource<Fallback<T>> {
  return source(`${primary.label} (fallback: ${fallback.label})`, async (ctx) => {
    try {
      return { value: await primary.load(ctx), label: primary.label, stale: false };
    } catch (err) {
      const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));
      try {
        const value = await fallback.load(ctx);
        return { value, label: fallback.label, stale: true, error: msg(err) };
      } catch (fallbackErr) {
        throw new Error(`${msg(err)} (no saved copy: ${msg(fallbackErr)})`, { cause: err });
      }
    }
  });
}

export class SourceError extends Error {
  constructor(
    message: string,
    readonly url?: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "SourceError";
  }
}

/** fetch() wrapper: ISR caching hint, status check, clear error messages. */
export async function fetchText(url: string, ctx: LoadContext = {}, init: RequestInit = {}): Promise<string> {
  const f = ctx.fetch ?? fetch;
  const nextInit = ctx.revalidate === undefined ? {} : { next: { revalidate: ctx.revalidate } };
  const res = await f(url, { signal: ctx.signal, ...nextInit, ...init } as RequestInit);
  if (!res.ok) throw new SourceError(`HTTP ${res.status} from ${new URL(url).host}`, url, res.status);
  return res.text();
}
