import Button from "../common/Button";
import Text from "../common/Text";
import { type Page } from "../../data/pages";
import { cn } from "cn";
import { useLocation } from "react-router";
import useAppNavigation from "../../hooks/useAppNavigation";
import Icon from "../common/Icon";

type NavButtonPlacement = "side" | "bottom" 

export default function NavButton({
  page,
  placement,
}: {
  page: Page,
  placement: NavButtonPlacement
}) {
  const {
    name,
    path,
    icon,
  } = page

  const location = useLocation()
  const { handleNavigate } = useAppNavigation()
  const currentPath = location.pathname
  const isActive = currentPath === path
    || currentPath.startsWith(`${path}/`)
    || (currentPath === "/" && path === "/home")
  const isBottom = placement === "bottom" ? "size-8" : ""

  const placementClasses: Record<NavButtonPlacement, string[]> = {
    "side": ["bg-inherit text-base-content", "bg-primary/10 text-primary"],
    "bottom": ["bg-inherit/50 text-base-content", "bg-primary/75 text-primary-content"]
  }
  
  return (
    <Button
      className={cn(
        "p-1 flex items-center gap-4 rounded-lg",
        placementClasses[placement][0],
        isActive ? placementClasses[placement][1] : placementClasses[placement][0],
      )}
      onClick={() => handleNavigate(path)}
    >
      <Icon icon={icon} className={isBottom} />
      {placement === "side" && (
        <Text size="sm" className="font-medium">{name}</Text>
      )}
    </Button>
  )
}