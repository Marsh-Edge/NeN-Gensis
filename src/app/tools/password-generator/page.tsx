import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { PasswordGeneratorWidget } from "@/components/PasswordGeneratorWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function PasswordGeneratorPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/general">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="password-generator" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Password Generator
          </h1>
          <Badge variant="success" className="text-[10px]">
            Free • No API Key
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Create strong, secure passwords with customizable length and character types.
        </p>
      </div>

      <PasswordGeneratorWidget />

      <ApiGuide
        endpoint="POST /api/password-generator"
        method="POST"
        requestBody='{ "length": 16, "numbers": true, "symbols": true }'
        exampleResponse={`{
  "password": "aB3#kL9$xQ2@mN7&"
}`}
        sourceUrl=""
        sourceLabel="Client-side generation"
      />
    </div>
  )
}
