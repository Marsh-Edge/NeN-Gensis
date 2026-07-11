"use client"

import { useState } from "react"
import { ArrowRightLeft, Loader2, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { CurrencyData } from "@/lib/types"

const CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "KRW", name: "South Korean Won" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "DKK", name: "Danish Krone" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "ZAR", name: "South African Rand" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "THB", name: "Thai Baht" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "ISK", name: "Icelandic Krona" },
  { code: "ILS", name: "Israeli Shekel" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "RON", name: "Romanian Leu" },
]

function CurrencySelect({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (val: string) => void
  label: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-foreground/40">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded-xl border border-border bg-background/50 px-3 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/40"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} — {c.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export function CurrencyConverterWidget() {
  const [amount, setAmount] = useState("100")
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("EUR")
  const [data, setData] = useState<CurrencyData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleConvert(e: React.FormEvent) {
    e.preventDefault()
    const num = parseFloat(amount)
    if (isNaN(num) || num <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/currency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: num, from, to }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Conversion failed")
        return
      }
      setData(json)
    } catch {
      setError("Failed to convert currency")
    } finally {
      setLoading(false)
    }
  }

  function swapCurrencies() {
    setFrom(to)
    setTo(from)
    setData(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-5">
          <form onSubmit={handleConvert} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs text-foreground/40">Amount</label>
              <Input
                type="number"
                min="0"
                step="any"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-base font-mono"
              />
            </div>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <CurrencySelect value={from} onChange={setFrom} label="From" />
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="mb-0.5 shrink-0"
                onClick={swapCurrencies}
                title="Swap currencies"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>

              <div className="flex-1">
                <CurrencySelect value={to} onChange={setTo} label="To" />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !amount}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <DollarSign className="h-4 w-4 mr-2" />}
              Convert
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card>
          <CardContent className="p-4 text-sm text-red-400">
            {error}
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {!loading && data && (
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-sm text-foreground/40">Conversion Result</p>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-foreground">
                {data.result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {data.to}
              </p>
              <p className="text-sm text-foreground/50">
                {data.amount.toLocaleString()} {data.from} = {data.result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {data.to}
              </p>
            </div>
            <div className="glass rounded-xl px-4 py-3 inline-block">
              <p className="text-xs text-foreground/40">Exchange Rate</p>
              <p className="text-sm font-mono font-semibold text-foreground">
                1 {data.from} = {data.rate.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} {data.to}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <DollarSign className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Enter an amount and select currencies to convert
            </p>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-foreground/30 text-center">
        Powered by Frankfurter (ECB data, free, no API key needed)
      </p>
    </div>
  )
}
