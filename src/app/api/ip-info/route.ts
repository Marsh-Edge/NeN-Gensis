import { NextResponse } from "next/server"
import { fetchWithTimeout, readJson, toErrorResponse } from "@/lib/api"

// ipwho.is is HTTPS + free + keyless. ip-api.com's free tier is HTTP-only,
// which would expose lookups to interception.
const API_URL = "https://ipwho.is"

export async function POST(req: Request) {
  try {
    const { ip } = await readJson(req)
    const queryIp =
      ip && typeof ip === "string" && ip.trim() ? encodeURIComponent(ip.trim()) : ""

    const res = await fetchWithTimeout(`${API_URL}/${queryIp}`, {
      headers: { Accept: "application/json" },
    })

    const data = await res.json().catch(() => null)

    if (!res.ok || !data || data.success === false) {
      const isClientError = res.status === 404
      return NextResponse.json(
        { error: data?.message || "Invalid IP address or domain" },
        { status: isClientError ? 404 : 502 }
      )
    }

    return NextResponse.json({
      ip: data.ip,
      status: "success" as const,
      country: data.country ?? "",
      countryCode: data.country_code ?? "",
      region: data.region_code ?? data.region ?? "",
      regionName: data.region ?? "",
      city: data.city ?? "",
      zip: data.postal ?? "",
      lat: data.latitude ?? 0,
      lon: data.longitude ?? 0,
      timezone: data.timezone?.id ?? "",
      isp: data.connection?.isp ?? "",
      org: data.connection?.org ?? "",
      as: data.connection?.asn ? `AS${data.connection.asn}` : "",
      reverse: data.connection?.domain ?? "",
      mobile: false,
      proxy: data.security?.proxy ?? false,
      hosting: data.security?.hosting ?? false,
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}