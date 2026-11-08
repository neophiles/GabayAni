import { useNavigate } from "react-router";
import useSidebar from "../stores/sidebar";
import useScreenWidth from "./useScreenWidth";
import { MAX_PHONE_SCREEN_WIDTH } from "../constants";

const useAppNavigation = () => {
  const navigate = useNavigate()
  const { isOpen, toggleOpen } = useSidebar()
  const { width } = useScreenWidth()
  const isPhoneView = width <= MAX_PHONE_SCREEN_WIDTH

  const handleNavigate = (path: string) => {
    if (["/", "/about"].includes(path)) {
      alert("Coming Soon")
      return
    }

    navigate(path)
    window.scrollTo({ top: 0, behavior: "smooth" })
    if (isPhoneView && isOpen) toggleOpen()
  }
  
  return { handleNavigate }
}

export default useAppNavigation