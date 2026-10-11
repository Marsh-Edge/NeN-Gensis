import { ToolPage } from "@/components/ToolPage"
import { GitHubProfileWidget } from "@/components/GitHubProfileWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("github-profile")

export default function GitHubProfilePage() {
  return <ToolPage slug="github-profile" widget={<GitHubProfileWidget />} />
}
