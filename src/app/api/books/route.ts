import { NextResponse } from "next/server"

const API_URL = "https://openlibrary.org/search.json"

export async function POST(req: Request) {
  try {
    const { query } = await req.json()
    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    const params = new URLSearchParams({
      q: query.trim(),
      fields: "title,author_name,first_publish_year,cover_i,isbn",
      limit: "20",
    })

    const res = await fetch(`${API_URL}?${params}`, {
      headers: { "Accept": "application/json" },
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to search books" }, { status: 502 })
    }

    const data = await res.json()
    const docs = data.docs ?? []

    if (docs.length === 0) {
      return NextResponse.json({ error: "No books found" }, { status: 404 })
    }

    const results = docs.map((d: Record<string, unknown>) => ({
      title: d.title ?? "",
      author: Array.isArray(d.author_name) ? d.author_name[0] ?? "" : "",
      firstPublishYear: d.first_publish_year ?? null,
      coverId: d.cover_i ?? null,
      isbn: Array.isArray(d.isbn) ? d.isbn.slice(0, 5) : [],
    }))

    return NextResponse.json({
      results,
      total: data.numFound ?? 0,
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
