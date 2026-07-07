"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function QrCodeWidget() {
  const [text, setText] = useState("")
  const [qrUrl, setQrUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    setError("")
    setQrUrl("")

    try {
      const res = await fetch("/api/qr-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: text.trim(), size: 250 }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => null)
        setError(json?.error ?? "Failed to generate QR code")
        return
      }

      const blob = await res.blob()
      setQrUrl(URL.createObjectURL(blob))
    } catch {
      setError("Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }

  function handleDownload() {
    if (!qrUrl) return
    const a = document.createElement("a")
    a.href = qrUrl
    a.download = "qrcode.png"
    a.click()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleGenerate} className="flex gap-3">
        <Input
          placeholder="Enter text or URL..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !text.trim()}>
          Generate
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
        <div className="flex justify-center">
          <Skeleton className="w-64 h-64 rounded-2xl" />
        </div>
      )}

      {!loading && qrUrl && (
        <div className="flex flex-col items-center gap-4">
          <Card className="p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="QR Code"
              className="w-64 h-64"
            />
          </Card>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </Button>
        </div>
      )}

      {!loading && !qrUrl && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <span className="text-4xl block mb-3">📱</span>
            <p className="text-white/50 text-sm">
              Enter text or a URL to generate a QR code
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
