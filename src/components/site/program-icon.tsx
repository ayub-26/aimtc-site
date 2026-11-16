import {
  BookOpen,
  Brain,
  Clock,
  Hand,
  Heart,
  Home,
  Landmark,
  Languages,
  Leaf,
  Mic,
  Moon,
  Route,
  Scale,
  ScrollText,
  Star,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  book: BookOpen,
  brain: Brain,
  mic: Mic,
  scroll: ScrollText,
  heart: Heart,
  languages: Languages,
  users: Users,
  moon: Moon,
  star: Star,
  scale: Scale,
  route: Route,
  hand: Hand,
  landmark: Landmark,
  clock: Clock,
  sparkle: Sun,
  home: Home,
  leaf: Leaf,
};

export function SiteIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? BookOpen;
  return <Icon className={className} aria-hidden="true" />;
}
