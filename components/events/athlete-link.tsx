import Link from "next/link";

/** An athlete's name, linking to their page on the event's Athletes view when it has one. */
export function AthleteLink({ name, href, className = "" }: { name: string; href?: string; className?: string }) {
  if (!href) return <>{name}</>;
  return (
    <Link href={`${href}?${new URLSearchParams({ athlete: name })}`} className={`hover:text-primary hover:underline ${className}`}>
      {name}
    </Link>
  );
}
