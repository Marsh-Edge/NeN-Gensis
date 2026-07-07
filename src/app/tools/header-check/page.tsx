import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { HeaderCheckWidget } from "@/components/HeaderCheckWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function HeaderCheckPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/security">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="header-check" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            HTTP Header Checker
          </h1>
          <Badge variant="success" className="text-[10px]">
            Free • No API Key
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Inspect HTTP response headers of any URL — security policies, caching, CORS, and more.
        </p>
      </div>

      <HeaderCheckWidget />

      <ApiGuide
        endpoint="POST /api/header-check"
        method="POST"
        requestBody='{ "url": "https://example.com" }'
        exampleResponse={`{
  "url": "https://example.com",
  "statusCode": 200,
  "headers": [
    { "key": "Content-Type", "value": "text/html", "security": false },
    { "key": "Strict-Transport-Security", "value": "max-age=31536000", "security": true }
  ]
}`}
        sourceUrl=""
        sourceLabel="Server-side fetch"
      />
    </div>
  )
}
