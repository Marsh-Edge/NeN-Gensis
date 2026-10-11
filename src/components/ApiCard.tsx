import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ApiTool } from "@/lib/types"
import { getCategory } from "@/lib/constants"

interface ApiCardProps {
  tool: ApiTool
}

export function ApiCard({ tool }: ApiCardProps) {
  const isDisabled = tool.status === "coming-soon"
  const category = getCategory(tool.categorySlug)

  const card = (
    <Card
      className={`glass-hover h-full overflow-hidden ${
        isDisabled ? "opacity-60" : "group cursor-pointer"
      }`}
    >
      {category && (
        <div className={`h-1 w-full bg-gradient-to-r ${category.accent}`} />
      )}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3 gap-3">
          <h2 className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
            {tool.name}
          </h2>
          <Badge
            variant={isDisabled ? "glass" : "success"}
            className="text-[10px] shrink-0"
          >
            {isDisabled ? "Coming Soon" : "Active"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
      </CardContent>
    </Card>
  )

  if (isDisabled) {
    return (
      <div aria-disabled="true" className="block">
        {card}
      </div>
    )
  }

  return (
    <Link href={`/tools/${tool.slug}`} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      {card}
    </Link>
  )
}
