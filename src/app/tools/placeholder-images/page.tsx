import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { PlaceholderWidget } from "@/components/PlaceholderWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function PlaceholderPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/media">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="placeholder-images" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Placeholder Images</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Generate random placeholder images by picsum.photos with custom dimensions.</p>
      </div>

      <PlaceholderWidget />

      <ApiGuide
        endpoint="POST /api/placeholder-images"
        method="POST"
        requestBody='{ "width": 800, "height": 600 }'
        exampleResponse={`{
  "url": "https://picsum.photos/id/123/800/600",
  "width": 800,
  "height": 600,
  "author": "John Doe"
}`}
        sourceUrl="https://picsum.photos"
        sourceLabel="Lorem Picsum API"
      />
    </div>
  )
}
