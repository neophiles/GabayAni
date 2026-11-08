import { cn } from "cn"
import type { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  className?: string;
}

export default function Icon({
  icon: Icon,
  className
}: IconProps) {
  return (
    <Icon
      className={cn(
      "shrink-0",
      className
    )} />
  )
}
