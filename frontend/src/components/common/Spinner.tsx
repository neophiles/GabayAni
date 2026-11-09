import Icon from "./Icon"
import { LoaderCircleIcon } from "lucide-react"

export default function Spinner({ className }: { className?: string }) {
  return (
    <Icon
      icon={LoaderCircleIcon}
      className={`animate-spin ${className ?? ""}`}
    />
  )
}
