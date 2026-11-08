import type { ButtonHTMLAttributes } from "react";
import type { Props } from "../../types/props"
import { cn } from "cn"

type BackdropProps = Props & ButtonHTMLAttributes<HTMLDivElement>

export default function Backdrop({
  className,
  onClick
}: BackdropProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "fixed inset-0",
        className,
      )}
    />
  )
}
