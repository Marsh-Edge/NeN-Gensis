"use client"

import { useEffect, useRef, useState } from "react"
import { RefreshCw, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
import type { RandomAnimalData } from "@/lib/types"

type AnimalType = "cat" | "fox"

export function RandomAnimalWidget() {
  const { value: initial, set: setUrl } = useUrlParam("type")
  const [type, setType] = useState<AnimalType>(initial === "cat" || initial === "fox" ? initial : "cat")
  const [data, setData] = useState<RandomAnimalData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const typeRef = useRef<AnimalType>(type)
  const ranRef = useRef(false)

  async function fetchAnimal(t: AnimalType) {
    setLoading(true)
    setError("")
    setData(null)
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

  async function runInitial() {
    if (!initial) return
    fetchAnimal(type)
  }

  useEffect(() => {
    if (!ranRef.current) {
      ranRef.current = true
      runInitial()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleShuffle() {
    fetchAnimal(typeRef.current)
  }

  function switchType(t: AnimalType) {
    setType(t)
    typeRef.current = t
    setUrl(t)
    fetchAnimal(t)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <div className="flex rounded-lg overflow-hidden border border-border">
          <button
            type="button"
            onClick={() => switchType("cat")}
            aria-pressed={type === "cat"}
            className={`px-4 py-2 text-sm transition-colors ${type === "cat" ? "bg-foreground/15 text-foreground" : "text-muted-foreground hover:text-foreground/60"}`}
          >
            <PawPrint className="w-4 h-4 mr-1.5 inline" aria-hidden="true" />
            Cat
          </button>
          <button
            type="button"
            onClick={() => switchType("fox")}
            aria-pressed={type === "fox"}
            className={`px-4 py-2 text-sm transition-colors ${type === "fox" ? "bg-foreground/15 text-foreground" : "text-muted-foreground hover:text-foreground/60"}`}
          >
            <PawPrint className="w-4 h-4 mr-1.5 inline" aria-hidden="true" />
            Fox
          </button>
        </div>
        <Button onClick={handleShuffle} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" /> Shuffle
        </Button>
      </div>

      {error && <ErrorState message={error} onRetry={handleShuffle} />}

      {loading && <Skeleton className="w-full aspect-square max-w-md mx-auto rounded-xl" />}

      {!loading && data && (
        <Card className="animate-fade-in-up">
          <CardContent className="p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.imageUrl}
              alt={`Random ${data.type}`}
              loading="lazy"
              decoding="async"
              className="w-full max-w-md mx-auto rounded-xl object-cover"
              style={{ maxHeight: "50vh" }}
            />
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <Badge variant="glass" className="text-xs capitalize">{data.type}</Badge>
              {data.tags.map((tag) => <Badge key={tag} variant="glass" className="text-[10px]">{tag}</Badge>)}
              <Badge variant="glass" className="text-[10px]">{data.source}</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground text-sm">Click Shuffle to see a random animal</p></CardContent></Card>
      )}

      <p className="text-xs text-muted-foreground/70 text-center">Powered by Cataas &amp; RandomFox (free, no API key needed)</p>
    </div>
  )
}
