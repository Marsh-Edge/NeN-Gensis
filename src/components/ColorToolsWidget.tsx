"use client"

import { useState } from "react"
import { Copy, Check, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useUrlParam } from "@/lib/useUrlParam"

function hexToRgb(hex: string) {
  const m = hex.replace("#", "").match(/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/)
  if (!m) return null
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function isValidHex(s: string) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s)
}

function formatHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
}

function generatePalette(hex: string): string[] {
  const rgb = hexToRgb(hex)
  if (!rgb) return []
  const colors: string[] = []
  for (let i = 0; i < 5; i++) {
    const f = 0.3 + i * 0.2
    const r = Math.min(255, Math.max(0, Math.round(rgb.r * f + 255 * (1 - f) * 0.5)))
    const g = Math.min(255, Math.max(0, Math.round(rgb.g * f + 255 * (1 - f) * 0.5)))
    const b = Math.min(255, Math.max(0, Math.round(rgb.b * f + 255 * (1 - f) * 0.5)))
    colors.push(formatHex(r, g, b))
  }
  return colors
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      aria-label={label}
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* */ }
      }}
      className="text-[10px] text-muted-foreground hover:text-foreground/60 flex items-center gap-1 transition-colors"
    >
      {copied ? <Check className="w-2.5 h-2.5" aria-hidden="true" /> : <Copy className="w-2.5 h-2.5" aria-hidden="true" />}
      {label}
      <span role="status" aria-live="polite" className="sr-only">{copied ? "Copied" : ""}</span>
    </button>
  )
}

function randomHex(): string {
  return "#" + Array.from({ length: 6 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
}

export function ColorToolsWidget() {
  const { value: initial, set: setUrl } = useUrlParam("color")
  const [hex, setHex] = useState(() => {
    const value = initial.startsWith("#") ? initial : initial ? `#${initial}` : ""
    return isValidHex(value) ? value : "#6366f1"
  })
  const valid = isValidHex(hex)
  const rgb = valid ? hexToRgb(hex) : null
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null
  const palette = valid ? generatePalette(hex) : []

  function update(next: string) {
    setHex(next)
    if (isValidHex(next)) setUrl(next)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 sm:gap-3 items-end">
        <div className="flex-1">
          <label htmlFor="color-hex" className="text-xs text-muted-foreground mb-1 block">HEX Color</label>
          <Input
            id="color-hex"
            name="color"
            value={hex}
            onChange={(e) => update(e.target.value)}
            placeholder="#6366f1"
            autoComplete="off"
            spellCheck={false}
            className="font-mono"
          />
        </div>
        <button
          type="button"
          onClick={() => update(randomHex())}
          aria-label="Random color"
          className="glass rounded-lg p-2.5 hover:bg-foreground/10 transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-foreground/60" aria-hidden="true" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Preview</h3>
            <div className="w-full h-32 rounded-xl border border-border" style={{ backgroundColor: valid ? hex : "transparent" }} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-foreground/60 font-mono">{valid ? hex : "Invalid"}</span>
              {valid && <CopyButton text={hex} label="Copy HEX" />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Conversions</h3>
            <div className="space-y-2">
              {rgb && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">RGB</span>
                  <span className="text-xs text-foreground/80 font-mono tabular-nums">{rgb.r}, {rgb.g}, {rgb.b}</span>
                </div>
              )}
              {hsl && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">HSL</span>
                  <span className="text-xs text-foreground/80 font-mono tabular-nums">{hsl.h}°, {hsl.s}%, {hsl.l}%</span>
                </div>
              )}
              {!rgb && <p className="text-xs text-red-500 dark:text-red-400">Invalid hex color</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {palette.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Tinted Palette</h3>
            <div className="flex gap-1 rounded-xl overflow-hidden h-12">
              {palette.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Use color ${c}`}
                  className="flex-1 relative group cursor-pointer"
                  style={{ backgroundColor: c }}
                  onClick={() => update(c)}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-white/0 group-hover:text-white/80 transition-colors" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                    {c}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground/70 text-center">Client-side color utilities — no external API needed</p>
    </div>
  )
}
