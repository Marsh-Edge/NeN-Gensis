import { ToolPage } from "@/components/ToolPage"
import { WeatherWidget } from "@/components/WeatherWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("weather")

export default function WeatherPage() {
  return <ToolPage slug="weather" widget={<WeatherWidget />} />
}
