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
