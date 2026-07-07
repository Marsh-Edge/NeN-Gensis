"use client"

import { useState } from "react"
import { Search, Package, Tag, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { NpmPackageData } from "@/lib/types"

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/50">{label}</span>
      <span className="text-sm text-white/80 font-medium text-right truncate max-w-[60%]">{value || "—"}</span>
    </div>
  )
}

export function NpmPackageWidget() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState<NpmPackageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError("")
    setData(null)
    try {
      const res = await fetch("/api/npm-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: query.trim() }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? "Something went wrong"); return }
      setData(json)
    } catch { setError("Failed to fetch package data") }
    finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2 sm:gap-3">
        <Input placeholder="Package name (e.g. react, express)..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 min-w-0" />
        <Button type="submit" disabled={loading || !query.trim()}>
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </form>

      {error && <Card><CardContent className="p-4 text-sm text-red-400">{error}</CardContent></Card>}

      {loading && <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>}

      {!loading && data && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-400 to-orange-600 flex items-center justify-center text-lg shadow-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white">{data.name}</h3>
                <p className="text-sm text-white/50 truncate">{data.description}</p>
              </div>
              <Badge variant="success" className="text-xs">v{data.version}</Badge>
            </div>

            <Card className="!bg-white/[0.02] !backdrop-blur-none !border-white/5 mb-4">
              <CardContent className="p-4">
                <InfoRow label="License" value={data.license} />
                <InfoRow label="Homepage" value={data.homepage} />
                <InfoRow label="Repository" value={data.repository} />
                <InfoRow label="Maintainers" value={data.maintainers.join(", ")} />
              </CardContent>
            </Card>

            {data.keywords.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Tag className="w-3 h-3" /> Keywords
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {data.keywords.slice(0, 10).map((k) => <Badge key={k} variant="glass" className="text-[10px]">{k}</Badge>)}
                </div>
              </div>
            )}

            {data.dependencies.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Box className="w-3 h-3" /> Dependencies ({data.dependencies.length})
                </h4>
                <Card className="!bg-white/[0.02] !backdrop-blur-none !border-white/5">
                  <CardContent className="p-3 max-h-48 overflow-y-auto space-y-1">
                    {data.dependencies.map((d) => (
                      <div key={d.name} className="flex items-center justify-between py-1 text-xs">
                        <span className="text-white/70 font-mono">{d.name}</span>
                        <span className="text-white/40 font-mono">{d.version}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card><CardContent className="p-8 text-center"><Package className="w-10 h-10 mx-auto mb-3 text-white/20" /><p className="text-white/50 text-sm">Search for any npm package</p></CardContent></Card>
      )}

      <p className="text-xs text-white/30 text-center">Powered by npm Registry API (free, no API key needed)</p>
    </div>
  )
}
