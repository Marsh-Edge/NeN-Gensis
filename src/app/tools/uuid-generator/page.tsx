import { ToolPage } from "@/components/ToolPage"
import { UuidGeneratorWidget } from "@/components/UuidGeneratorWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("uuid-generator")

export default function UuidGeneratorPage() {
  return <ToolPage slug="uuid-generator" widget={<UuidGeneratorWidget />} />
}
