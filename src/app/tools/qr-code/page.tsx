import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { QrCodeWidget } from "@/components/QrCodeWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function QrCodePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/general">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="qr-code" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            QR Code Generator
          </h1>
          <Badge variant="success" className="text-[10px]">
            Free • No API Key
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Generate QR codes from any text or URL. Download as PNG.
        </p>
      </div>

      <QrCodeWidget />

      <ApiGuide
        endpoint="POST /api/qr-code"
        method="POST"
        requestBody='{ "data": "https://example.com", "size": 250 }'
        exampleResponse="(binary PNG image data)"
        sourceUrl="https://goqr.me/api"
        sourceLabel="goQR.me API"
      />
    </div>
  )
}
