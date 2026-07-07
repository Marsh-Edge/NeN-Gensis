"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Info, GitBranch } from "lucide-react"
import { cn } from "@/lib/utils"
import { categories, categoryDotColors } from "@/lib/constants"
import { CategoryIcon } from "@/lib/icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 h-screen fixed left-0 top-0 z-30 glass border-r border-white/5">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
            N
          </div>
          <span className="text-lg font-semibold text-foreground">NeN-Gensis</span>
        </Link>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {categories.map((cat) => {
            const isActive = pathname === `/categories/${cat.slug}`
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <span className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  categoryDotColors[cat.slug]
                )} />
                <CategoryIcon slug={cat.slug} />
                <span>{cat.name}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-4 space-y-2">
        <Link
          href="/about"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200",
            pathname === "/about"
              ? "bg-white/10 text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          )}
        >
          <Info className="w-4 h-4" />
          <span>About</span>
        </Link>
        <a
          href="https://github.com/Marsh-Edge"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
        >
          <GitBranch className="w-4 h-4" />
          <span>@Marsh-Edge</span>
        </a>
      </div>
    </aside>
  )
}
