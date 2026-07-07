"use client"

import { useState } from "react"
import { Shuffle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { PlaceholderData } from "@/lib/types"

export function PlaceholderWidget() {
  const [width, setWidth] = useState("400")
  const [height, setHeight] = useState("300")
  const [data, setData] = useState<PlaceholderData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function fetchImage(w: number, h: number) {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/placeholder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ width: w, height: h }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? "Failed"); return }
      setData(json)
    } catch { setError("Failed to generate image") }
    finally { setLoading(false) }
  }

  function handleRandomize() {
    const w = Math.floor(Math.random() * 800) + 200
    const h = Math.floor(Math.random() * 600) + 200
    setWidth(String(w))
    setHeight(String(h))
    fetchImage(w, h)
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    const w = Math.max(1, Math.min(4000, parseInt(width) || 400))
    const h = Math.max(1, Math.min(4000, parseInt(height) || 300))
    setWidth(String(w))
    setHeight(String(h))
    fetchImage(w, h)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleGenerate} className="flex flex-wrap gap-2 sm:gap-3 items-end">
        <div className="flex-1 min-w-[100px]">
          <label className="text-xs text-white/40 mb-1 block">Width (px)</label>
          <Input type="number" min={1} max={4000} value={width} onChange={(e) => setWidth(e.target.value)} />
        </div>
        <div className="flex-1 min-w-[100px]">
          <label className="text-xs text-white/40 mb-1 block">Height (px)</label>
          <Input type="number" min={1} max={4000} value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading}>
          Generate
        </Button>
        <Button type="button" variant="outline" onClick={handleRandomize} disabled={loading}>
          <Shuffle className="h-4 w-4 mr-2" /> Random
        </Button>
      </form>

      {error && <Card><CardContent className="p-4 text-sm text-red-400">{error}</CardContent></Card>}

      {loading && <Skeleton className="w-full aspect-[4/3] rounded-xl" />}

      {!loading && data && (
        <Card>
          <CardContent className="p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.url}
              alt={`Placeholder ${data.width}x${data.height}`}
              className="w-full rounded-lg object-cover"
              style={{ aspectRatio: `${data.width}/${data.height}`, maxHeight: "60vh" }}
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-white/40">
                {data.width} × {data.height} — Photo by {data.author}
              </p>
              <a
                href={data.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-lg p-2 hover:bg-white/10 transition-colors"
              >
                <Download className="w-4 h-4 text-white/60" />
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card><CardContent className="p-8 text-center"><p className="text-white/50 text-sm">Set dimensions and click Generate</p></CardContent></Card>
      )}

      <p className="text-xs text-white/30 text-center">Powered by picsum.photos (free, no API key needed)</p>
    </div>
  )
}
