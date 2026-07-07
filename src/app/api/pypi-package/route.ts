import { NextResponse } from "next/server"

const API_URL = "https://pypi.org/pypi"

export async function POST(req: Request) {
  try {
    const { package: pkg } = await req.json()
    if (!pkg || typeof pkg !== "string" || !pkg.trim()) {
      return NextResponse.json({ error: "Package name is required" }, { status: 400 })
    }

    const name = pkg.trim().toLowerCase()
    const res = await fetch(`${API_URL}/${encodeURIComponent(name)}/json`, {
      headers: { "Accept": "application/json" },
    })

    if (res.status === 404) {
      return NextResponse.json({ error: "PyPI package not found" }, { status: 404 })
    }
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch package data" }, { status: 502 })
    }

    const data = await res.json()
    const info = data.info ?? {}

    return NextResponse.json({
      name: info.name ?? name,
      version: info.version ?? "",
      summary: info.summary ?? "",
      author: info.author ?? "",
      authorEmail: info.author_email ?? "",
      license: info.license ?? "",
      requiresPython: info.requires_python ?? "",
      homePage: info.home_page ?? "",
      projectUrls: info.project_urls ?? {},
      requiresDist: info.requires_dist ?? [],
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
