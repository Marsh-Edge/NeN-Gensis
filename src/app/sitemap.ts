import type { MetadataRoute } from "next"
import { apiTools, categories } from "@/lib/constants"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const toolRoutes: MetadataRoute.Sitemap = apiTools.map((t) => ({
    url: `${siteUrl}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes]
}
