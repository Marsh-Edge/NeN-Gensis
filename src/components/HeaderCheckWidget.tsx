"use client"

import { useState } from "react"
import { Search, Shield, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { HeaderCheckData } from "@/lib/types"

export function HeaderCheckWidget() {
  const [url, setUrl] = useState("")
  const [data, setData] = useState<HeaderCheckData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/header-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Something went wrong")
        return
      }
      setData(json)
    } catch {
      setError("Failed to check headers")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          placeholder="example.com or https://example.com/page"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !url.trim()}>
          <Search className="h-4 w-4 mr-2" />
          Inspect
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
          <Skeleton className="h-64 w-full" />
        </div>
      )}

      {!loading && data && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-red-600 flex items-center justify-center text-lg shadow-lg">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-white truncate">
                      {data.url}
                    </h3>
                    <p className="text-xs text-white/40 truncate">
                      {data.statusCode} {data.statusText}
                    </p>
                  </div>
                </div>
                <div className="sm:ml-auto flex items-center gap-3 text-xs text-white/40 shrink-0">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {data.headers.filter((h) => h.security).length} security headers
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {data.duration}ms
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-1">
                {data.headers.map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2.5 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-2 min-w-0 sm:w-64 shrink-0">
                      {h.security && (
                        <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
                      )}
                      <span className={`text-xs font-mono font-medium truncate ${
                        h.security ? "text-emerald-300" : "text-white/50"
                      }`}>
                        {h.key}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/70 break-all min-w-0 flex-1">
                      {h.value}
                    </span>
                  </div>
                ))}
              </div>

              {data.headers.length === 0 && (
                <p className="text-center text-white/40 text-sm py-4">
                  No headers returned
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {!loading && !data && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <span className="text-4xl block mb-3">📋</span>
            <p className="text-white/50 text-sm">
              Enter a URL to inspect its HTTP response headers
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
