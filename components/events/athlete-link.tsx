import Link from "next/link";

/**
 * An athlete's name, linking to their page on the event's Athletes view when it
 * has one. Vertical padding on the inline link makes the tap target 44px tall
 * without changing the row's layout or the name's truncation.
 */
export function AthleteLink({ name, href, className = "" }: { name: string; href?: string; className?: string }) {
  if (!href) return <>{name}</>;
  return (
    <Link href={`${href}?${new URLSearchParams({ athlete: name })}`} className={`py-3 hover:text-primary hover:underline ${className}`}>
      {name}
    </Link>
  );
}
