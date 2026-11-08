import { de, is } from "zod/locales";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  isDark: boolean;
  toggleDark: () => void;
}

const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggleDark: () => set((state) => {
        const nextDark = !state.isDark
        document.documentElement.classList.toggle("dark", nextDark)
        return { isDark: nextDark }
      }),
    }),
    {
      name: "theme-storage"
    }
  )
)

export default useTheme
