"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-all duration-200 group"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-white/60 group-hover:text-cyan-400 transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-600 group-hover:text-cyan-700 transition-colors" />
      )}
    </button>
  )
}
