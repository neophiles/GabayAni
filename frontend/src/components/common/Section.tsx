import { cn } from "cn";
import type { Props } from "../../types/props";

export default function Section({
  children,
  className,
}: Props) {
  return (
    <section className={cn(
      "flex flex-col gap-2 md:gap-4",
      className,
    )}>
      {children}
    </section>
  )
}
