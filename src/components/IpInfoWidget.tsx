"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Wifi, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { IpInfoData } from "@/lib/types"

function Flag({ code }: { code: string }) {
  if (!code || code.length !== 2) return null
  const flags = String.fromCodePoint(
    ...code.split("").map((c) => 0x1F1E6 + c.charCodeAt(0) - 65)
  )
  return <span className="text-2xl">{flags}</span>
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/50">{label}</span>
      <span className="text-sm text-white/80 font-medium text-right max-w-[60%] truncate" title={value}>
        {value || "—"}
      </span>
    </div>
  )
}

function MetricBox({ label, classNameValue, children }: { label: string; classNameValue?: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <div className={`text-sm font-semibold text-white ${classNameValue ?? ""}`}>{children}</div>
    </div>
  )
}

export function IpInfoWidget() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState<IpInfoData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true
      fetchMyIp()
    }
  }, [])

  async function fetchMyIp() {
    setLoading(true)
    setError("")
    setData(null)
    try {
      const res = await fetch("/api/ip-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Failed to fetch")
        return
      }
      setData(json)
    } catch {
      setError("Failed to fetch your IP info")
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/ip-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip: query.trim() }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Something went wrong")
        return
      }
      setData(json)
    } catch {
      setError("Failed to fetch IP data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
        <Input
          placeholder="Enter an IP address or domain..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-0"
        />
        <Button type="button" variant="outline" onClick={fetchMyIp} disabled={loading}>
          My IP
        </Button>
        <Button type="submit" disabled={loading || !query.trim()}>
          <Search className="h-4 w-4 mr-2" />
          Search
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
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-red-600 flex items-center justify-center text-xl shadow-lg">
                    🔒
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Flag code={data.countryCode} />
                      <h3 className="text-lg font-semibold text-white">
                        {data.country}
                      </h3>
                    </div>
                    <p className="text-sm text-white/50">
                      {data.city}{data.city && data.regionName ? ", " : ""}{data.regionName}
                    </p>
                  </div>
                </div>

                <div className="sm:ml-auto glass rounded-xl px-4 py-3 text-center sm:text-right">
                  <p className="text-xs text-white/40 mb-0.5">IP Address</p>
                  <p className="text-base font-mono font-semibold text-white break-all">
                    {data.ip}
                  </p>
                </div>
              </div>

              <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
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
                <MetricBox label="Timezone" classNameValue="text-xs">
                  {data.timezone || "—"}
                </MetricBox>
              </div>

              <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Wifi className="w-3 h-3" />
                Network
              </h4>
              <Card className="!bg-white/[0.02] !backdrop-blur-none !border-white/5">
                <CardContent className="p-4">
                  <InfoRow label="ISP" value={data.isp} />
                  <InfoRow label="Organization" value={data.org} />
                  <InfoRow label="AS Number" value={data.as} />
                  <InfoRow label="Reverse DNS" value={data.reverse} />
                </CardContent>
              </Card>

              <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mt-6 mb-3 flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
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
                  {data.mobile ? "📱 Mobile Network" : "✅ Not Mobile"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-white/30 text-center">
            Powered by ip-api.com (free, no API key needed)
          </p>
        </>
      )}

      {!loading && !data && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <span className="text-4xl block mb-3">🔒</span>
            <p className="text-white/50 text-sm">
              Your IP info will load automatically — or search any IP or domain
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
