export interface Category {
  slug: string
  name: string
  description: string
  icon: string
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
}
