import { ToolPage } from "@/components/ToolPage"
import { NpmPackageWidget } from "@/components/NpmPackageWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("npm-package")

export default function NpmPackagePage() {
  return <ToolPage slug="npm-package" widget={<NpmPackageWidget />} />
}
