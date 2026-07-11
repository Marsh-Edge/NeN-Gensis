import { NextResponse } from "next/server"

const API_URL = "https://api.frankfurter.app"

const SUPPORTED_CURRENCIES = [
  "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP",
  "HKD", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR",
  "NOK", "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "USD",
  "ZAR",
]

export async function POST(req: Request) {
  try {
    const { amount, from, to } = await req.json()

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      )
    }

    const fromCurrency = (from ?? "").toString().toUpperCase().trim()
    const toCurrency = (to ?? "").toString().toUpperCase().trim()

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
      return
    }

    const res = await fetch(
      `${API_URL}/latest?from=${fromCurrency}&to=${toCurrency}`
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch exchange rates" },
        { status: 502 }
      )
    }

    const data = await res.json()

    const rate = data.rates[toCurrency]
    if (rate === undefined) {
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
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/currencies`)

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch currencies" },
        { status: 502 }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
