"use client"

import { useEffect, useRef, useState } from "react"
import { Search, MapPin, Building, Link as LinkIcon, Users, Star, GitFork, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MetricBox, ErrorState } from "@/components/widgets/shared"
import { useUrlParam } from "@/lib/useUrlParam"
import type { GitHubProfileData } from "@/lib/types"

export function GitHubProfileWidget() {
  const { value: initial, set: setUrl } = useUrlParam("username")
  const [query, setQuery] = useState(initial)
  const [data, setData] = useState<GitHubProfileData | null>(null)
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
      const res = await fetch("/api/github-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: value }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? "Something went wrong"); return }
      setData(json)
    } catch { setError("Failed to fetch GitHub profile") }
    finally { setLoading(false) }
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
          name="username"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="GitHub username…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="GitHub username"
          className="flex-1 min-w-0"
        />
        <Button type="submit" disabled={loading || !query.trim()}>
          <Search className="h-4 w-4 mr-2" aria-hidden="true" /> Search
        </Button>
      </form>

      {error && <ErrorState message={error} onRetry={() => run(lastQuery.current)} />}

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20" />)}
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      )}

      {!loading && data && (
        <Card className="animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.avatarUrl}
                alt={data.login}
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="w-16 h-16 rounded-full ring-2 ring-border"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-foreground">{data.name}</h2>
                <p className="text-sm text-muted-foreground">@{data.login}</p>
                {data.bio && <p className="text-sm text-foreground/70 mt-1">{data.bio}</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                  {data.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" aria-hidden="true" />{data.location}</span>}
                  {data.company && <span className="flex items-center gap-1"><Building className="w-3 h-3" aria-hidden="true" />{data.company}</span>}
                  {data.blog && <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" aria-hidden="true" /><a href={data.blog} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">{data.blog.replace(/^https?:\/\//, "")}</a></span>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <MetricBox icon={<Users className="w-4 h-4" aria-hidden="true" />} label="Followers" value={data.followers.toLocaleString()} />
              <MetricBox icon={<Users className="w-4 h-4" aria-hidden="true" />} label="Following" value={data.following.toLocaleString()} />
              <MetricBox icon={<Code className="w-4 h-4" aria-hidden="true" />} label="Public Repos" value={data.publicRepos.toLocaleString()} />
              <MetricBox icon={<Code className="w-4 h-4" aria-hidden="true" />} label="Public Gists" value={data.publicGists.toLocaleString()} />
            </div>

            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Top Repositories</h3>
            <div className="space-y-2">
              {data.repos.length === 0 && <p className="text-sm text-muted-foreground/70">No public repositories</p>}
              {data.repos.map((repo) => (
                <Card key={repo.name} className="!bg-foreground/[0.02] !backdrop-blur-none !border-border">
                  <CardContent className="p-3 flex flex-col sm:flex-row sm:items-center gap-2">
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground/80 hover:text-foreground truncate flex-1 min-w-0">{repo.name}</a>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                      {repo.language && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400/60" aria-hidden="true" />{repo.language}</span>}
                      <span className="flex items-center gap-1 tabular-nums"><Star className="w-3 h-3" aria-hidden="true" />{repo.stars}</span>
                      <span className="flex items-center gap-1 tabular-nums"><GitFork className="w-3 h-3" aria-hidden="true" />{repo.forks}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground text-sm">Search for any GitHub username to see their profile and repos</p></CardContent></Card>
      )}

      <p className="text-xs text-muted-foreground/70 text-center">Powered by GitHub API (free, no API key needed — 60 req/hr)</p>
    </div>
  )
}
