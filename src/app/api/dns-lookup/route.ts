import { NextResponse } from "next/server"
import { fetchWithTimeout, readJson, toErrorResponse } from "@/lib/api"

const API_URL = "https://dns.google/resolve"
const DNS_TYPES: Record<string, number> = {
  A: 1,
  AAAA: 28,
  MX: 15,
  TXT: 16,
  CNAME: 5,
  NS: 2,
  SOA: 6,
}

const DNS_TYPE_LABELS: Record<number, string> = {
  1: "A",
  28: "AAAA",
  15: "MX",
  16: "TXT",
  5: "CNAME",
  2: "NS",
  6: "SOA",
}

export async function POST(req: Request) {
  try {
    const { domain, type } = await readJson(req)

    if (!domain || typeof domain !== "string" || !domain.trim()) {
      return NextResponse.json(
        { error: "Domain is required" },
        { status: 400 }
      )
    }

    const typeStr = typeof type === "string" ? type.toUpperCase() : ""
    const qtype = DNS_TYPES[typeStr] ? typeStr : "A"
    const qtypeNum = DNS_TYPES[qtype]

    const res = await fetchWithTimeout(
      `${API_URL}?name=${encodeURIComponent(domain.trim())}&type=${qtypeNum}`,
      { headers: { "Accept": "application/dns-json" } }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "DNS lookup failed" },
        { status: 502 }
      )
    }

    const data = await res.json()

    if (data.Status === 3) {
      return NextResponse.json({
        domain: domain.trim(),
        type: qtype,
        records: [],
        status: "not_found",
      })
    }

    const records = (data.Answer ?? []).map((r: { name: string; type: number; TTL: number; data: string }) => ({
      name: r.name,
      type: r.type,
      typeLabel: DNS_TYPE_LABELS[r.type] ?? `TYPE${r.type}`,
      TTL: r.TTL,
      data: r.data,
    }))

    return NextResponse.json({
      domain: domain.trim(),
      type: qtype,
      records,
      status: "success",
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}
