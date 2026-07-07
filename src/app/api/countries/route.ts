import { NextResponse } from "next/server"

const NOW_URL = "https://countriesnow.space/api/v0.1"

export async function POST(req: Request) {
  try {
    const { country } = await req.json()
    if (!country || typeof country !== "string" || !country.trim()) {
      return NextResponse.json({ error: "Country name is required" }, { status: 400 })
    }
    const name = country.trim().toLowerCase()

    const [capitalRes, currencyRes, flagRes, populationRes, positionsRes] = await Promise.allSettled([
      fetch(`${NOW_URL}/countries/capital`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: name }),
      }),
      fetch(`${NOW_URL}/countries/currency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: name }),
      }),
      fetch(`${NOW_URL}/countries/flag/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: name }),
      }),
      fetch(`${NOW_URL}/countries/population`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: name }),
      }),
      fetch(`${NOW_URL}/countries/positions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: name }),
      }),
    ])

    const capitalData = capitalRes.status === "fulfilled" ? await capitalRes.value.json() : null
    const currencyData = currencyRes.status === "fulfilled" ? await currencyRes.value.json() : null
    const flagData = flagRes.status === "fulfilled" ? await flagRes.value.json() : null
    const populationData = populationRes.status === "fulfilled" ? await populationRes.value.json() : null
    const positionsData = positionsRes.status === "fulfilled" ? await positionsRes.value.json() : null

    if (!capitalData?.data && !currencyData?.data && !flagData?.data && !populationData?.data && !positionsData?.data) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 })
    }

    const c = capitalData?.data ?? {}
    const cu = currencyData?.data ?? {}
    const f = flagData?.data ?? {}
    const p = populationData?.data ?? {}
    const po = positionsData?.data ?? {}

    const popCounts = p.populationCounts ?? []
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
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
