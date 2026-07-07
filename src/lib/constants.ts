import { Category, ApiTool } from "./types"

export const categories: Category[] = [
  {
    slug: "general",
    name: "General",
    description: "Everyday utilities — weather, time, and geolocation tools",
    icon: "🌐",
    accent: "from-sky-400 to-blue-600",
  },
  {
    slug: "security",
    name: "Security & Network",
    description: "Network diagnostics, IP lookup, and security tools",
    icon: "🔒",
    accent: "from-rose-400 to-red-600",
  },
  {
    slug: "data",
    name: "Data & Knowledge",
    description: "Structured data about countries, universities, and more",
    icon: "📚",
    accent: "from-emerald-400 to-teal-600",
  },
  {
    slug: "development",
    name: "Development",
    description: "APIs for developers — GitHub, code utilities, and references",
    icon: "🛠",
    accent: "from-violet-400 to-purple-600",
  },
  {
    slug: "media",
    name: "Media",
    description: "Images, placeholders, and creative content APIs",
    icon: "🎨",
    accent: "from-pink-400 to-rose-600",
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
    description: "Look up geolocation and network details for any IP address",
    categorySlug: "security",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "dns-lookup",
    name: "DNS Lookup",
    description: "Resolve DNS records — A, AAAA, MX, NS, TXT, and more",
    categorySlug: "security",
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

export const categoryDotColors: Record<string, string> = {
  general: "bg-sky-400",
  security: "bg-rose-400",
  data: "bg-emerald-400",
  development: "bg-violet-400",
  media: "bg-pink-400",
}

export function getToolsByCategory(slug: string): ApiTool[] {
  return apiTools.filter((t) => t.categorySlug === slug)
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getTool(slug: string): ApiTool | undefined {
  return apiTools.find((t) => t.slug === slug)
}
