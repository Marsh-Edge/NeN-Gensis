import { ToolPage } from "@/components/ToolPage"
import { DnsLookupWidget } from "@/components/DnsLookupWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("dns-lookup")

export default function DnsLookupPage() {
  return <ToolPage slug="dns-lookup" widget={<DnsLookupWidget />} />
}
