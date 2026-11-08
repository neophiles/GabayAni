import { cn } from "cn";
import type { Props } from "../../types/props";
import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = Props & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  children,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={buttonProps.type}
      className={cn(
        "cursor-pointer",
        className,
      )}
      aria-pressed={buttonProps["aria-pressed"]}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
    >
      {children}
    </button>
  )
}
