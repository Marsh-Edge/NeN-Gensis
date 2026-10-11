import { NextResponse } from "next/server"
import { lookup } from "node:dns/promises"
import net from "node:net"

export const DEFAULT_TIMEOUT_MS = 8000

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

/** Parses a request body as JSON; malformed bodies map to a 400 ApiError instead of a 500. */
export async function readJson(req: Request): Promise<Record<string, unknown>> {
  try {
    return (await req.json()) as Record<string, unknown>
  } catch {
    throw new ApiError(400, "Invalid JSON body")
  }
}

/** Turns any thrown error into a normalized JSON error response. */
export function toErrorResponse(
  err: unknown,
  fallback: { message: string; status: number } = { message: "Internal server error", status: 500 }
) {
  if (err instanceof ApiError) {
    return NextResponse.json({ error: err.message }, { status: err.status })
  }
  return NextResponse.json({ error: fallback.message }, { status: fallback.status })
}

/** Wraps fetch with an abort timeout so hanging upstreams produce a clean 504 instead of stalling the route. */
export async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError(504, "Upstream request timed out")
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

/** Blocks loopback, private, link-local, CGNAT, reserved, and metadata IPs to prevent SSRF. */
function isBlockedIp(ip: string): boolean {
  if (net.isIP(ip) === 4) {
    const [a, b] = ip.split(".").map(Number)
    if (a === 0 || a === 10) return true // any/8, private
    if (a === 100 && b >= 64 && b <= 127) return true // CGNAT 100.64.0.0/10
    if (a === 127) return true // loopback
    if (a === 169 && b === 254) return true // link-local + cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true // private 172.16.0.0/12
    if (a === 192 && b === 168) return true // private 192.168.0.0/16
    if (a === 198 && (b === 18 || b === 19)) return true // benchmarking 198.18.0.0/15
    if (a === 192 && b === 0) return true // documentation 192.0.2.0/24
    if (a === 198 && b === 51) return true // documentation 198.51.100.0/24
    if (a === 203 && b === 0) return true // documentation 203.0.113.0/24
    if (a >= 224) return true // multicast + reserved
    return false
  }

  if (net.isIP(ip) === 6) {
    const h = ip.toLowerCase()
    if (h === "::" || h === "::1") return true // unspecified, loopback
    if (h.startsWith("::ffff:") && net.isIP(h.slice(7)) === 4) {
      return isBlockedIp(h.slice(7)) // IPv4-mapped addresses
    }
    if (/^f[cd][0-9a-f]/.test(h)) return true // unique local fc00::/7
    if (/^fe[89ab][0-9a-f]/.test(h)) return true // link-local fe80::/10
    if (h.startsWith("2001:db8")) return true // documentation
    return false
  }

  return true
}

/**
 * Validates that a URL is fetchable (http/https) and resolves only to public
 * IP addresses, throwing a 400 ApiError for internal/blocked targets.
 */
export async function assertPublicHttpUrl(raw: string): Promise<URL> {
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    throw new ApiError(400, "Invalid URL")
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new ApiError(400, "Only http:// and https:// URLs are allowed")
  }

  const hostname = url.hostname.replace(/^\[|\]$/g, "")
  if (hostname === "localhost") {
    throw new ApiError(400, "This URL is not allowed")
  }

  if (net.isIP(hostname)) {
    if (isBlockedIp(hostname)) {
      throw new ApiError(400, "This URL is not allowed")
    }
    return url
  }

  let addresses
  try {
    addresses = await lookup(hostname, { all: true })
  } catch {
    throw new ApiError(502, "Could not resolve the host")
  }

  for (const { address } of addresses) {
    if (isBlockedIp(address)) {
      throw new ApiError(400, "This URL is not allowed")
    }
  }

  return url
}