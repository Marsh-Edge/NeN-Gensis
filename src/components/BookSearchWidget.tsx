"use client"

import { useEffect, useRef, useState } from "react"
import { Search, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
import type { BookData } from "@/lib/types"

function CoverImage({ coverId, title }: { coverId: number | null; title: string }) {
  if (!coverId) {
    return (
      <div className="w-12 h-18 sm:w-16 sm:h-24 rounded bg-foreground/5 flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-5 h-5 text-muted-foreground/40" aria-hidden="true" />
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
      alt={title}
      width={48}
      height={72}
      className="w-12 h-18 sm:w-16 sm:h-24 rounded object-cover flex-shrink-0"
      loading="lazy"
    />
  )
}

export function BookSearchWidget() {
  const { value: initial, set: setUrl } = useUrlParam("query")
  const [query, setQuery] = useState(initial)
  const [results, setResults] = useState<BookData[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)
  const lastQuery = useRef("")
  const ranRef = useRef(false)

  async function run(raw: string) {
    const value = raw.trim()
    if (!value) return
    lastQuery.current = value

    setLoading(true)
    setError("")
    setResults([])
    setSearched(true)

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: value }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Something went wrong")
        return
      }
      setResults(json.results ?? [])
      setTotal(json.total ?? 0)
    } catch {
      setError("Failed to search books")
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
    setUrl(query.trim())
    run(query)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2 sm:gap-3">
        <Input
          name="query"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="Search by title or author…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Book title or author"
          className="flex-1 min-w-0"
        />
        <Button type="submit" disabled={loading || !query.trim()}>
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
        <>
          <p className="text-sm text-muted-foreground tabular-nums">
            Found {total.toLocaleString()} result{total !== 1 ? "s" : ""}
          </p>
          <div className="space-y-3 animate-fade-in-up">
            {results.map((book, i) => (
              <Card key={`${book.title}-${i}`}>
                <CardContent className="p-4 flex gap-4 items-start">
                  <CoverImage coverId={book.coverId} title={book.title} />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-semibold text-foreground truncate">{book.title}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
                    {book.firstPublishYear && (
                      <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">
                        First published: {book.firstPublishYear}
                      </p>
                    )}
                    {book.isbn.length > 0 && (
                      <p className="text-xs text-muted-foreground/70 mt-1.5 truncate font-mono">
                        ISBN: {book.isbn.join(", ")}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {!loading && !results.length && !error && !searched && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" aria-hidden="true" />
            <p className="text-muted-foreground text-sm">
              Search for books by title or author
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !results.length && !error && searched && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground text-sm">No books found. Try a different search term.</p>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground/70 text-center">
        Powered by Open Library (free, no API key needed)
      </p>
    </div>
  )
}
