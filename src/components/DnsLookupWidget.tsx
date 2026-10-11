"use client"

import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import { ToolIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
import type { DnsResponse } from "@/lib/types"

const DNS_TYPES = ["A", "AAAA", "MX", "NS", "TXT", "CNAME", "SOA"]

export function DnsLookupWidget() {
  const { value: initial, set: setUrl } = useUrlParam("domain")
  const [domain, setDomain] = useState(initial)
  const [qtype, setQtype] = useState("A")
  const [data, setData] = useState<DnsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const lastQuery = useRef("")
  const ranRef = useRef(false)

  async function run(raw: string) {
    const value = raw.trim()
    if (!value) return
    lastQuery.current = value

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/dns-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: value, type: qtype }),
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

  useEffect(() => {
    if (!ranRef.current) {
      ranRef.current = true
      run(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setUrl(domain.trim())
    run(domain)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <Input
          name="domain"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          inputMode="url"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          aria-label="Domain name"
          className="flex-1"
        />
        <div className="flex gap-1.5 flex-wrap" role="group" aria-label="DNS record type">
          {DNS_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setQtype(t)}
              aria-pressed={qtype === t}
              aria-label={`Record type ${t}`}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 ${
                qtype === t
                  ? "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/40"
                  : "bg-foreground/5 text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <Button type="submit" disabled={loading || !domain.trim()}>
          <Search className="h-4 w-4 mr-2" aria-hidden="true" />
          Lookup
        </Button>
      </form>

      {error && <ErrorState message={error} onRetry={() => run(lastQuery.current)} />}

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}

      {!loading && data && (
        <Card className="animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{data.domain}</h3>
                <p className="text-sm text-muted-foreground">Record type: {data.type}</p>
              </div>
              <Badge variant={data.status === "success" ? "success" : "glass"}>
                {data.status === "success" ? `${data.records.length} records` : "Not Found"}
              </Badge>
            </div>

            {data.records.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground text-sm">
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
                    <span className="flex-1 text-sm text-foreground/80 font-mono break-all min-w-0">
                      {r.data}
                    </span>
                    <span className="text-xs text-muted-foreground/70 shrink-0 tabular-nums">
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
            <ToolIcon slug="dns-lookup" className="w-10 h-10 mx-auto mb-3 text-muted-foreground" aria-hidden="true" />
            <p className="text-muted-foreground text-sm">
              Enter a domain and select a record type to look up
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
