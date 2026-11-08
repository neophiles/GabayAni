import { cn } from "cn";

interface DividerProps {
  orientation?: "h" | "v";
  className?: string;
}

export default function Divider({
  orientation = "h",
  className,
}: DividerProps) {
  const orientationStyle = orientation === "h"
    ? "w-full border-t"
    : "h-full border-r"

  return (
    <div className={cn(
      orientationStyle,
      className,
    )} />
  )
}
