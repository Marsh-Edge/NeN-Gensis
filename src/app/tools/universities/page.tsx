import { ToolPage } from "@/components/ToolPage"
import { UniversitiesWidget } from "@/components/UniversitiesWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("universities")

export default function UniversitiesPage() {
  return <ToolPage slug="universities" widget={<UniversitiesWidget />} />
}
