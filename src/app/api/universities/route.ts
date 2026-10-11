import { NextResponse } from "next/server"
import { fetchWithTimeout, readJson, toErrorResponse } from "@/lib/api"

// universities.hipolabs.com does not serve HTTPS on port 443, so this upstream
// is HTTP-only. The payload is public, non-sensitive data.
const API_URL = "http://universities.hipolabs.com/search"

export async function POST(req: Request) {
  try {
    const { name, country } = await readJson(req)
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "University name is required" }, { status: 400 })
    }

    const params = new URLSearchParams({ name: name.trim() })
    if (country && typeof country === "string" && country.trim()) {
      params.set("country", country.trim())
    }

    const res = await fetchWithTimeout(`${API_URL}?${params}`, {
      headers: { "Accept": "application/json" },
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch universities" }, { status: 502 })
    }

    const data = await res.json()

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: "No universities found" }, { status: 404 })
    }

    const results = data.map((u: Record<string, unknown>) => ({
      name: u.name ?? "",
      country: u.country ?? "",
      domains: u.domains ?? [],
      webPages: u.web_pages ?? [],
    }))

    return NextResponse.json({ results })
  } catch (err) {
    return toErrorResponse(err)
  }
}
