"use client"

import { useState } from "react"
import { Search, Sunrise, Sunset, CloudSun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { WeatherData } from "@/lib/types"

function WindDirection({ deg }: { deg: number }) {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
  const index = Math.round(deg / 22.5) % 16
  const label = dirs[index]
  const rotation = deg

  return (
    <span className="inline-flex items-center gap-1" title={`${deg}° ${label}`}>
      <svg
        className="w-3.5 h-3.5 text-white/60"
        viewBox="0 0 16 16"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <path
          fill="currentColor"
          d="M8 0 L10 6 L8 5 L6 6 Z"
        />
      </svg>
      {label}
    </span>
  )
}

function UvBadge({ index }: { index: number }) {
  const level = index <= 2 ? "Low" : index <= 5 ? "Moderate" : index <= 7 ? "High" : index <= 10 ? "Very High" : "Extreme"
  const color =
    index <= 2
      ? "text-green-400"
      : index <= 5
        ? "text-yellow-400"
        : index <= 7
          ? "text-orange-400"
          : "text-red-400"

  return (
    <span className={`${color} font-medium`} title={level}>
      {index.toFixed(1)} {level}
    </span>
  )
}

function MetricCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <div className="text-lg font-semibold text-white">{children}</div>
    </div>
  )
}

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
          <Skeleton className="h-48 w-full" />
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

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white">
                  {data.temperature}°
                </span>
                <span className="text-white/60">{data.condition}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <MetricCard label="Feels Like">
                  {data.feelsLike}°
                </MetricCard>
                <MetricCard label="Humidity">
                  {data.humidity}%
                </MetricCard>
                <MetricCard label="Wind">
                  {data.windSpeed} km/h
                </MetricCard>
                <MetricCard label="Wind Dir.">
                  <WindDirection deg={data.windDirection} />
                </MetricCard>
                <MetricCard label="Gusts">
                  {data.windGusts} km/h
                </MetricCard>
                <MetricCard label="Pressure">
                  {data.pressure} hPa
                </MetricCard>
                <MetricCard label="Precip.">
                  {data.precipitation} mm
                </MetricCard>
                <MetricCard label="Cloud Cover">
                  {data.cloudCover}%
                </MetricCard>
                <MetricCard label="UV Index">
                  <UvBadge index={data.uvIndex} />
                </MetricCard>
              </div>
            </CardContent>
          </Card>

          <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">
            3-Day Forecast
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.forecast.map((day) => (
              <Card key={day.date}>
                <CardContent className="p-4">
                  <p className="text-sm text-white/60 mb-3 text-center">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  <div className="text-center mb-3">
                    <span className="text-2xl block mb-1">{day.icon}</span>
                    <p className="text-sm text-white/70">{day.condition}</p>
                  </div>

                  <div className="flex justify-center gap-3 text-sm mb-3">
                    <span className="text-white font-medium">
                      {Math.round(day.tempMax)}°
                    </span>
                    <span className="text-white/40">
                      {Math.round(day.tempMin)}°
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-white/50">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sunrise className="w-3 h-3" />
                        Sunrise
                      </span>
                      <span className="text-white/70">
                        {new Date(day.sunrise).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sunset className="w-3 h-3" />
                        Sunset
                      </span>
                      <span className="text-white/70">
                        {new Date(day.sunset).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rain</span>
                      <span className="text-white/70">
                        {day.precipitationProbability}% · {day.precipitationSum}mm
                      </span>
                    </div>
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
            <CloudSun className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Search for a city to see current weather and forecast
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
