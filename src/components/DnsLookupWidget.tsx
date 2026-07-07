"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { ToolIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { DnsResponse } from "@/lib/types"

const DNS_TYPES = ["A", "AAAA", "MX", "NS", "TXT", "CNAME", "SOA"]

export function DnsLookupWidget() {
  const [domain, setDomain] = useState("")
  const [qtype, setQtype] = useState("A")
  const [data, setData] = useState<DnsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!domain.trim()) return

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/dns-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domain.trim(), type: qtype }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Something went wrong")
        return
      }
      setData(json)
    } catch {
      setError("DNS lookup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-1.5 flex-wrap">
          {DNS_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setQtype(t)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                qtype === t
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  : "bg-white/5 text-white/50 hover:text-white/80 border border-transparent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <Button type="submit" disabled={loading || !domain.trim()}>
          <Search className="h-4 w-4 mr-2" />
          Lookup
        </Button>
      </form>

      {error && (
        <Card>
          <CardContent className="p-4 text-sm text-red-400">
            {error}
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}

      {!loading && data && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">{data.domain}</h3>
                <p className="text-sm text-white/40">Record type: {data.type}</p>
              </div>
              <Badge variant={data.status === "success" ? "success" : "glass"}>
                {data.status === "success" ? `${data.records.length} records` : "Not Found"}
              </Badge>
            </div>

            {data.records.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-white/40 text-sm">
                  No {data.type} records found for this domain
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {data.records.map((r, i) => (
                  <div
                    key={i}
                    className="glass rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                  >
                    <Badge variant="glass" className="text-[10px] shrink-0 w-10 text-center">
                      {r.typeLabel}
                    </Badge>
                    <span className="flex-1 text-sm text-white/80 font-mono break-all min-w-0">
                      {r.data}
                    </span>
                    <span className="text-xs text-white/30 shrink-0">
                      TTL: {r.TTL}s
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <ToolIcon slug="dns-lookup" className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Enter a domain and select a record type to look up
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
