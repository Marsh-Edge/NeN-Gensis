"use client"

import { useState } from "react"
import { Shuffle, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { AvatarData } from "@/lib/types"

const STYLES = [
  { id: "avataaars", label: "Avataaars" },
  { id: "bottts", label: "Bottts" },
  { id: "identicon", label: "Identicon" },
  { id: "initials", label: "Initials" },
  { id: "lorelei", label: "Lorelei" },
  { id: "adventurer", label: "Adventurer" },
  { id: "big-smile", label: "Big Smile" },
  { id: "micah", label: "Micah" },
  { id: "miniavs", label: "Miniavs" },
  { id: "pixel-art", label: "Pixel Art" },
]

export function AvatarGeneratorWidget() {
  const [seed, setSeed] = useState("")
  const [style, setStyle] = useState("avataaars")
  const [data, setData] = useState<AvatarData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  async function fetchAvatar(s: string, st: string) {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed: s || "random", style: st }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? "Failed"); return }
      setData(json)
    } catch { setError("Failed to generate avatar") }
    finally { setLoading(false) }
  }

  function handleRandom() {
    const s = Math.random().toString(36).substring(2, 8)
    setSeed(s)
    fetchAvatar(s, style)
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    fetchAvatar(seed || "random", style)
  }

  async function handleCopySvg() {
    if (!data) return
    try {
      await navigator.clipboard.writeText(data.svg)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleGenerate} className="flex flex-wrap gap-2 sm:gap-3 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs text-white/40 mb-1 block">Seed (name)</label>
          <Input placeholder="Any text..." value={seed} onChange={(e) => setSeed(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading}>Generate</Button>
        <Button type="button" variant="outline" onClick={handleRandom} disabled={loading}>
          <Shuffle className="h-4 w-4 mr-2" /> Random
        </Button>
      </form>

      <div className="flex flex-wrap gap-1.5">
        {STYLES.map((s) => (
          <button
            key={s.id}
            onClick={() => { setStyle(s.id); if (data || seed) fetchAvatar(seed || "random", s.id) }}
            className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
              style === s.id ? "bg-white/15 text-white border-white/20" : "text-white/40 border-white/10 hover:text-white/60"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {error && <Card><CardContent className="p-4 text-sm text-red-400">{error}</CardContent></Card>}

      {loading && <Skeleton className="w-48 h-48 mx-auto rounded-xl" />}

      {!loading && data && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(data.svg)))}`}
                alt={`Avatar for ${data.seed}`}
                className="w-48 h-48 rounded-2xl bg-white/5"
              />
              <div className="flex items-center gap-2">
                <Badge variant="glass" className="text-xs">{data.style}</Badge>
                <Badge variant="glass" className="text-xs">Seed: {data.seed}</Badge>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handleCopySvg}>
                  {copied ? <Check className="h-3 w-3 mr-1 text-emerald-400" /> : <Copy className="h-3 w-3 mr-1" />}
                  {copied ? "Copied!" : "Copy SVG"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card><CardContent className="p-8 text-center"><p className="text-white/50 text-sm">Enter a seed or click Random</p></CardContent></Card>
      )}

      <p className="text-xs text-white/30 text-center">Powered by DiceBear (free, no API key needed)</p>
    </div>
  )
}
