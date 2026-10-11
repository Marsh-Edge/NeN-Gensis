import { NextResponse } from "next/server"
import { fetchWithTimeout, readJson, toErrorResponse } from "@/lib/api"

const NOW_URL = "https://countriesnow.space/api/v0.1"

async function parseSettled(
  result: PromiseSettledResult<Response>
): Promise<Record<string, unknown> | null> {
  if (result.status !== "fulfilled") return null
  const res = result.value
  if (!res.ok) {
    await res.body?.cancel()
    return null
  }
  return res.json().catch(() => null)
}

export async function POST(req: Request) {
  try {
    const { country } = await readJson(req)
    if (!country || typeof country !== "string" || !country.trim()) {
      return NextResponse.json({ error: "Country name is required" }, { status: 400 })
    }
    const name = country.trim().toLowerCase()

    const endpoints = [
      `${NOW_URL}/countries/capital`,
      `${NOW_URL}/countries/currency`,
      `${NOW_URL}/countries/flag/images`,
      `${NOW_URL}/countries/population`,
      `${NOW_URL}/countries/positions`,
    ]

    const settled = await Promise.allSettled(
      endpoints.map((url) =>
        fetchWithTimeout(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: name }),
        })
      )
    )

    const [capitalData, currencyData, flagData, populationData, positionsData] =
      await Promise.all(settled.map(parseSettled))

    if (!capitalData?.data && !currencyData?.data && !flagData?.data && !populationData?.data && !positionsData?.data) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 })
    }

    const c = (capitalData?.data ?? {}) as Record<string, unknown>
    const cu = (currencyData?.data ?? {}) as Record<string, unknown>
    const f = (flagData?.data ?? {}) as Record<string, unknown>
    const p = (populationData?.data ?? {}) as Record<string, unknown>
    const po = (positionsData?.data ?? {}) as Record<string, unknown>

    const popCounts = Array.isArray(p.populationCounts) ? p.populationCounts : []
    const latestPop = popCounts.length > 0 ? popCounts[popCounts.length - 1] : {}

    return NextResponse.json({
      name: c.name ?? cu.name ?? f.name ?? p.name ?? po.name ?? country.trim(),
      capital: c.capital ?? "",
      iso2: c.iso2 ?? f.iso2 ?? "",
      iso3: c.iso3 ?? f.iso3 ?? "",
      currency: cu.currency ?? "",
      flag: f.flag ?? "",
      lat: po.lat ?? null,
      lng: po.long ?? po.lng ?? null,
      population: latestPop.value ?? null,
      populationYear: latestPop.year ?? null,
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}