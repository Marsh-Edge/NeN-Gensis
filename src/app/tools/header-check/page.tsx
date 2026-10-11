import { ToolPage } from "@/components/ToolPage"
import { HeaderCheckWidget } from "@/components/HeaderCheckWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("header-check")

export default function HeaderCheckPage() {
  return <ToolPage slug="header-check" widget={<HeaderCheckWidget />} />
}
