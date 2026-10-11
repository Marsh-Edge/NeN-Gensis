"use client"

import { useEffect, useRef, useState } from "react"
import { Search, MapPin, Wifi, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Flag, InfoRow, MetricBox, ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
import type { IpInfoData } from "@/lib/types"

export function IpInfoWidget() {
  const { value: initial, set: setUrl } = useUrlParam("ip")
  const [query, setQuery] = useState(initial)
  const [data, setData] = useState<IpInfoData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const lastQuery = useRef("")
  const fetchedRef = useRef(false)

  async function run(raw: string) {
    const value = raw.trim()
    lastQuery.current = value

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/ip-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value ? { ip: value } : {}),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Failed to fetch")
        return
      }
      setData(json)
    } catch {
      setError("Failed to fetch IP info")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true
      run(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setUrl(query.trim())
    run(query)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
        <Input
          name="ip"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          inputMode="text"
          placeholder="Enter an IP address or domain…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="IP address or domain"
          className="flex-1 min-w-0"
        />
        <Button type="button" variant="outline" onClick={() => run("")} disabled={loading}>
          My IP
        </Button>
        <Button type="submit" disabled={loading || !query.trim()}>
          <Search className="h-4 w-4 mr-2" aria-hidden="true" />
          Search
        </Button>
      </form>

      {error && <ErrorState message={error} onRetry={() => run(lastQuery.current)} />}

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
          <Skeleton className="h-40 w-full" />
        </div>
      )}

      {!loading && data && (
        <>
          <Card className="animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-red-600 flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Flag code={data.countryCode} />
                      <h3 className="text-lg font-semibold text-foreground">
                        {data.country}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {data.city}{data.city && data.regionName ? ", " : ""}{data.regionName}
                    </p>
                  </div>
                </div>

                <div className="sm:ml-auto glass rounded-xl px-4 py-3 text-center sm:text-right">
                  <p className="text-xs text-muted-foreground mb-0.5">IP Address</p>
                  <p className="text-base font-mono font-semibold text-foreground break-all tabular-nums">
                    {data.ip}
                  </p>
                </div>
              </div>

              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" aria-hidden="true" />
                Location
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <MetricBox label="City">{data.city || "—"}</MetricBox>
                <MetricBox label="Region">{data.regionName || "—"}</MetricBox>
                <MetricBox label="Postal Code">{data.zip || "—"}</MetricBox>
                <MetricBox label="Coordinates">
                  {data.lat ? `${data.lat.toFixed(2)}, ${data.lon.toFixed(2)}` : "—"}
                </MetricBox>
                <MetricBox label="Country Code">{data.countryCode || "—"}</MetricBox>
                <MetricBox label="Timezone" className="text-xs">
                  {data.timezone || "—"}
                </MetricBox>
              </div>

              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Wifi className="w-3 h-3" aria-hidden="true" />
                Network
              </h4>
              <Card className="!bg-foreground/[0.02] !backdrop-blur-none !border-border">
                <CardContent className="p-4">
                  <InfoRow label="ISP" value={data.isp} />
                  <InfoRow label="Organization" value={data.org} />
                  <InfoRow label="AS Number" value={data.as} />
                  <InfoRow label="Reverse DNS" value={data.reverse} />
                </CardContent>
              </Card>

              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-6 mb-3 flex items-center gap-1.5">
                <Shield className="w-3 h-3" aria-hidden="true" />
                Security
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant={data.proxy ? "destructive" : "success"} className="text-xs">
                  {data.proxy ? "⚠ Proxy Detected" : "✅ Not a Proxy"}
                </Badge>
                <Badge variant={data.hosting ? "destructive" : "success"} className="text-xs">
                  {data.hosting ? "⚠ Hosting Provider" : "✅ Not Hosting"}
                </Badge>
                <Badge variant={data.mobile ? "glass" : "success"} className="text-xs">
                  {data.mobile ? "Mobile Network" : "Not Mobile"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground/70 text-center">
            Powered by ipwho.is (free, no API key needed)
          </p>
        </>
      )}

      {!loading && !data && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="w-10 h-10 mx-auto mb-3 text-muted-foreground" aria-hidden="true" />
            <p className="text-muted-foreground text-sm">
              Your IP info will load automatically — or search any IP or domain
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
