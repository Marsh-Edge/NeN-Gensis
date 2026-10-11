import { NextResponse } from "next/server"
import {
  ApiError,
  assertPublicHttpUrl,
  fetchWithTimeout,
  readJson,
  toErrorResponse,
} from "@/lib/api"

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

const MAX_REDIRECTS = 5

/**
 * Follows redirects manually so every hop is re-validated against the SSRF
 * blocklist (prevents redirect-based access to internal addresses).
 */
async function fetchFollowingSafe(
  startUrl: string,
  init: RequestInit
): Promise<{ response: Response; finalUrl: string }> {
  let current = startUrl

  for (let i = 0; i < MAX_REDIRECTS; i++) {
    const res = await fetchWithTimeout(current, { ...init, redirect: "manual" })

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location")
      await res.body?.cancel()
      if (!location) return { response: res, finalUrl: current }

      current = new URL(location, current).toString()
      await assertPublicHttpUrl(current)
      continue
    }

    return { response: res, finalUrl: current }
  }

  throw new ApiError(502, "Too many redirects")
}

export async function POST(req: Request) {
  try {
    const { url } = await readJson(req)

    if (!url || typeof url !== "string" || !url.trim()) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    let targetUrl = url.trim()
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`
    }

    await assertPublicHttpUrl(targetUrl)

    const start = Date.now()
    let { response: res, finalUrl } = await fetchFollowingSafe(targetUrl, { method: "HEAD" })

    // Some servers reject HEAD — retry with GET and discard the body.
    if (res.status === 405 || res.status === 501) {
      const fallback = await fetchFollowingSafe(targetUrl, { method: "GET" })
      await fallback.response.body?.cancel()
      res = fallback.response
      finalUrl = fallback.finalUrl
    }

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
      url: finalUrl,
      statusCode: res.status,
      statusText: res.statusText,
      duration,
      headers,
    })
  } catch (err) {
    return toErrorResponse(err, {
      message: "Failed to inspect URL — check that it is valid and reachable",
      status: 502,
    })
  }
}