import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { type } = await req.json()
    const animalType = type === "fox" ? "fox" : "cat"

    if (animalType === "fox") {
      const res = await fetch("https://randomfox.ca/floof/", {
        headers: { "Accept": "application/json" },
      })
      if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch fox image" }, { status: 502 })
      }
      const data = await res.json()
      return NextResponse.json({
        type: "fox",
        imageUrl: data.image ?? "",
        tags: [],
        source: "randomfox.ca",
      })
    }

    const res = await fetch("https://cataas.com/cat?json=true", {
      headers: { "Accept": "application/json" },
    })
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch cat image" }, { status: 502 })
    }
    const data = await res.json()
    return NextResponse.json({
      type: "cat",
      imageUrl: `https://cataas.com/cat/${data._id ?? ""}`,
      tags: data.tags ?? [],
      source: "cataas.com",
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
