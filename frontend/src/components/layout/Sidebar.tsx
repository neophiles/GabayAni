import useSidebar from "../../stores/sidebar";
import { cn } from "cn";
import useScreenWidth from "../../hooks/useScreenWidth";
import { MAX_PHONE_SCREEN_WIDTH } from "../../constants";
import Backdrop from "./Backdrop";
import { PAGES } from "../../data/pages";
import NavButton from "./NavButton";

export default function Sidebar() {
  const { isOpen, toggleOpen } = useSidebar()
  const sidebarWidth = isOpen ? "w-xs" : "w-0 md:w-16"

  const { width } = useScreenWidth()
  const isPhoneView = width <= MAX_PHONE_SCREEN_WIDTH;

  return (
    <>
      {isPhoneView && isOpen && <Backdrop onClick={toggleOpen} className="z-40" />}
      <aside className={cn(
        "z-50 fixed md:sticky left-0 top-16 h-[calc(100vh-3.5rem)] bg-base-300 overflow-hidden md:overflow-visible transition-[width] ease-in-out duration-300",
        sidebarWidth
      )}>
        <div className="p-4 flex flex-col bg-inherit overflow-hidden">
          <nav className="flex flex-col gap-2 bg-inherit overflow-hidden">
            {PAGES.map((page, index) => (
              <NavButton key={index} page={page} placement="side" />
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}