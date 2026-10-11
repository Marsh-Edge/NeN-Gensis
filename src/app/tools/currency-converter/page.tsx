import { ToolPage } from "@/components/ToolPage"
import { CurrencyConverterWidget } from "@/components/CurrencyConverterWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("currency-converter")

export default function CurrencyConverterPage() {
  return <ToolPage slug="currency-converter" widget={<CurrencyConverterWidget />} />
}
