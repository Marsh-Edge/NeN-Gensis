import { ToolPage } from "@/components/ToolPage"
import { DictionaryWidget } from "@/components/DictionaryWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("dictionary")

export default function DictionaryPage() {
  return <ToolPage slug="dictionary" widget={<DictionaryWidget />} />
}
