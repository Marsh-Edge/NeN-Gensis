import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { PypiPackageWidget } from "@/components/PypiPackageWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function PypiPackagePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/development">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="pypi-package" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">PyPI Lookup</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Look up Python packages on PyPI — version, author, and requirements.</p>
      </div>

      <PypiPackageWidget />

      <ApiGuide
        endpoint="POST /api/pypi-package"
        method="POST"
        requestBody='{ "package": "requests" }'
        exampleResponse={`{
  "name": "requests",
  "version": "2.31.0",
  "summary": "Python HTTP for Humans.",
  "author": "Kenneth Reitz",
  "requiresPython": ">=3.7"
}`}
        sourceUrl="https://pypi.org"
        sourceLabel="PyPI JSON API"
      />
    </div>
  )
}
