import { CategoryCard } from "@/components/CategoryCard"
import { Badge } from "@/components/ui/badge"
import { categories } from "@/lib/constants"

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Free API Hub
          </h1>
          <Badge variant="glass" className="text-[10px]">
            Beta
          </Badge>
        </div>
        <p className="text-white/50 text-sm sm:text-base">
          Browse {categories.length} categorized collections of free APIs — no registration required
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>

      <div className="glass rounded-2xl p-6 text-center">
        <p className="text-white/40 text-sm leading-relaxed">
          Each category contains free, open APIs you can use directly in your projects.
          <br />
          <span className="text-white/20">New APIs added regularly</span>
        </p>
      </div>
    </div>
  )
}
