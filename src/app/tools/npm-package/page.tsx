import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { NpmPackageWidget } from "@/components/NpmPackageWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function NpmPackagePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/development">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="npm-package" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">npm Lookup</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Inspect npm packages — version, license, keywords, and dependencies.</p>
      </div>

      <NpmPackageWidget />

      <ApiGuide
        endpoint="POST /api/npm-package"
        method="POST"
        requestBody='{ "package": "express" }'
        exampleResponse={`{
  "name": "express",
  "version": "4.19.2",
  "description": "Fast, unopinionated, minimalist web framework",
  "license": "MIT",
  "keywords": ["web", "framework", "node"]
}`}
        sourceUrl="https://registry.npmjs.org"
        sourceLabel="npm Registry API"
      />
    </div>
  )
}
