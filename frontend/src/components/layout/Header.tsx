import { Leaf, Menu, Moon, Sun } from "lucide-react"
import Button from "../common/Button"
import Text from "../common/Text"
import Spacer from "./Spacer"
import useTheme from "../../stores/theme"
import useSidebar from "../../stores/sidebar"
import Icon from "../common/Icon"

export default function Header() {
  const { isDark, toggleDark } = useTheme()
  const { toggleOpen } = useSidebar()

  return (
    <div className="z-50 sticky top-0 h-16 w-full px-4 flex items-center justify-center bg-primary text-primary-content shadow">
      <div className="w-full flex items-center gap-4">
        <Button onClick={toggleOpen} className="p-1">
          <Menu/>
        </Button>
        <div className="flex items-center gap-1">
          <Icon icon={Leaf} className="size-6 " />
          <Text as="h1" size="xl">GabayAni</Text>
        </div>
        <Spacer />
        <Button onClick={toggleDark}>
          {isDark ? <Moon /> : <Sun />}
        </Button>
      </div>
    </div> 
  )
}
