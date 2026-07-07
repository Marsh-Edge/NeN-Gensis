import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { UuidGeneratorWidget } from "@/components/UuidGeneratorWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function UuidGeneratorPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/development">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="uuid-generator" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">UUID Generator</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Generate UUID v4 identifiers — single or batch, copy to clipboard.</p>
      </div>

      <UuidGeneratorWidget />

      <ApiGuide
        endpoint="POST /api/uuid-generator"
        method="POST"
        requestBody='{ "count": 5 }'
        exampleResponse={`{
  "uuids": [
    "550e8400-e29b-41d4-a716-446655440000",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
  ]
}`}
        sourceUrl=""
        sourceLabel="Client-side generation"
      />
    </div>
  )
}
