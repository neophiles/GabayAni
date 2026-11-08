import { useEffect } from "react"
import useModal from "../../stores/modal"
import type { Props } from "../../types/props"
import Backdrop from "../layout/Backdrop"
import Widget from "./Widget"
import { cn } from "cn"

export default function Modal({
  children,
  className,
}: Props) {
  const { isOpen } = useModal()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])
  
  return (
    <>
      {isOpen && <Backdrop className="z-50 bg-black/25" />}
      <Widget className={cn(
        "z-60 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-xs md:w-lg lg:w-2xl max-h-100 md:max-h-150 flex flex-col gap-6 overflow-y-auto shadow scrollbar-none",
        className,
      )}>
        {children}
      </Widget>
    </>
  )
}
