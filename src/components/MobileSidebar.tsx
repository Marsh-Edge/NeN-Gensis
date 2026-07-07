"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Info, GitBranch } from "lucide-react"
import { cn } from "@/lib/utils"
import { categories, categoryDotColors } from "@/lib/constants"
import { CategoryIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle asChild>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
                N
              </div>
              <span className="text-lg font-semibold text-foreground">NeN-Gensis</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

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

          <Separator className="my-4" />

          <nav className="space-y-1 px-1">
            <Link
              href="/about"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
            >
              <GitBranch className="w-4 h-4" />
              <span>@Marsh-Edge</span>
            </a>
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
