import Icon from "./Icon"
import { LoaderCircleIcon } from "lucide-react"

export default function Spinner() {
  return (
    <Icon
      icon={LoaderCircleIcon}
      className="animate-spin"
    />
  )
}
