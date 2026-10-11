import { ToolPage } from "@/components/ToolPage"
import { SpaceWidget } from "@/components/SpaceWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("space")

export default function SpacePage() {
  return <ToolPage slug="space" widget={<SpaceWidget />} />
}
