"use client"

import { usePathname } from "next/navigation"
import { MobileSidebar } from "./MobileSidebar"
import { ThemeToggle } from "./ThemeToggle"
import { getCategory, getTool } from "@/lib/constants"

function resolveTitle(pathname: string): string {
  if (pathname === "/") return "Home"
  if (pathname === "/categories") return "Categories"
  if (pathname === "/about") return "About"

  const [section, slug] = pathname.split("/").filter(Boolean)
  if (section === "categories" && slug) return getCategory(slug)?.name ?? ""
  if (section === "tools" && slug) return getTool(slug)?.name ?? ""
  return ""
}

export function TopBar() {
  const pathname = usePathname()
  const title = resolveTitle(pathname)

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 glass border-b border-border pt-[env(safe-area-inset-top)]">
      <div className="flex items-center h-14 px-4 gap-3">
        <MobileSidebar />
        <h1 className="text-sm font-semibold text-foreground flex-1 truncate">
          {title || "NeN-Gensis"}
        </h1>
        <ThemeToggle />
      </div>
    </header>
  )
}
