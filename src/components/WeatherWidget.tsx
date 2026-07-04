"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { WeatherData } from "@/lib/types"

export function WeatherWidget() {
  const [city, setCity] = useState("")
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: city.trim() }),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? "Something went wrong")
        return
      }

      setData(json)
    } catch {
      setError("Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          placeholder="Enter a city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !city.trim()}>
          <Search className="h-4 w-4 mr-2" />
          Search
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
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
      )}

      {!loading && data && (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {data.city}
                  </h3>
                  <p className="text-sm text-white/50">{data.country}</p>
                </div>
                <span className="text-5xl">{data.icon}</span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-white">
                  {data.temperature}°
                </span>
                <span className="text-white/60">{data.condition}</span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="glass rounded-xl p-3 text-center">
                  <p className="text-xs text-white/40 mb-1">Feels Like</p>
                  <p className="text-lg font-semibold text-white">
                    {data.feelsLike}°
                  </p>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <p className="text-xs text-white/40 mb-1">Humidity</p>
                  <p className="text-lg font-semibold text-white">
                    {data.humidity}%
                  </p>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <p className="text-xs text-white/40 mb-1">Wind</p>
                  <p className="text-lg font-semibold text-white">
                    {data.windSpeed} km/h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">
            3-Day Forecast
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.forecast.map((day) => (
              <Card key={day.date}>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-white/60 mb-2">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <span className="text-2xl block mb-2">{day.icon}</span>
                  <p className="text-sm text-white/70 mb-1">{day.condition}</p>
                  <div className="flex justify-center gap-2 text-sm">
                    <span className="text-white font-medium">
                      {Math.round(day.tempMax)}°
                    </span>
                    <span className="text-white/40">
                      {Math.round(day.tempMin)}°
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-xs text-white/30 text-center">
            Powered by Open-Meteo (free, no API key needed)
          </p>
        </>
      )}

      {!loading && !data && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <span className="text-4xl block mb-3">🌤</span>
            <p className="text-white/50 text-sm">
              Search for a city to see current weather and forecast
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
