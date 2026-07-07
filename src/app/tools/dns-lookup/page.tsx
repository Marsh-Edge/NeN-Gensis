import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { DnsLookupWidget } from "@/components/DnsLookupWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function DnsLookupPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/security">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="dns-lookup" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            DNS Lookup
          </h1>
          <Badge variant="success" className="text-[10px]">
            Free • No API Key
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Resolve DNS records for any domain — A, AAAA, MX, NS, TXT, CNAME, and SOA.
        </p>
      </div>

      <DnsLookupWidget />

      <ApiGuide
        endpoint="POST /api/dns-lookup"
        method="POST"
        requestBody='{ "domain": "example.com", "type": 1 }'
        exampleResponse={`{
  "domain": "example.com",
  "records": [
    { "name": "example.com", "type": 1, "typeLabel": "A", "TTL": 3600, "data": "93.184.216.34" }
  ]
}`}
        sourceUrl="https://dns.google"
        sourceLabel="Google DNS-over-HTTPS"
      />
    </div>
  )
}
