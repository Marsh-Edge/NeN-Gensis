import { ToolPage } from "@/components/ToolPage"
import { RandomAnimalWidget } from "@/components/RandomAnimalWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("random-animal")

export default function RandomAnimalPage() {
  return <ToolPage slug="random-animal" widget={<RandomAnimalWidget />} />
}
