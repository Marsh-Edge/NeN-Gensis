"use client"

import { usePathname } from "next/navigation"
import { MobileSidebar } from "./MobileSidebar"
import { ThemeToggle } from "./ThemeToggle"

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/categories": "Categories",
}

export function TopBar() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? ""

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 glass border-b border-white/5">
      <div className="flex items-center h-14 px-4 gap-3">
        <MobileSidebar />
        <h1 className="text-sm font-semibold text-foreground flex-1">
          {title || "NeN-Gensis"}
        </h1>
        <ThemeToggle />
      </div>
    </header>
  )
}
