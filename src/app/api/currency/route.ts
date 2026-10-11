import { NextResponse } from "next/server"
import { fetchWithTimeout, readJson, toErrorResponse } from "@/lib/api"

const API_URL = "https://api.frankfurter.app"

const SUPPORTED_CURRENCIES = [
  "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP",
  "HKD", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR",
  "NOK", "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "USD",
  "ZAR",
]

export const revalidate = 86400

export async function POST(req: Request) {
  try {
    const { amount, from, to } = await readJson(req)

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      )
    }

    const fromCurrency = String(from ?? "").toUpperCase().trim()
    const toCurrency = String(to ?? "").toUpperCase().trim()

    if (!fromCurrency || !toCurrency) {
      return NextResponse.json(
        { error: "Both 'from' and 'to' currencies are required" },
        { status: 400 }
      )
    }

    if (!SUPPORTED_CURRENCIES.includes(fromCurrency) || !SUPPORTED_CURRENCIES.includes(toCurrency)) {
      return NextResponse.json(
        { error: `Unsupported currency. Supported: ${SUPPORTED_CURRENCIES.join(", ")}` },
        { status: 400 }
      )
    }

    if (fromCurrency === toCurrency) {
      return NextResponse.json({
        amount,
        from: fromCurrency,
        to: toCurrency,
        rate: 1,
        result: Math.round(amount * 100) / 100,
      })
    }

    const res = await fetchWithTimeout(
      `${API_URL}/latest?from=${fromCurrency}&to=${toCurrency}`
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch exchange rates" },
        { status: 502 }
      )
    }

    const data = await res.json()
    const rates = data?.rates as Record<string, number> | undefined
    const rate = rates?.[toCurrency]

    if (typeof rate !== "number" || isNaN(rate)) {
      return NextResponse.json(
        { error: `Rate not available for ${toCurrency}` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      amount,
      from: fromCurrency,
      to: toCurrency,
      rate: Math.round(rate * 10000) / 10000,
      result: Math.round(amount * rate * 100) / 100,
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}

export async function GET() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/currencies`)

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch currencies" },
        { status: 502 }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}