import { Category, ApiTool } from "./types"

export const categories: Category[] = [
  {
    slug: "general",
    name: "General",
    description: "Everyday utilities — weather, IP info, and more",
    icon: "🌐",
  },
  {
    slug: "data",
    name: "Data & Info",
    description: "Fetch structured data about countries, universities, and more",
    icon: "📊",
  },
  {
    slug: "development",
    name: "Development",
    description: "APIs for developers — GitHub, code tools, and more",
    icon: "🛠",
  },
  {
    slug: "media",
    name: "Media",
    description: "Images, placeholders, and creative media APIs",
    icon: "🎨",
  },
]

export const apiTools: ApiTool[] = [
  {
    slug: "weather",
    name: "Weather",
    description: "Get current weather and 3-day forecast for any city",
    categorySlug: "general",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "ip-info",
    name: "IP Info",
    description: "Look up details about any IP address",
    categorySlug: "general",
    isInteractive: true,
    status: "coming-soon",
  },
  {
    slug: "countries",
    name: "Countries",
    description: "Search for country details — capital, population, flag, and more",
    categorySlug: "data",
    isInteractive: true,
    status: "coming-soon",
  },
  {
    slug: "universities",
    name: "Universities",
    description: "Find universities and colleges worldwide by name or country",
    categorySlug: "data",
    isInteractive: true,
    status: "coming-soon",
  },
  {
    slug: "github-users",
    name: "GitHub Users",
    description: "Look up GitHub profiles and repositories",
    categorySlug: "development",
    isInteractive: true,
    status: "coming-soon",
  },
  {
    slug: "placeholder-images",
    name: "Placeholder Images",
    description: "Generate placeholder images with custom dimensions",
    categorySlug: "media",
    isInteractive: true,
    status: "coming-soon",
  },
]

export function getToolsByCategory(slug: string): ApiTool[] {
  return apiTools.filter((t) => t.categorySlug === slug)
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getTool(slug: string): ApiTool | undefined {
  return apiTools.find((t) => t.slug === slug)
}
