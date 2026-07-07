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

  return (
    <Link href={isDisabled ? "#" : `/tools/${tool.slug}`}>
      <Card
        className={`glass-hover group cursor-pointer h-full overflow-hidden ${
          isDisabled ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {category && (
          <div className={`h-1 w-full bg-gradient-to-r ${category.accent}`} />
        )}
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300">
              {tool.name}
            </h3>
            <Badge
              variant={isDisabled ? "glass" : "success"}
              className="text-[10px]"
            >
              {isDisabled ? "Coming Soon" : "Active"}
            </Badge>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            {tool.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
