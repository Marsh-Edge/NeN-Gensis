import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { AvatarGeneratorWidget } from "@/components/AvatarGeneratorWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function AvatarGeneratorPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/media">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="avatar-generator" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Avatar Generator</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Create random avatars by seed using DiceBear — multiple artistic styles.</p>
      </div>

      <AvatarGeneratorWidget />

      <ApiGuide
        endpoint="POST /api/avatar-generator"
        method="POST"
        requestBody='{ "seed": "John", "style": "adventurer" }'
        exampleResponse={`{
  "svg": "<svg>...</svg>",
  "seed": "John",
  "style": "adventurer"
}`}
        sourceUrl="https://www.dicebear.com"
        sourceLabel="DiceBear Avatars"
      />
    </div>
  )
}
