import { NextResponse } from "next/server"
import { fetchWithTimeout, readJson, toErrorResponse } from "@/lib/api"

export async function POST(req: Request) {
  try {
    const { type } = await readJson(req)
    const animalType = type === "fox" ? "fox" : "cat"

    if (animalType === "fox") {
      const res = await fetchWithTimeout("https://randomfox.ca/floof/", {
        headers: { "Accept": "application/json" },
      })
      if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch fox image" }, { status: 502 })
      }
      const data = await res.json()
      if (!data.image) {
        return NextResponse.json({ error: "No fox image available" }, { status: 502 })
      }
      return NextResponse.json({
        type: "fox",
        imageUrl: data.image,
        tags: [],
        source: "randomfox.ca",
      })
    }

    const res = await fetchWithTimeout("https://cataas.com/cat?json=true", {
      headers: { "Accept": "application/json" },
    })
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch cat image" }, { status: 502 })
    }
    const data = await res.json()
    if (!data._id) {
      return NextResponse.json({ error: "No cat image available" }, { status: 502 })
    }
    return NextResponse.json({
      type: "cat",
      imageUrl: `https://cataas.com/cat/${data._id}`,
      tags: data.tags ?? [],
      source: "cataas.com",
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}