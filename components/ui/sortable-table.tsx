"use client";

import { Children, cloneElement, Fragment, isValidElement, useState, type ReactElement, type ReactNode } from "react";

/**
 * Click a column header to sort by it; click again to reverse, a third time
 * to go back to the original order (the ranking). Works on plain
 * <thead>/<tbody> markup: a cell sorts by its `data-sort` value when it has
 * one, else by its text. Numbers sort high to low first, text A to Z.
 */
type Props = { children: ReactNode; className?: string };
type El = ReactElement<{ children?: ReactNode; className?: string; "data-sort"?: string | number; [k: string]: unknown }>;

/** Flatten arrays and fragments into a list of elements. */
function flat(nodes: ReactNode): El[] {
  const out: El[] = [];
  Children.toArray(nodes).forEach((n) => {
    if (!isValidElement(n)) return;
    const el = n as El;
    if (el.type === Fragment) out.push(...flat(el.props.children));
    else out.push(el);
  });
  return out;
}

/** Visible text of an element tree (props only: no rendering). */
function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(" ");
  if (isValidElement(node)) {
    const p = (node as El).props;
    if (p["data-sort"] !== undefined) return String(p["data-sort"]);
    if (typeof p.name === "string" && p.children === undefined) return p.name; // e.g. <AthleteLink name=…>
    return textOf(p.children);
  }
  return "";
}

const valueOf = (cell: El | undefined) => {
  if (!cell) return "";
  return cell.props["data-sort"] !== undefined ? String(cell.props["data-sort"]) : textOf(cell.props.children).replace(/\s+/g, " ").trim();
};
const numberOf = (s: string) => {
  const m = s.replace(/[−–]/g, "-").match(/^[=#+]?\s*(-?\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
};

export function SortableTable({ children, className }: Props) {
  const [sort, setSort] = useState<{ col: number; dir: 1 | -1 } | null>(null);
  const parts = flat(children);
  const thead = parts.find((p) => p.type === "thead");
  const tbody = parts.find((p) => p.type === "tbody");
  const rows = tbody ? flat(tbody.props.children) : [];

  // Numeric when every filled cell in the column starts with a number.
  const numeric = (col: number) => {
    const vals = rows.map((r) => valueOf(flat(r.props.children)[col])).filter((v) => v && v !== "—");
    return vals.length > 0 && vals.every((v) => numberOf(v) !== null);
  };

  const sortRows = () => {
    if (!sort) return rows;
    const isNum = numeric(sort.col);
    const keyed = rows.map((r, i) => {
      const v = valueOf(flat(r.props.children)[sort.col]);
      return { r, i, v, n: isNum ? numberOf(v) : null };
    });
    keyed.sort((a, b) => {
      const empty = (x: typeof a) => (isNum ? x.n === null : !x.v || x.v === "—");
      if (empty(a) !== empty(b)) return empty(a) ? 1 : -1; // blanks last either way
      const d = isNum ? (a.n ?? 0) - (b.n ?? 0) : a.v.localeCompare(b.v, undefined, { numeric: true, sensitivity: "base" });
      return d * sort.dir || a.i - b.i;
    });
    return keyed.map((k) => k.r);
  };
  const sorted = sortRows();

  const click = (col: number) => {
    const first: 1 | -1 = numeric(col) ? -1 : 1;
    setSort((s) => (!s || s.col !== col ? { col, dir: first } : s.dir === first ? { col, dir: (-first) as 1 | -1 } : null));
  };

  const head = thead
    ? cloneElement(
        thead,
        {},
        flat(thead.props.children).map((tr, ri) =>
          cloneElement(
            tr,
            { key: tr.key ?? ri },
            flat(tr.props.children).map((th, col) => {
              const active = sort?.col === col;
              const label = th.props.children;
              return cloneElement(
                th,
                { key: th.key ?? col, "aria-sort": active ? (sort!.dir === 1 ? "ascending" : "descending") : "none" } as Record<string, unknown>,
                <button
                  type="button"
                  onClick={() => click(col)}
                  className={`inline-flex min-h-tap cursor-pointer items-center gap-1 ${String(th.props.className ?? "").includes("text-right") ? "flex-row-reverse" : ""} hover:text-primary`}
                >
                  <span>{label}</span>
                  <span aria-hidden className={`text-[10px] ${active ? "text-primary" : "text-ink-muted/40"}`}>
                    {active ? (sort!.dir === 1 ? "▲" : "▼") : "↕"}
                  </span>
                </button>,
              );
            }),
          ),
        ),
      )
    : null;

  return (
    <table className={className}>
      {parts.filter((p) => p.type !== "thead" && p.type !== "tbody")}
      {head}
      {tbody ? cloneElement(tbody, {}, sorted) : null}
    </table>
  );
}
