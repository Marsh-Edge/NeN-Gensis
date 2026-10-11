import { ToolPage } from "@/components/ToolPage"
import { PasswordGeneratorWidget } from "@/components/PasswordGeneratorWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("password-generator")

export default function PasswordGeneratorPage() {
  return <ToolPage slug="password-generator" widget={<PasswordGeneratorWidget />} />
}
