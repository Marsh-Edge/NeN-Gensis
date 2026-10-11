"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Volume2, BookOpenText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
import type { DictionaryEntry } from "@/lib/types"

export function DictionaryWidget() {
  const { value: initial, set: setUrl } = useUrlParam("word")
  const [word, setWord] = useState(initial)
  const [data, setData] = useState<DictionaryEntry | null>(null)
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
      const res = await fetch("/api/dictionary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: value }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Something went wrong")
        return
      }
      setData(json)
    } catch {
      setError("Failed to fetch dictionary data")
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
    setUrl(word.trim())
    run(word)
  }

  function playAudio(url: string) {
    if (!url) return
    new Audio(url).play().catch(() => {})
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          name="word"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="Enter a word…"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          aria-label="Word to look up"
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !word.trim()}>
          <Search className="h-4 w-4 mr-2" aria-hidden="true" />
          Search
        </Button>
      </form>

      {error && <ErrorState message={error} onRetry={() => run(lastQuery.current)} />}

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {!loading && data && (
        <Card className="animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-foreground">{data.word}</h3>
                  {data.phonetic && (
                    <span className="text-sm text-muted-foreground font-mono">
                      {data.phonetic}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {data.phonetics.filter(p => p.audio).map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => playAudio(p.audio)}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                      aria-label={`Play pronunciation${p.text ? `: ${p.text}` : ""}`}
                    >
                      <Volume2 className="w-3 h-3" aria-hidden="true" />
                      {p.text || "Pronounce"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {data.meanings.map((meaning, i) => (
                <div key={i}>
                  <Badge variant="glass" className="mb-3 text-xs">
                    {meaning.partOfSpeech}
                  </Badge>

                  <div className="space-y-3">
                    {meaning.definitions.map((def, j) => (
                      <div key={j} className="border-l-2 border-border pl-4">
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {j + 1}. {def.definition}
                        </p>
                        {def.example && (
                          <p className="text-sm text-muted-foreground italic mt-1">
                            &ldquo;{def.example}&rdquo;
                          </p>
                        )}
                        {def.synonyms.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {def.synonyms.slice(0, 4).map((syn, k) => (
                              <Badge key={k} variant="outline" className="text-[10px] text-muted-foreground border-border">
                                {syn}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpenText className="w-10 h-10 mx-auto mb-3 text-muted-foreground" aria-hidden="true" />
            <p className="text-muted-foreground text-sm">
              Search for a word to see its definition, phonetics, and examples
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
