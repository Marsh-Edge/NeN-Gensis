import { NextResponse } from "next/server"

const API_URL = "https://api.qrserver.com/v1/create-qr-code/"

export async function POST(req: Request) {
  try {
    const { data, size } = await req.json()

    if (!data || typeof data !== "string" || !data.trim()) {
      return NextResponse.json(
        { error: "Text or URL is required" },
        { status: 400 }
      )
    }

    const qrSize = Math.min(Math.max(parseInt(size) || 200, 100), 500)
    const encoded = encodeURIComponent(data.trim())

    const res = await fetch(
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
        "Content-Disposition": `attachment; filename="qrcode.png"`,
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
