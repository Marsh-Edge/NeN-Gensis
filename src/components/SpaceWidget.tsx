"use client"

import { useEffect, useState } from "react"
import { Rocket, Satellite } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { SpaceData } from "@/lib/types"

const craftColors: Record<string, string> = {
  ISS: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Tiangong: "bg-red-500/20 text-red-300 border-red-500/30",
}

function CraftBadge({ craft }: { craft: string }) {
  const colors = craftColors[craft] ?? "bg-white/10 text-white/60 border-white/10"
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${colors}`}>
      {craft}
    </span>
  )
}

export function SpaceWidget() {
  const [data, setData] = useState<SpaceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/space")
        const json = await res.json()
        if (!res.ok) {
          setError(json.error ?? "Failed to fetch")
          return
        }
        setData(json)
      } catch {
        setError("Failed to fetch space data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4 text-sm text-red-400">{error}</CardContent>
      </Card>
    )
  }

  if (!data) return null

  const iss = data.people.filter((p) => p.craft === "ISS")
  const tiangong = data.people.filter((p) => p.craft === "Tiangong")

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 text-center">
          <Rocket className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
          <p className="text-3xl font-bold text-foreground">{data.number}</p>
          <p className="text-sm text-muted-foreground mt-1">
            people currently in space
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Satellite className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-foreground text-sm">International Space Station</h3>
              <Badge variant="glass" className="ml-auto text-xs">{iss.length}</Badge>
            </div>
            <div className="space-y-2">
              {iss.map((person) => (
                <div key={person.name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-sm text-white/80">{person.name}</span>
                  <CraftBadge craft="ISS" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Satellite className="w-5 h-5 text-red-400" />
              <h3 className="font-semibold text-foreground text-sm">Tiangong</h3>
              <Badge variant="glass" className="ml-auto text-xs">{tiangong.length}</Badge>
            </div>
            <div className="space-y-2">
              {tiangong.map((person) => (
                <div key={person.name} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                  <span className="text-sm text-foreground/80">{person.name}</span>
                  <CraftBadge craft="Tiangong" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {data.people.length === 0 && (
        <p className="text-sm text-muted-foreground text-center">No one is currently in space.</p>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Powered by Open Notify (free, no API key needed)
      </p>
    </div>
  )
}
