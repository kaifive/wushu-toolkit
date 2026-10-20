import { HomeIcon, ToolsIcon, TrophyIcon, UserIcon } from "@/components/ui/icons";
import type { NavItem } from "@/lib/nav";

const ICONS = { home: HomeIcon, events: TrophyIcon, tools: ToolsIcon, account: UserIcon } as const;

export function NavIcon({ name, className }: { name: NavItem["icon"]; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} />;
}
