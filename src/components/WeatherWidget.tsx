"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Sunrise, Sunset, CloudSun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
import type { WeatherData } from "@/lib/types"

function WindDirection({ deg }: { deg: number }) {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
  const index = Math.round(deg / 22.5) % 16
  const label = dirs[index]
  const rotation = deg

  return (
    <span className="inline-flex items-center gap-1" title={`${deg}° ${label}`} aria-label={`${deg} degrees ${label}`}>
      <svg
        className="w-3.5 h-3.5 text-muted-foreground"
        viewBox="0 0 16 16"
        aria-hidden="true"
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
      ? "text-green-500"
      : index <= 5
        ? "text-yellow-500"
        : index <= 7
          ? "text-orange-500"
          : "text-red-500"

  return (
    <span className={`${color} font-medium`} title={level}>
      {index.toFixed(1)} {level}
    </span>
  )
}

function MetricCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="text-lg font-semibold text-foreground tabular-nums">{children}</div>
    </div>
  )
}

export function WeatherWidget() {
  const { value: initial, set: setUrl } = useUrlParam("city")
  const [city, setCity] = useState(initial)
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const lastQuery = useRef("")
  const ranRef = useRef(false)

  async function run(raw: string) {
    const value = raw.trim()
    if (!value) return
    lastQuery.current = value

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: value }),
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

  useEffect(() => {
    if (!ranRef.current) {
      ranRef.current = true
      run(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setUrl(city.trim())
    run(city)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          name="city"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="Enter a city name…"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !city.trim()}>
          <Search className="h-4 w-4 mr-2" aria-hidden="true" />
          Search
        </Button>
      </form>

      {error && <ErrorState message={error} onRetry={() => run(lastQuery.current)} />}

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
          <Card className="animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {data.city}
                  </h3>
                  <p className="text-sm text-muted-foreground">{data.country}</p>
                </div>
                <span className="text-5xl" role="img" aria-label={data.condition}>{data.icon}</span>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-foreground tabular-nums">
                  {data.temperature}°
                </span>
                <span className="text-muted-foreground">{data.condition}</span>
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

          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            3-Day Forecast
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.forecast.map((day) => (
              <Card key={day.date}>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-3 text-center">
                    {new Intl.DateTimeFormat(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(day.date))}
                  </p>

                  <div className="text-center mb-3">
                    <span className="text-2xl block mb-1" role="img" aria-label={day.condition}>{day.icon}</span>
                    <p className="text-sm text-foreground/70">{day.condition}</p>
                  </div>

                  <div className="flex justify-center gap-3 text-sm mb-3 tabular-nums">
                    <span className="text-foreground font-medium">
                      {Math.round(day.tempMax)}°
                    </span>
                    <span className="text-muted-foreground">
                      {Math.round(day.tempMin)}°
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sunrise className="w-3 h-3" aria-hidden="true" />
                        Sunrise
                      </span>
                      <span className="text-foreground/70 tabular-nums">
                        {new Intl.DateTimeFormat(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(day.sunrise))}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sunset className="w-3 h-3" aria-hidden="true" />
                        Sunset
                      </span>
                      <span className="text-foreground/70 tabular-nums">
                        {new Intl.DateTimeFormat(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(day.sunset))}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rain</span>
                      <span className="text-foreground/70 tabular-nums">
                        {day.precipitationProbability}% · {day.precipitationSum}mm
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/70 text-center">
            Powered by Open-Meteo (free, no API key needed)
          </p>
        </>
      )}

      {!loading && !data && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <CloudSun className="w-10 h-10 mx-auto mb-3 text-muted-foreground" aria-hidden="true" />
            <p className="text-muted-foreground text-sm">
              Search for a city to see current weather and forecast
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
