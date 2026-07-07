import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { width, height } = await req.json()
    const w = typeof width === "number" && width > 0 && width <= 4000 ? Math.floor(width) : 400
    const h = typeof height === "number" && height > 0 && height <= 4000 ? Math.floor(height) : 300

    const infoRes = await fetch(`https://picsum.photos/id/${Math.floor(Math.random() * 500)}/info`, {
      headers: { "Accept": "application/json" },
    })

    let author = "Random"

    if (infoRes.ok) {
      const info = await infoRes.json()
      author = info.author ?? "Random"
    }

    return NextResponse.json({
      url: `https://picsum.photos/${w}/${h}`,
      width: w,
      height: h,
      author,
      downloadUrl: `https://picsum.photos/${w}/${h}`,
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
