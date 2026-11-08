import { cn } from "cn";
import type { Props } from "../../types/props";

export default function Widget({
  children,
  className,
}: Props) {
  return (
    <div className={cn(
      "w-full p-4 md:p-6 gap-4 bg-base-100 rounded-lg shadow",
      className,
    )}>
      {children}
    </div>
  )
}
