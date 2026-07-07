import { NextResponse } from "next/server"

const API_URL = "http://api.open-notify.org/astros.json"

export async function GET() {
  try {
    const res = await fetch(API_URL, {
      headers: { "Accept": "application/json" },
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch space data" }, { status: 502 })
    }

    const data = await res.json()

    if (data.message !== "success") {
      return NextResponse.json({ error: "Failed to fetch space data" }, { status: 502 })
    }

    return NextResponse.json({
      people: data.people.map((p: { name: string; craft: string }) => ({
        name: p.name,
        craft: p.craft,
      })),
      number: data.number,
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
