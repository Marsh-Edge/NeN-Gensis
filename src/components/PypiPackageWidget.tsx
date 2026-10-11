"use client"

import { useEffect, useRef, useState } from "react"
import { Search, ExternalLink, Package, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { InfoRow, ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
import type { PypiPackageData } from "@/lib/types"

export function PypiPackageWidget() {
  const { value: initial, set: setUrl } = useUrlParam("package")
  const [query, setQuery] = useState(initial)
  const [data, setData] = useState<PypiPackageData | null>(null)
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
      const res = await fetch("/api/pypi-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: value }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? "Something went wrong"); return }
      setData(json)
    } catch { setError("Failed to fetch package data") }
    finally { setLoading(false) }
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
    setUrl(query.trim())
    run(query)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2 sm:gap-3">
        <Input
          name="package"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="Package name (e.g. requests, django)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="PyPI package name"
          className="flex-1 min-w-0"
        />
        <Button type="submit" disabled={loading || !query.trim()}>
          <Search className="h-4 w-4 mr-2" aria-hidden="true" /> Search
        </Button>
      </form>

      {error && <ErrorState message={error} onRetry={() => run(lastQuery.current)} />}

      {loading && <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>}

      {!loading && data && (
        <Card className="animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-lg shadow-lg">
                <Package className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-foreground">{data.name}</h2>
                <p className="text-sm text-muted-foreground truncate">{data.summary}</p>
              </div>
              <Badge variant="success" className="text-xs shrink-0">v{data.version}</Badge>
            </div>

            <Card className="!bg-foreground/[0.02] !backdrop-blur-none !border-border mb-4">
              <CardContent className="p-4">
                <InfoRow label="Author" value={data.author} />
                <InfoRow label="Author Email" value={data.authorEmail} />
                <InfoRow label="License" value={data.license} />
                <InfoRow label="Requires Python" value={data.requiresPython} />
                <InfoRow label="Home Page" value={data.homePage} />
              </CardContent>
            </Card>

            {Object.keys(data.projectUrls).length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3" aria-hidden="true" /> Project Links
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(data.projectUrls).slice(0, 8).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer">
                      <Badge variant="glass" className="text-[10px] hover:bg-foreground/10 cursor-pointer">{key}</Badge>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {data.requiresDist.length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Book className="w-3 h-3" aria-hidden="true" /> Dependencies ({data.requiresDist.length})
                </h3>
                <Card className="!bg-foreground/[0.02] !backdrop-blur-none !border-border">
                  <CardContent className="p-3 max-h-48 overflow-y-auto">
                    {data.requiresDist.map((dep, i) => (
                      <div key={i} className="py-1 text-xs text-foreground/70 font-mono border-b border-border last:border-0">{dep}</div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card><CardContent className="p-8 text-center"><Package className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" aria-hidden="true" /><p className="text-muted-foreground text-sm">Search for any PyPI package</p></CardContent></Card>
      )}

      <p className="text-xs text-muted-foreground/70 text-center">Powered by PyPI API (free, no API key needed)</p>
    </div>
  )
}
