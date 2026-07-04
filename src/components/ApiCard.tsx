import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ApiTool } from "@/lib/types"

interface ApiCardProps {
  tool: ApiTool
}

export function ApiCard({ tool }: ApiCardProps) {
  const isDisabled = tool.status === "coming-soon"

  return (
    <Link href={isDisabled ? "#" : `/tools/${tool.slug}`}>
      <Card
        className={`glass-hover group cursor-pointer h-full ${
          isDisabled ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
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
