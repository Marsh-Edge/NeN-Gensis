"use client"

import { useState } from "react"
import { Search, Globe, MapPin, DollarSign, Users, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { CountryData } from "@/lib/types"

function CountryFlag({ iso2 }: { iso2: string }) {
  if (!iso2 || iso2.length !== 2) return null
  const flag = String.fromCodePoint(
    ...iso2.split("").map((c) => 0x1F1E6 + c.charCodeAt(0) - 65)
  )
  return <span className="text-4xl">{flag}</span>
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/50">{label}</span>
      <span className="text-sm text-white/80 font-medium text-right" title={value}>
        {value || "—"}
      </span>
    </div>
  )
}

function MetricBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      <div className="flex justify-center mb-1.5 text-white/40">{icon}</div>
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <p className="text-sm font-semibold text-white truncate">{value}</p>
    </div>
  )
}

export function CountriesWidget() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState<CountryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: query.trim() }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Something went wrong")
        return
      }
      setData(json)
    } catch {
      setError("Failed to fetch country data")
    } finally {
      setLoading(false)
    }
  }

  function formatPopulation(n: number | null): string {
    if (n === null || n === undefined) return "—"
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
    return n.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2 sm:gap-3">
        <Input
          placeholder="Enter a country name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-0"
        />
        <Button type="submit" disabled={loading || !query.trim()}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {error && (
        <Card>
          <CardContent className="p-4 text-sm text-red-400">{error}</CardContent>
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
        </div>
      )}

      {!loading && data && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg">
                  <CountryFlag iso2={data.iso2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{data.name}</h3>
                  <p className="text-sm text-white/50">
                    {data.iso2}{data.iso3 ? ` / ${data.iso3}` : ""}
                  </p>
                </div>
              </div>
              {data.flag && (
                <div className="sm:ml-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.flag}
                    alt={`Flag of ${data.name}`}
                    className="h-16 rounded-lg shadow-md object-cover"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <MetricBox
                icon={<MapPin className="w-4 h-4" />}
                label="Capital"
                value={data.capital}
              />
              <MetricBox
                icon={<DollarSign className="w-4 h-4" />}
                label="Currency"
                value={data.currency}
              />
              <MetricBox
                icon={<Users className="w-4 h-4" />}
                label="Population"
                value={formatPopulation(data.population)}
              />
              <MetricBox
                icon={<Globe className="w-4 h-4" />}
                label="Coordinates"
                value={data.lat ? `${data.lat.toFixed(1)}, ${data.lng.toFixed(1)}` : "—"}
              />
            </div>

            <Card className="!bg-white/[0.02] !backdrop-blur-none !border-white/5">
              <CardContent className="p-4">
                <InfoRow label="Official Name" value={data.name} />
                <InfoRow label="Capital City" value={data.capital} />
                <InfoRow label="Currency Code" value={data.currency} />
                <InfoRow label="ISO Alpha-2" value={data.iso2} />
                <InfoRow label="ISO Alpha-3" value={data.iso3} />
                <InfoRow
                  label="Population"
                  value={data.population ? `${data.population.toLocaleString()} (${data.populationYear})` : "—"}
                />
                <InfoRow
                  label="Coordinates"
                  value={data.lat ? `${data.lat}, ${data.lng}` : "—"}
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <Flag className="w-10 h-10 mx-auto mb-3 text-white/20" />
            <p className="text-white/50 text-sm">
              Search any country to see its details
            </p>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-white/30 text-center">
        Powered by countriesnow.space (free, no API key needed)
      </p>
    </div>
  )
}
