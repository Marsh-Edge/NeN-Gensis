import { NextResponse } from "next/server"

const SECURITY_HEADERS = [
  "strict-transport-security",
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "x-xss-protection",
  "referrer-policy",
  "permissions-policy",
  "access-control-allow-origin",
  "access-control-allow-methods",
  "access-control-allow-headers",
  "set-cookie",
  "cache-control",
  "pragma",
  "expires",
]

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== "string" || !url.trim()) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      )
    }

    let targetUrl = url.trim()
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = `https://${targetUrl}`
    }

    const start = Date.now()
    const res = await fetch(targetUrl, { method: "HEAD", redirect: "follow" })
    const duration = Date.now() - start

    const headers: { key: string; value: string; security: boolean }[] = []
    res.headers.forEach((value, key) => {
      headers.push({
        key,
        value,
        security: SECURITY_HEADERS.includes(key.toLowerCase()),
      })
    })

    headers.sort((a, b) => {
      if (a.security && !b.security) return -1
      if (!a.security && b.security) return 1
      return a.key.localeCompare(b.key)
    })

    return NextResponse.json({
      url: targetUrl,
      statusCode: res.status,
      statusText: res.statusText,
      duration,
      headers,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to inspect URL — check that it is valid and reachable" },
      { status: 502 }
    )
  }
}
