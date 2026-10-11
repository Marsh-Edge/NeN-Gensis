import { ToolPage } from "@/components/ToolPage"
import { PypiPackageWidget } from "@/components/PypiPackageWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("pypi-package")

export default function PypiPackagePage() {
  return <ToolPage slug="pypi-package" widget={<PypiPackageWidget />} />
}
