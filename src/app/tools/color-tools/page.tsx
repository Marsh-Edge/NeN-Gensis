import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { ColorToolsWidget } from "@/components/ColorToolsWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function ColorToolsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/media">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="color-tools" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Color Tools</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Convert between HEX, RGB, HSL — preview colors and generate tinted palettes.</p>
      </div>

      <ColorToolsWidget />

      <ApiGuide
        endpoint="POST /api/color-tools"
        method="POST"
        requestBody='{ "hex": "#ff6b6b" }'
        exampleResponse={`{
  "hex": "#ff6b6b",
  "rgb": { "r": 255, "g": 107, "b": 107 },
  "hsl": { "h": 0, "s": 100, "l": 71 }
}`}
        sourceUrl=""
        sourceLabel="Client-side conversion"
      />
    </div>
  )
}
