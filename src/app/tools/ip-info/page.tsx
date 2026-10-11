import { ToolPage } from "@/components/ToolPage"
import { IpInfoWidget } from "@/components/IpInfoWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("ip-info")

export default function IpInfoPage() {
  return <ToolPage slug="ip-info" widget={<IpInfoWidget />} />
}
