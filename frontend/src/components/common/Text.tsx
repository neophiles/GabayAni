import { cn } from "cn"
import type { Props } from "../../types/props"

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

interface TextProps extends Props {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label";
  size?: Size;
}

export default function Text({
  children,
  className,
  as: Component = "p",
  size = "md",
}: TextProps) {
  const textSizes: Record<Size, string> = {
    "sm": "text-xs md:text-sm lg:text-base",
    "md": "text-sm md:text-base lg:text-lg",
    "lg": "text-base md:text-lg lg:text-xl",
    "xl": "text-lg md:text-xl lg:text-2xl",
    "2xl": "text-xl md:text-2xl lg:text-3xl",
    "3xl": "text-2xl md:text-3xl lg:text-4xl",
    "4xl": "text-3xl md:text-4xl lg:text-5xl",
  }

  const isHeading = Component != "p" ? "font-bold" : undefined
    
  return (
    <Component className={cn(
      textSizes[size],
      isHeading,
      className,
    )}>
      {children}
    </Component>
  )
}
