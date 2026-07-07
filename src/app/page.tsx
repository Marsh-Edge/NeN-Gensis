import { CategoryCard } from "@/components/CategoryCard"
import { Badge } from "@/components/ui/badge"
import { categories, apiTools } from "@/lib/constants"
import { GitBranch } from "lucide-react"

export default function Home() {
  const activeToolCount = apiTools.filter((t) => t.status === "active").length

  return (
    <div className="space-y-8">
      <div className="glass-strong rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-3xl sm:text-4xl font-bold neon-text">
              NeN-Gensis
            </h1>
            <Badge variant="glass" className="text-[10px]">
              Beta
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mb-6">
            Free, categorized API tools for everyday tasks — weather, networking, data lookup, and more. No registration required.
          </p>

          <div className="flex items-center justify-center gap-6 sm:gap-10">
            <div>
              <div className="text-2xl font-bold neon-text">{categories.length}</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground">{activeToolCount}</div>
              <div className="text-xs text-muted-foreground">Active Tools</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground">Free</div>
              <div className="text-xs text-muted-foreground">Always</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shrink-0">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-foreground text-sm font-medium mb-1">
              Built by Marsh-Edge
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              NeN-Gensis is a free, open-source API hub. Browse and use APIs directly — no signup, no rate limits.
            </p>
          </div>
          <a
            href="https://github.com/Marsh-Edge"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:ml-auto"
          >
            <Badge variant="glass" className="text-xs cursor-pointer hover:bg-white/10 transition-colors">
              @Marsh-Edge
            </Badge>
          </a>
        </div>
      </div>
    </div>
  )
}
