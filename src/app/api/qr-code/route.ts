import { NextResponse } from "next/server"
import { fetchWithTimeout, readJson, toErrorResponse } from "@/lib/api"

const API_URL = "https://api.qrserver.com/v1/create-qr-code/"

export async function POST(req: Request) {
  try {
    const { data, size } = await readJson(req)

    if (!data || typeof data !== "string" || !data.trim()) {
      return NextResponse.json(
        { error: "Text or URL is required" },
        { status: 400 }
      )
    }

    const requested = typeof size === "number" && isFinite(size) ? size : parseInt(String(size ?? ""), 10)
    const qrSize = Math.min(Math.max(Number.isFinite(requested) ? requested : 200, 100), 500)
    const encoded = encodeURIComponent(data.trim())

    const res = await fetchWithTimeout(
      `${API_URL}?size=${qrSize}x${qrSize}&data=${encoded}`,
      { headers: { "Accept": "image/png" } }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to generate QR code" },
        { status: 502 }
      )
    }

    const blob = await res.arrayBuffer()

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}
