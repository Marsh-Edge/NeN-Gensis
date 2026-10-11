import { NextResponse } from "next/server"
import { fetchWithTimeout, readJson, toErrorResponse } from "@/lib/api"

export async function POST(req: Request) {
  try {
    const { width, height } = await readJson(req)
    const w = typeof width === "number" && width > 0 && width <= 4000 ? Math.floor(width) : 400
    const h = typeof height === "number" && height > 0 && height <= 4000 ? Math.floor(height) : 300

    const id = Math.floor(Math.random() * 500)

    const infoRes = await fetchWithTimeout(`https://picsum.photos/id/${id}/info`, {
      headers: { Accept: "application/json" },
    })

    let author = "Random"
    if (infoRes.ok) {
      const info = await infoRes.json()
      author = info.author ?? "Random"
    }

    return NextResponse.json({
      url: `https://picsum.photos/id/${id}/${w}/${h}`,
      width: w,
      height: h,
      author,
      downloadUrl: `https://picsum.photos/id/${id}/${w}/${h}`,
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}