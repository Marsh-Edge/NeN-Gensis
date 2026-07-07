"use client"

import { useState } from "react"
import { RefreshCw, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { RandomAnimalData } from "@/lib/types"

export function RandomAnimalWidget() {
  const [type, setType] = useState<"cat" | "fox">("cat")
  const [data, setData] = useState<RandomAnimalData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function fetchAnimal(t: "cat" | "fox") {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/random-animal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: t }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? "Failed"); return }
      setData(json)
    } catch { setError("Failed to fetch animal image") }
    finally { setLoading(false) }
  }

  function handleShuffle() {
    fetchAnimal(type)
  }

  function switchType(t: "cat" | "fox") {
    setType(t)
    fetchAnimal(t)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 sm:gap-3">
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          <button
            onClick={() => switchType("cat")}
            className={`px-4 py-2 text-sm transition-colors ${type === "cat" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
          >
            <PawPrint className="w-4 h-4 mr-1.5 inline" />
            Cat
          </button>
          <button
            onClick={() => switchType("fox")}
            className={`px-4 py-2 text-sm transition-colors ${type === "fox" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
          >
            <PawPrint className="w-4 h-4 mr-1.5 inline" />
            Fox
          </button>
        </div>
        <Button onClick={handleShuffle} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" /> Shuffle
        </Button>
      </div>

      {error && <Card><CardContent className="p-4 text-sm text-red-400">{error}</CardContent></Card>}

      {loading && <Skeleton className="w-full aspect-square max-w-md mx-auto rounded-xl" />}

      {!loading && data && (
        <Card>
          <CardContent className="p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.imageUrl}
              alt={`Random ${data.type}`}
              className="w-full max-w-md mx-auto rounded-xl object-cover"
              style={{ maxHeight: "50vh" }}
            />
            <div className="flex items-center justify-center gap-2 mt-3">
              <Badge variant="glass" className="text-xs capitalize">{data.type}</Badge>
              {data.tags.map((tag) => <Badge key={tag} variant="glass" className="text-[10px]">{tag}</Badge>)}
              <Badge variant="glass" className="text-[10px]">{data.source}</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card><CardContent className="p-8 text-center"><p className="text-white/50 text-sm">Click Shuffle to see a random animal</p></CardContent></Card>
      )}

      <p className="text-xs text-white/30 text-center">Powered by Cataas &amp; RandomFox (free, no API key needed)</p>
    </div>
  )
}
