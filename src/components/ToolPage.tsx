import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ApiGuide } from "@/components/ApiGuide"
import { ToolIcon } from "@/lib/icons"
import { getTool } from "@/lib/constants"
import { toolApiDocs } from "@/lib/toolDocs"

export function ToolPage({ slug, widget }: { slug: string; widget: ReactNode }) {
  const tool = getTool(slug)
  if (!tool) notFound()

  const doc = toolApiDocs[slug]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/categories/${tool.categorySlug}`}
            aria-label="Back to category"
          >
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug={slug} className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {tool.name}
          </h1>
          <Badge variant="success" className="text-[10px]">
            Free • No API Key
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          {tool.description}
        </p>
      </div>

      {widget}

      {doc && <ApiGuide {...doc} />}
    </div>
  )
}
