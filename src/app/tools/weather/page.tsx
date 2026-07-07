import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { WeatherWidget } from "@/components/WeatherWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function WeatherPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/general">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="weather" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Weather
          </h1>
          <Badge variant="success" className="text-[10px]">
            Free • No API Key
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Get current weather conditions and a 3-day forecast for any city worldwide.
        </p>
      </div>

      <WeatherWidget />

      <ApiGuide
        endpoint="POST /api/weather"
        method="POST"
        requestBody='{ "city": "London" }'
        exampleResponse={`{
  "city": "London",
  "country": "GB",
  "temperature": 15,
  "condition": "Partly Cloudy",
  "humidity": 72,
  "windSpeed": 12.5,
  "forecast": [...]
}`}
        sourceUrl="https://open-meteo.com"
        sourceLabel="Open-Meteo Weather API"
      />
    </div>
  )
}
