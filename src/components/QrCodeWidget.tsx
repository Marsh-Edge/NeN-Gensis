"use client"

import { useEffect, useRef, useState } from "react"
import { Download, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"

export function QrCodeWidget() {
  const { value: initial, set: setUrl } = useUrlParam("data")
  const [text, setText] = useState(initial)
  const [qrUrl, setQrUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const urlRef = useRef("")
  const lastQuery = useRef("")
  const ranRef = useRef(false)

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  async function run(raw: string) {
    const value = raw.trim()
    if (!value) return
    lastQuery.current = value

    setLoading(true)
    setError("")
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current)
      urlRef.current = ""
    }
    setQrUrl("")

    try {
      const res = await fetch("/api/qr-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: value, size: 250 }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => null)
        setError(json?.error ?? "Failed to generate QR code")
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      urlRef.current = url
      setQrUrl(url)
    } catch {
      setError("Failed to generate QR code")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!ranRef.current) {
      ranRef.current = true
      run(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setUrl(text.trim())
    run(text)
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
          name="data"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="Enter text or URL…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Text or URL to encode"
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !text.trim()}>
          Generate
        </Button>
      </form>

      {error && <ErrorState message={error} onRetry={() => run(lastQuery.current)} />}

      {loading && (
        <div className="flex justify-center">
          <Skeleton className="w-64 h-64 rounded-2xl" />
        </div>
      )}

      {!loading && qrUrl && (
        <div className="flex flex-col items-center gap-4 animate-fade-in-up">
          <Card className="p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt={text ? `QR code for ${text}` : "Generated QR code"}
              width={256}
              height={256}
              decoding="async"
              className="w-64 h-64"
            />
          </Card>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Download PNG
          </Button>
        </div>
      )}

      {!loading && !qrUrl && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <QrCode className="w-10 h-10 mx-auto mb-3 text-muted-foreground" aria-hidden="true" />
            <p className="text-muted-foreground text-sm">
              Enter text or a URL to generate a QR code
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
