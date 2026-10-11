import { ToolPage } from "@/components/ToolPage"
import { QrCodeWidget } from "@/components/QrCodeWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("qr-code")

export default function QrCodePage() {
  return <ToolPage slug="qr-code" widget={<QrCodeWidget />} />
}
