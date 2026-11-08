import { type LucideIcon, Home, Info, Sprout } from "lucide-react";

interface Page {
  name: string;
  path: string;
  icon: LucideIcon;
}

const PAGES: Page[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "App", path: "/app", icon: Sprout },
  { name: "About", path: "/about", icon: Info },
] as const

export type {
  Page,
}

export {
  PAGES,
}