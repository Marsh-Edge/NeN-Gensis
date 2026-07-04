import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
      <Card className="glass-hover group cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <span className="text-3xl">{category.icon}</span>
            <Badge variant="glass" className="text-xs">
              {activeTools.length} active
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1.5">
            {category.name}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed mb-4">
            {category.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
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
        </CardContent>
      </Card>
    </Link>
  )
}
