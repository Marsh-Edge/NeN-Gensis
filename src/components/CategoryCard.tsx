import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CategoryIcon } from "@/lib/icons"
import type { Category } from "@/lib/types"
import { getToolsByCategory } from "@/lib/constants"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const tools = getToolsByCategory(category.slug)
  const activeTools = tools.filter((t) => t.status === "active")
  const comingSoon = tools.filter((t) => t.status === "coming-soon")

  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="glass-hover group cursor-pointer h-full overflow-hidden relative">
        <div className={`h-1.5 w-full bg-gradient-to-r ${category.accent}`} />

        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.accent} flex items-center justify-center shadow-lg`}>
              <CategoryIcon slug={category.slug} className="w-6 h-6 text-white" />
            </div>
            <Badge variant="glass" className="text-xs">
              {activeTools.length} active
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-1">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {category.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {activeTools.map((tool) => (
              <Badge key={tool.slug} variant="success" className="text-[10px]">
                {tool.name}
              </Badge>
            ))}
            {comingSoon.length > 0 && (
              <Badge variant="glass" className="text-[10px]">
                +{comingSoon.length} more
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
            <span>{tools.length} tools</span>
            <span>{activeTools.length} available now</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
