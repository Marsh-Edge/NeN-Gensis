"use client"

import { useState } from "react"
import { Search, MapPin, Building, Link as LinkIcon, Users, Star, GitFork, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { GitHubProfileData } from "@/lib/types"

function MetricBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      <div className="flex justify-center mb-1 text-white/40">{icon}</div>
      <p className="text-xs text-white/40 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  )
}

export function GitHubProfileWidget() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState<GitHubProfileData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError("")
    setData(null)
    try {
      const res = await fetch("/api/github-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: query.trim() }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? "Something went wrong"); return }
      setData(json)
    } catch { setError("Failed to fetch GitHub profile") }
    finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2 sm:gap-3">
        <Input placeholder="GitHub username..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 min-w-0" />
        <Button type="submit" disabled={loading || !query.trim()}>
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </form>

      {error && <Card><CardContent className="p-4 text-sm text-red-400">{error}</CardContent></Card>}

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
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.avatarUrl} alt={data.login} className="w-16 h-16 rounded-full ring-2 ring-white/10" />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white">{data.name}</h3>
                <p className="text-sm text-white/40">@{data.login}</p>
                {data.bio && <p className="text-sm text-white/60 mt-1">{data.bio}</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-white/40">
                  {data.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.location}</span>}
                  {data.company && <span className="flex items-center gap-1"><Building className="w-3 h-3" />{data.company}</span>}
                  {data.blog && <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" /><a href={data.blog} target="_blank" rel="noopener noreferrer" className="hover:text-white/60">{data.blog.replace(/^https?:\/\//, "")}</a></span>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <MetricBox icon={<Users className="w-4 h-4" />} label="Followers" value={data.followers.toLocaleString()} />
              <MetricBox icon={<Users className="w-4 h-4" />} label="Following" value={data.following.toLocaleString()} />
              <MetricBox icon={<Code className="w-4 h-4" />} label="Public Repos" value={data.publicRepos.toLocaleString()} />
              <MetricBox icon={<Code className="w-4 h-4" />} label="Public Gists" value={data.publicGists.toLocaleString()} />
            </div>

            <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Top Repositories</h4>
            <div className="space-y-2">
              {data.repos.length === 0 && <p className="text-sm text-white/30">No public repositories</p>}
              {data.repos.map((repo) => (
                <Card key={repo.name} className="!bg-white/[0.02] !backdrop-blur-none !border-white/5">
                  <CardContent className="p-3 flex flex-col sm:flex-row sm:items-center gap-2">
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/80 hover:text-white truncate flex-1 min-w-0">{repo.name}</a>
                    <div className="flex items-center gap-3 text-xs text-white/40 flex-shrink-0">
                      {repo.language && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400/60" />{repo.language}</span>}
                      <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stars}</span>
                      <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !data && !error && (
        <Card><CardContent className="p-8 text-center"><p className="text-white/50 text-sm">Search for any GitHub username to see their profile and repos</p></CardContent></Card>
      )}

      <p className="text-xs text-white/30 text-center">Powered by GitHub API (free, no API key needed — 60 req/hr)</p>
    </div>
  )
}
