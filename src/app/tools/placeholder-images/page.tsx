import { ToolPage } from "@/components/ToolPage"
import { PlaceholderWidget } from "@/components/PlaceholderWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("placeholder-images")

export default function PlaceholderImagesPage() {
  return <ToolPage slug="placeholder-images" widget={<PlaceholderWidget />} />
}
