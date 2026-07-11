import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { CurrencyConverterWidget } from "@/components/CurrencyConverterWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function CurrencyConverterPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/data">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="currency-converter" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Currency Converter
          </h1>
          <Badge variant="success" className="text-[10px]">
            Free • No API Key
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Convert between 30+ currencies with live exchange rates from the European Central Bank.
        </p>
      </div>

      <CurrencyConverterWidget />

      <ApiGuide
        endpoint="POST /api/currency"
        method="POST"
        requestBody='{ "amount": 100, "from": "USD", "to": "EUR" }'
        exampleResponse={`{
  "amount": 100,
  "from": "USD",
  "to": "EUR",
  "rate": 0.9234,
  "result": 92.34
}`}
        sourceUrl="https://frankfurter.app"
        sourceLabel="Frankfurter API (ECB data)"
      />
    </div>
  )
}
