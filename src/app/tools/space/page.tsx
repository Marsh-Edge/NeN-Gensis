import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { SpaceWidget } from "@/components/SpaceWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function SpacePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/data">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="space" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">People in Space</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Live data on who&apos;s currently aboard the ISS and Tiangong space stations.
        </p>
      </div>

      <SpaceWidget />

      <ApiGuide
        endpoint="GET /api/space"
        method="GET"
        exampleResponse={`{
  "number": 7,
  "people": [
    { "name": "Oleg Kononenko", "craft": "ISS" },
    { "name": "Ye Guangfu", "craft": "Tiangong" }
  ]
}`}
        sourceUrl="http://open-notify.org"
        sourceLabel="Open Notify API"
      />
    </div>
  )
}
