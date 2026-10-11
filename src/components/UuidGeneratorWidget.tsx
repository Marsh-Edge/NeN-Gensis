"use client"

import { useState, useMemo } from "react"
import { Copy, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function generateUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export function UuidGeneratorWidget() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [count, setCount] = useState(1)
  const [genKey, setGenKey] = useState(0)

  function handleGenerate() {
    setGenKey((k) => k + 1)
    setCopiedId(null)
  }

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(text)
      setTimeout(() => setCopiedId((cur) => (cur === text ? null : cur)), 2000)
    } catch { /* ignore */ }
  }

  const uuids = useMemo(() => Array.from({ length: count }, () => generateUuid()), [count, genKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Button onClick={handleGenerate} size="sm">
              <RefreshCw className="h-4 w-4 mr-2" /> Generate
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">Count:</span>
              {[1, 5, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  aria-pressed={count === n}
                  aria-label={`Generate ${n} UUID${n > 1 ? "s" : ""}`}
                  className={`text-xs px-2 py-0.5 rounded ${count === n ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {uuids.map((id) => (
              <div key={id} className="glass rounded-lg p-3 flex items-center justify-between gap-3">
                <code className="text-sm font-mono text-white/80 break-all select-all">{id}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex-shrink-0"
                  onClick={() => handleCopy(id)}
                  aria-label={copiedId === id ? "Copied" : `Copy UUID ${id}`}
                >
                  {copiedId === id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-white/40" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">UUID v4 Format</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="glass" className="text-[10px] font-mono">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</Badge>
            <Badge variant="glass" className="text-[10px]">122 random bits</Badge>
            <Badge variant="glass" className="text-[10px]">Version 4 (random)</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
