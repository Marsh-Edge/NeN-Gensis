import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { UniversitiesWidget } from "@/components/UniversitiesWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function UniversitiesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/data">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="universities" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Universities</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Find universities and colleges worldwide by name and optional country filter.
        </p>
      </div>

      <UniversitiesWidget />

      <ApiGuide
        endpoint="POST /api/universities"
        method="POST"
        requestBody='{ "name": "Harvard", "country": "United States" }'
        exampleResponse={`{
  "results": [
    { "name": "Harvard University", "country": "United States", "domains": ["harvard.edu"], "webPages": ["https://www.harvard.edu"] }
  ]
}`}
        sourceUrl="https://hipolabs.com/univ"
        sourceLabel="Hipolabs Universities API"
      />
    </div>
  )
}
