import { NextResponse } from "next/server"
import { fetchWithTimeout, readJson, toErrorResponse } from "@/lib/api"

const VALID_STYLES = ["avataaars", "bottts", "identicon", "initials", "lorelei", "adventurer", "big-ears", "big-smile", "croodles", "fun-emoji", "icons", "lorelei-neutral", "micah", "miniavs", "notionists", "open-peeps", "personas", "pixel-art", "rings", "shapes", "thumbs"]

export async function POST(req: Request) {
  try {
    const { seed, style } = await readJson(req)

    if (!seed || typeof seed !== "string" || !seed.trim()) {
      return NextResponse.json({ error: "Seed is required" }, { status: 400 })
    }

    const s = (typeof style === "string" ? style : "avataaars").toLowerCase()
    const finalStyle = VALID_STYLES.includes(s) ? s : "avataaars"
    const finalSeed = encodeURIComponent(seed.trim())

    const res = await fetchWithTimeout(`https://api.dicebear.com/7.x/${finalStyle}/svg?seed=${finalSeed}`, {
      headers: { "Accept": "image/svg+xml" },
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to generate avatar" }, { status: 502 })
    }

    const svg = await res.text()

    return NextResponse.json({
      svg,
      seed: seed.trim(),
      style: finalStyle,
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}
