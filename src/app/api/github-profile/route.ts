import { NextResponse } from "next/server"

const API_URL = "https://api.github.com"

export async function POST(req: Request) {
  try {
    const { username } = await req.json()
    if (!username || typeof username !== "string" || !username.trim()) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const login = username.trim()

    const [userRes, reposRes] = await Promise.all([
      fetch(`${API_URL}/users/${encodeURIComponent(login)}`, {
        headers: { "Accept": "application/json", "User-Agent": "NeN-Gensis" },
      }),
      fetch(`${API_URL}/users/${encodeURIComponent(login)}/repos?sort=updated&per_page=10`, {
        headers: { "Accept": "application/json", "User-Agent": "NeN-Gensis" },
      }),
    ])

    if (userRes.status === 404) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 })
    }
    if (!userRes.ok) {
      return NextResponse.json({ error: "Failed to fetch GitHub profile" }, { status: 502 })
    }

    const userData = await userRes.json()
    const reposData = reposRes.ok ? await reposRes.json() : []

    return NextResponse.json({
      login: userData.login,
      name: userData.name ?? userData.login,
      avatarUrl: userData.avatar_url,
      bio: userData.bio ?? "",
      location: userData.location ?? "",
      company: userData.company ?? "",
      blog: userData.blog ?? "",
      followers: userData.followers ?? 0,
      following: userData.following ?? 0,
      publicRepos: userData.public_repos ?? 0,
      publicGists: userData.public_gists ?? 0,
      createdAt: userData.created_at ?? "",
      repos: (reposData as Array<Record<string, unknown>>).map((r) => ({
        name: r.name ?? "",
        description: r.description ?? "",
        language: r.language ?? "",
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        url: r.html_url ?? "",
      })),
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
