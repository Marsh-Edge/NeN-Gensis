"use client"

import { useEffect, useRef, useState } from "react"
import { Search, ExternalLink, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
import type { UniversityData } from "@/lib/types"

export function UniversitiesWidget() {
  const { value: initial, set: setUrl } = useUrlParam("name")
  const [name, setName] = useState(initial)
  const [country, setCountry] = useState("")
  const [results, setResults] = useState<UniversityData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)
  const lastQuery = useRef("")
  const ranRef = useRef(false)

  async function run(rawName: string, rawCountry = "") {
    const value = rawName.trim()
    if (!value) return
    lastQuery.current = value

    setLoading(true)
    setError("")
    setResults([])
    setSearched(true)

    try {
      const body: Record<string, string> = { name: value }
      if (rawCountry.trim()) body.country = rawCountry.trim()

      const res = await fetch("/api/universities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Something went wrong")
        return
      }
      setResults(json.results ?? [])
    } catch {
      setError("Failed to fetch universities")
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
    setUrl(name.trim())
    run(name, country)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Input
          name="name"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="University name…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="University name"
          className="flex-1 min-w-0"
        />
        <Input
          name="country"
          autoComplete="off"
          spellCheck={false}
          placeholder="Country (optional)…"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          aria-label="Country filter (optional)"
          className="sm:w-48"
        />
        <Button type="submit" disabled={loading || !name.trim()}>
          <Search className="h-4 w-4 mr-2" aria-hidden="true" />
          Search
        </Button>
      </form>

      {error && <ErrorState message={error} onRetry={() => run(lastQuery.current)} />}

      {loading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-3 animate-fade-in-up">
          <p className="text-sm text-muted-foreground tabular-nums">
            Found {results.length} universit{results.length !== 1 ? "ies" : "y"}
          </p>
          {results.map((uni, i) => (
            <Card key={`${uni.name}-${i}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-semibold text-foreground">{uni.name}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{uni.country}</p>
                    {uni.domains.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {uni.domains.map((domain) => (
                          <Badge key={domain} variant="glass" className="text-[10px]">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  {uni.webPages.length > 0 && (
                    <a
                      href={uni.webPages[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${uni.name} website`}
                      className="glass rounded-lg p-2 hover:bg-foreground/10 transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && !results.length && !error && !searched && (
        <Card>
          <CardContent className="p-8 text-center">
            <GraduationCap className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" aria-hidden="true" />
            <p className="text-muted-foreground text-sm">
              Search for universities by name and optional country filter
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !results.length && !error && searched && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground text-sm">
              No universities found. Try a different name or country.
            </p>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground/70 text-center">
        Powered by Hipolabs Universities API (free, no API key needed)
      </p>
    </div>
  )
}
