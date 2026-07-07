import { NextResponse } from "next/server"

const API_URL = "https://registry.npmjs.org"

export async function POST(req: Request) {
  try {
    const { package: pkg } = await req.json()
    if (!pkg || typeof pkg !== "string" || !pkg.trim()) {
      return NextResponse.json({ error: "Package name is required" }, { status: 400 })
    }

    const name = pkg.trim().toLowerCase()
    const res = await fetch(`${API_URL}/${encodeURIComponent(name)}`, {
      headers: { "Accept": "application/json" },
    })

    if (res.status === 404) {
      return NextResponse.json({ error: "npm package not found" }, { status: 404 })
    }
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch package data" }, { status: 502 })
    }

    const data = await res.json()
    const latestVer = data["dist-tags"]?.latest ?? ""
    const latest = data.versions?.[latestVer] ?? {}
    const deps = latest.dependencies ?? {}

    return NextResponse.json({
      name: data.name ?? name,
      version: latestVer,
      description: data.description ?? "",
      license: data.license ?? latest.license ?? "",
      homepage: data.homepage ?? latest.homepage ?? "",
      repository: data.repository?.url ?? latest.repository?.url ?? "",
      keywords: data.keywords ?? [],
      maintainers: (data.maintainers ?? []).map((m: { name: string }) => m.name),
      dependencies: Object.entries(deps).slice(0, 20).map(([n, v]) => ({
        name: n,
        version: v as string,
      })),
      lastPublish: latest?.gitHead ?? "",
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
