import { NextResponse } from "next/server"
import { fetchWithTimeout, toErrorResponse } from "@/lib/api"

// api.open-notify.org does not serve HTTPS on port 443, so this upstream is
// HTTP-only. The payload is public, non-sensitive data and is cached below.
const API_URL = "http://api.open-notify.org/astros.json"

export const revalidate = 600

export async function GET() {
  try {
    const res = await fetchWithTimeout(API_URL, {
      headers: { "Accept": "application/json" },
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch space data" }, { status: 502 })
    }

    const data = await res.json()

    if (data.message !== "success" || !Array.isArray(data.people)) {
      return NextResponse.json({ error: "Failed to fetch space data" }, { status: 502 })
    }

    return NextResponse.json(
      {
        people: data.people.map((p: { name: string; craft: string }) => ({
          name: p.name,
          craft: p.craft,
        })),
        number: data.number,
      },
      { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" } }
    )
  } catch (err) {
    return toErrorResponse(err)
  }
}