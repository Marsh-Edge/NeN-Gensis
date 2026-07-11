import { Category, ApiTool } from "./types"

export const categories: Category[] = [
  {
    slug: "general",
    name: "General",
    description: "Everyday utilities — weather, QR codes, dictionary, passwords, and more",
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
    description: "Countries, books, universities, and space — explore the world's data",
    icon: "📚",
    accent: "from-emerald-400 to-teal-600",
  },
  {
    slug: "development",
    name: "Development",
    description: "GitHub profiles, package registries, and dev utilities",
    icon: "🛠",
    accent: "from-violet-400 to-purple-600",
  },
  {
    slug: "media",
    name: "Media",
    description: "Placeholder images, avatars, colors, and animals",
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
    slug: "dictionary",
    name: "Dictionary",
    description: "Look up word definitions, phonetics, pronunciations, and examples",
    categorySlug: "general",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "qr-code",
    name: "QR Code Generator",
    description: "Generate QR codes from any text or URL — download or share",
    categorySlug: "general",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Create strong, secure passwords with customizable options",
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
    status: "active",
  },
  {
    slug: "header-check",
    name: "HTTP Header Checker",
    description: "Inspect HTTP response headers of any URL — security, CORS, caching, and more",
    categorySlug: "security",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "countries",
    name: "Countries",
    description: "Search for country details — capital, population, flag, and more",
    categorySlug: "data",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "universities",
    name: "Universities",
    description: "Find universities and colleges worldwide by name or country",
    categorySlug: "data",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "books",
    name: "Book Search",
    description: "Search for books by title or author — covers, publish years, and more",
    categorySlug: "data",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "space",
    name: "People in Space",
    description: "See who's currently aboard the ISS and Tiangong space stations",
    categorySlug: "data",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "github-profile",
    name: "GitHub Profile",
    description: "Look up GitHub users — profile, stats, and top repositories",
    categorySlug: "development",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "npm-package",
    name: "npm Lookup",
    description: "Inspect npm packages — version, license, dependencies, and more",
    categorySlug: "development",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "pypi-package",
    name: "PyPI Lookup",
    description: "Look up Python packages on PyPI — version, author, and requirements",
    categorySlug: "development",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUIDs (v4) — copy to clipboard instantly",
    categorySlug: "development",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "placeholder-images",
    name: "Placeholder Images",
    description: "Generate random placeholder images with custom dimensions",
    categorySlug: "media",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "avatar-generator",
    name: "Avatar Generator",
    description: "Create random avatars by seed — DiceBear, multiple styles",
    categorySlug: "media",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "color-tools",
    name: "Color Tools",
    description: "Convert between HEX, RGB, HSL — preview and generate palettes",
    categorySlug: "media",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "random-animal",
    name: "Random Animals",
    description: "Random cat and fox images — fun for testing and design",
    categorySlug: "media",
    isInteractive: true,
    status: "active",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description: "Convert between 30+ currencies with live exchange rates from the ECB",
    categorySlug: "data",
    isInteractive: true,
    status: "active",
  },
]

export const categoryDotColors: Record<string, string> = {
  general: "bg-sky-400",
  security: "bg-rose-400",
  data: "bg-emerald-400",
  development: "bg-violet-400",
  media: "bg-pink-400",
}

export const categoryToolIcons: Record<string, string> = {
  weather: "🌤",
  dictionary: "📖",
  "qr-code": "📱",
  "password-generator": "🔑",
  "ip-info": "🔒",
  "dns-lookup": "🌐",
  "header-check": "📋",
  countries: "🌍",
  universities: "🏛",
  books: "📚",
  space: "🚀",
  "github-profile": "🐙",
  "npm-package": "📦",
  "pypi-package": "🐍",
  "uuid-generator": "🔢",
  "placeholder-images": "🖼",
  "avatar-generator": "👤",
  "color-tools": "🎨",
  "random-animal": "🐱",
  "currency-converter": "💱",
}

export const dnsTypeLabels: Record<number, string> = {
  1: "A",
  28: "AAAA",
  15: "MX",
  16: "TXT",
  5: "CNAME",
  2: "NS",
  6: "SOA",
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
