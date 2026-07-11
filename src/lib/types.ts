export interface Category {
  slug: string
  name: string
  description: string
  icon: string
  accent: string
}

export interface ApiTool {
  slug: string
  name: string
  description: string
  categorySlug: string
  isInteractive: boolean
  status: "active" | "coming-soon"
}

export interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDirection: number
  windGusts: number
  pressure: number
  precipitation: number
  cloudCover: number
  uvIndex: number
  condition: string
  icon: string
  forecast: ForecastDay[]
}

export interface ForecastDay {
  date: string
  tempMax: number
  tempMin: number
  condition: string
  icon: string
  sunrise: string
  sunset: string
  precipitationSum: number
  precipitationProbability: number
}

export interface IpInfoData {
  ip: string
  status: "success" | "fail"
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  reverse: string
  mobile: boolean
  proxy: boolean
  hosting: boolean
}

export interface DictionaryEntry {
  word: string
  phonetic: string
  phonetics: { text: string; audio: string }[]
  meanings: {
    partOfSpeech: string
    definitions: { definition: string; example: string; synonyms: string[] }[]
  }[]
}

export interface DnsRecord {
  name: string
  type: number
  typeLabel: string
  TTL: number
  data: string
}

export interface DnsResponse {
  domain: string
  type: string
  records: DnsRecord[]
  status: "success" | "not_found" | "error"
}

export interface HeaderCheckData {
  url: string
  statusCode: number
  statusText: string
  duration: number
  headers: { key: string; value: string; security: boolean }[]
}

export interface CountryData {
  name: string
  capital: string
  iso2: string
  iso3: string
  currency: string
  flag: string
  lat: number
  lng: number
  population: number
  populationYear: number
}

export interface UniversityData {
  name: string
  country: string
  domains: string[]
  webPages: string[]
}

export interface BookData {
  title: string
  author: string
  firstPublishYear: number
  coverId: number
  isbn: string[]
}

export interface SpaceData {
  people: { name: string; craft: string }[]
  number: number
}

export interface GitHubProfileData {
  login: string
  name: string
  avatarUrl: string
  bio: string
  location: string
  company: string
  blog: string
  followers: number
  following: number
  publicRepos: number
  publicGists: number
  createdAt: string
  repos: {
    name: string
    description: string
    language: string
    stars: number
    forks: number
    url: string
  }[]
}

export interface NpmPackageData {
  name: string
  version: string
  description: string
  license: string
  homepage: string
  repository: string
  keywords: string[]
  maintainers: string[]
  dependencies: { name: string; version: string }[]
  lastPublish: string
}

export interface PypiPackageData {
  name: string
  version: string
  summary: string
  author: string
  authorEmail: string
  license: string
  requiresPython: string
  homePage: string
  projectUrls: Record<string, string>
  requiresDist: string[]
}

export interface PlaceholderData {
  url: string
  width: number
  height: number
  author: string
  downloadUrl: string
}

export interface AvatarData {
  svg: string
  seed: string
  style: string
}

export interface RandomAnimalData {
  type: "cat" | "fox"
  imageUrl: string
  tags: string[]
  source: string
}

export interface CurrencyData {
  amount: number
  from: string
  to: string
  rate: number
  result: number
}
