import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { CountriesWidget } from "@/components/CountriesWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function CountriesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/data">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="countries" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Countries</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Search for any country — capital, currency, flag, population, and more.
        </p>
      </div>

      <CountriesWidget />

      <ApiGuide
        endpoint="POST /api/countries"
        method="POST"
        requestBody='{ "search": "France" }'
        exampleResponse={`{
  "name": "France",
  "capital": "Paris",
  "currency": "EUR",
  "population": 67391582,
  "flag": "https://flagcdn.com/fr.svg"
}`}
        sourceUrl="https://restcountries.com"
        sourceLabel="REST Countries API"
      />
    </div>
  )
}
