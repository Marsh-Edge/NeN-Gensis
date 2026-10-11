import { ToolPage } from "@/components/ToolPage"
import { ColorToolsWidget } from "@/components/ColorToolsWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("color-tools")

export default function ColorToolsPage() {
  return <ToolPage slug="color-tools" widget={<ColorToolsWidget />} />
}
