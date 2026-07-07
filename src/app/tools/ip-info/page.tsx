import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { IpInfoWidget } from "@/components/IpInfoWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function IpInfoPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/security">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="ip-info" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            IP Info
          </h1>
          <Badge variant="success" className="text-[10px]">
            Free • No API Key
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Look up geolocation, network provider, and security details for any IP address or domain.
        </p>
      </div>

      <IpInfoWidget />

      <ApiGuide
        endpoint="POST /api/ip-info"
        method="POST"
        requestBody='{ "ip": "8.8.8.8" }'
        exampleResponse={`{
  "ip": "8.8.8.8",
  "country": "United States",
  "city": "Mountain View",
  "isp": "Google LLC",
  "org": "Google Public DNS",
  "lat": 37.4056,
  "lon": -122.0775
}`}
        sourceUrl="https://ip-api.com"
        sourceLabel="ip-api.com"
      />
    </div>
  )
}
