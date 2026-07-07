import { NextResponse } from "next/server"

const API_URL = "http://ip-api.com/json"

export async function POST(req: Request) {
  try {
    const { ip } = await req.json()
    const queryIp = ip && typeof ip === "string" && ip.trim()
      ? encodeURIComponent(ip.trim())
      : ""

    const fields = "status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,reverse,proxy,hosting,mobile,query"

    const res = await fetch(
      `${API_URL}/${queryIp}?fields=${fields}`,
      { headers: { "Accept": "application/json" } }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch IP data" },
        { status: 502 }
      )
    }

    const data = await res.json()

    if (data.status === "fail") {
      return NextResponse.json(
        { error: data.message || "Invalid IP address or domain" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ip: data.query,
      status: data.status,
      country: data.country,
      countryCode: data.countryCode,
      region: data.region,
      regionName: data.regionName,
      city: data.city,
      zip: data.zip ?? "",
      lat: data.lat,
      lon: data.lon,
      timezone: data.timezone,
      isp: data.isp,
      org: data.org,
      as: data.as,
      reverse: data.reverse ?? "",
      mobile: data.mobile,
      proxy: data.proxy,
      hosting: data.hosting,
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
