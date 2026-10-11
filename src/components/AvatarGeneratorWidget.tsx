"use client"

import { useEffect, useRef, useState } from "react"
import { Shuffle, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
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
  const seedParam = useUrlParam("seed")
  const styleParam = useUrlParam("style")
  const [seed, setSeed] = useState(seedParam.value)
  const [style, setStyle] = useState(STYLES.some((x) => x.id === styleParam.value) ? styleParam.value : "avataaars")
  const [data, setData] = useState<AvatarData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const ranRef = useRef(false)

  async function fetchAvatar(s: string, st: string) {
    setLoading(true)
    setError("")
    setData(null)
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

  async function runInitial() {
    if (!seedParam.value && !styleParam.value) return
    fetchAvatar(seed || "random", style)
  }

  useEffect(() => {
    if (!ranRef.current) {
      ranRef.current = true
      runInitial()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleRandom() {
    const s = Math.random().toString(36).substring(2, 8)
    setSeed(s)
    seedParam.set(s)
    fetchAvatar(s, style)
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    seedParam.set(seed)
    styleParam.set(style)
    fetchAvatar(seed || "random", style)
  }

  function handleStyle(id: string) {
    setStyle(id)
    styleParam.set(id)
    if (data || seed) {
      seedParam.set(seed)
      fetchAvatar(seed || "random", id)
    }
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
          <label htmlFor="avatar-seed" className="text-xs text-muted-foreground mb-1 block">Seed (name)</label>
          <Input id="avatar-seed" name="seed" autoComplete="off" placeholder="Any text…" value={seed} onChange={(e) => setSeed(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading}>Generate</Button>
        <Button type="button" variant="outline" onClick={handleRandom} disabled={loading}>
          <Shuffle className="h-4 w-4 mr-2" aria-hidden="true" /> Random
        </Button>
      </form>

      <div className="flex flex-wrap gap-1.5">
        {STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => handleStyle(s.id)}
            aria-pressed={style === s.id}
            className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
              style === s.id ? "bg-foreground/15 text-foreground border-border" : "text-muted-foreground border-border hover:text-foreground/60"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {error && <ErrorState message={error} onRetry={() => fetchAvatar(seed || "random", style)} />}

      {loading && <Skeleton className="w-48 h-48 mx-auto rounded-xl" />}

      {!loading && data && (
        <Card className="animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(data.svg)))}`}
                alt={`Avatar for ${data.seed}`}
                width={192}
                height={192}
                decoding="async"
                className="w-48 h-48 rounded-2xl bg-foreground/5"
              />
              <div className="flex items-center gap-2">
                <Badge variant="glass" className="text-xs">{data.style}</Badge>
                <Badge variant="glass" className="text-xs">Seed: {data.seed}</Badge>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handleCopySvg}>
                  {copied
                    ? <Check className="h-3 w-3 mr-1 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
                    : <Copy className="h-3 w-3 mr-1" aria-hidden="true" />}
                  {copied ? "Copied!" : "Copy SVG"}
                </Button>
              </div>
              <p role="status" aria-live="polite" className="sr-only">{copied ? "SVG copied to clipboard" : ""}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground text-sm">Enter a seed or click Random</p></CardContent></Card>
      )}

      <p className="text-xs text-muted-foreground/70 text-center">Powered by DiceBear (free, no API key needed)</p>
    </div>
  )
}
