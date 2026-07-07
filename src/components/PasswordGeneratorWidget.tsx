"use client"

import { useState, useCallback } from "react"
import { Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

function generatePassword(length: number, opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lower = "abcdefghijklmnopqrstuvwxyz"
  const nums = "0123456789"
  const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  let chars = ""
  if (opts.upper) chars += upper
  if (opts.lower) chars += lower
  if (opts.numbers) chars += nums
  if (opts.symbols) chars += syms

  if (!chars) return ""

  const array = new Uint32Array(length)
  crypto.getRandomValues(array)

  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length]
  }
  return result
}

function getStrength(length: number, opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }): { label: string; color: string; variant: "destructive" | "glass" | "success" } {
  const types = [opts.upper, opts.lower, opts.numbers, opts.symbols].filter(Boolean).length
  const score = length * types
  if (score < 20) return { label: "Weak", color: "text-red-400", variant: "destructive" }
  if (score < 40) return { label: "Moderate", color: "text-yellow-400", variant: "glass" }
  return { label: "Strong", color: "text-green-400", variant: "success" }
}

export function PasswordGeneratorWidget() {
  const [length, setLength] = useState(20)
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true })
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    setPassword(generatePassword(length, opts))
    setCopied(false)
  }, [length, opts])

  const toggle = (key: keyof typeof opts) => {
    setOpts((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  async function copyToClipboard() {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const strength = getStrength(length, opts)
  const allDisabled = !opts.upper && !opts.lower && !opts.numbers && !opts.symbols

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/70">Password Length: {length}</label>
              <Badge variant={strength.variant} className="text-xs">
                {strength.label}
              </Badge>
            </div>
            <input
              type="range"
              min={6}
              max={64}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-purple-500"
            />
            <div className="flex justify-between text-xs text-white/30">
              <span>6</span>
              <span>64</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: "upper" as const, label: "A-Z", desc: "Uppercase" },
              { key: "lower" as const, label: "a-z", desc: "Lowercase" },
              { key: "numbers" as const, label: "0-9", desc: "Numbers" },
              { key: "symbols" as const, label: "#$%", desc: "Symbols" },
            ].map(({ key, label, desc }) => (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                className={`glass rounded-xl p-3 text-center transition-all duration-200 ${
                  opts[key]
                    ? "border-purple-500/40 bg-purple-500/10"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-[10px] text-white/40">{desc}</p>
              </button>
            ))}
          </div>

          <Button
            onClick={generate}
            className="w-full"
            disabled={allDisabled}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Password
          </Button>
        </CardContent>
      </Card>

      {password && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-2">
              <Input
                readOnly
                value={password}
                className="flex-1 text-base font-mono tracking-wider text-center"
              />
              <Button variant="outline" size="icon" onClick={copyToClipboard} title="Copy to clipboard">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={generate} title="Regenerate">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {copied && (
              <p className="text-xs text-green-400 text-center">Copied to clipboard!</p>
            )}

            <div className="flex flex-wrap gap-4 text-xs text-white/40 justify-center">
              <span>{length} characters</span>
              <span>
                {[
                  opts.upper && "A-Z",
                  opts.lower && "a-z",
                  opts.numbers && "0-9",
                  opts.symbols && "#$%",
                ].filter(Boolean).join(" | ")}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {!password && (
        <Card>
          <CardContent className="p-8 text-center">
            <span className="text-4xl block mb-3">🔑</span>
            <p className="text-white/50 text-sm">
              Configure your preferences and generate a secure password
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
