"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-foreground/10 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-foreground/60 group-hover:text-cyan-400 transition-colors" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-600 group-hover:text-cyan-700 transition-colors" aria-hidden="true" />
      )}
    </button>
  )
}
