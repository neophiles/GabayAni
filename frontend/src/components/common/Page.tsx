import { cn } from "cn"
import type { Props } from "../../types/props"

export default function Page({
  children,
  className,
}: Props) {
  return (
    <div className={cn(
      "max-w-5xl w-full flex flex-col gap-8",
      className,
    )}>
      {children}
    </div>
  )
}