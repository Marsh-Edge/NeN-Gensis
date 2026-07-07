import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { GitHubProfileWidget } from "@/components/GitHubProfileWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function GitHubProfilePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/development">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="github-profile" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">GitHub Profile</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Look up any GitHub user — profile info, stats, and top repositories.</p>
      </div>

      <GitHubProfileWidget />

      <ApiGuide
        endpoint="POST /api/github-profile"
        method="POST"
        requestBody='{ "username": "octocat" }'
        exampleResponse={`{
  "login": "octocat",
  "name": "The Octocat",
  "publicRepos": 8,
  "followers": 9000,
  "repos": [...]
}`}
        sourceUrl="https://docs.github.com/en/rest"
        sourceLabel="GitHub REST API"
      />
    </div>
  )
}
