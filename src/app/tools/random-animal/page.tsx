import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { RandomAnimalWidget } from "@/components/RandomAnimalWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function RandomAnimalPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/media">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="random-animal" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Random Animals</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Random cat and fox images — fun for testing, design mockups, and more.</p>
      </div>

      <RandomAnimalWidget />

      <ApiGuide
        endpoint="POST /api/random-animal"
        method="POST"
        requestBody='{ "type": "cat" }'
        exampleResponse={`{
  "type": "cat",
  "imageUrl": "https://cataas.com/cat/60",
  "tags": ["cute"]
}`}
        sourceUrl="https://cataas.com"
        sourceLabel="Cataas & RandomFox APIs"
      />
    </div>
  )
}
