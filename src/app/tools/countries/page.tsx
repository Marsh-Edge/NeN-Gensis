import { ToolPage } from "@/components/ToolPage"
import { CountriesWidget } from "@/components/CountriesWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("countries")

export default function CountriesPage() {
  return <ToolPage slug="countries" widget={<CountriesWidget />} />
}
