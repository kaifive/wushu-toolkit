export type NavItem = { href: string; label: string; icon: "home" | "events" | "tools" | "account" };

/** Primary navigation. Shown as the bottom tab bar on phones and the top nav on desktop. */
export const PRIMARY_NAV: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/events", label: "Events", icon: "events" },
  { href: "/tools", label: "Tools", icon: "tools" },
  { href: "/account", label: "Account", icon: "account" },
];

export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
