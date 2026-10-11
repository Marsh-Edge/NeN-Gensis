import { ToolPage } from "@/components/ToolPage"
import { AvatarGeneratorWidget } from "@/components/AvatarGeneratorWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("avatar-generator")

export default function AvatarGeneratorPage() {
  return <ToolPage slug="avatar-generator" widget={<AvatarGeneratorWidget />} />
}
