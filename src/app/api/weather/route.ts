import { NextResponse } from "next/server"

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast"

const weatherCodes: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear", icon: "☀️" },
  1: { label: "Mainly Clear", icon: "🌤" },
  2: { label: "Partly Cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Foggy", icon: "🌫" },
  48: { label: "Depositing Rime Fog", icon: "🌫" },
  51: { label: "Light Drizzle", icon: "🌦" },
  53: { label: "Moderate Drizzle", icon: "🌦" },
  55: { label: "Dense Drizzle", icon: "🌧" },
  61: { label: "Slight Rain", icon: "🌦" },
  63: { label: "Moderate Rain", icon: "🌧" },
  65: { label: "Heavy Rain", icon: "🌧" },
  71: { label: "Slight Snow", icon: "🌨" },
  73: { label: "Moderate Snow", icon: "🌨" },
  75: { label: "Heavy Snow", icon: "❄️" },
  80: { label: "Slight Rain Showers", icon: "🌦" },
  81: { label: "Moderate Rain Showers", icon: "🌧" },
  82: { label: "Violent Rain Showers", icon: "🌧" },
  95: { label: "Thunderstorm", icon: "⛈" },
  96: { label: "Thunderstorm with Hail", icon: "⛈" },
  99: { label: "Thunderstorm with Heavy Hail", icon: "⛈" },
}

export async function POST(req: Request) {
  try {
    const { city } = await req.json()

    if (!city || typeof city !== "string" || !city.trim()) {
      return NextResponse.json(
        { error: "City name is required" },
        { status: 400 }
      )
    }

    const geoRes = await fetch(
      `${GEOCODING_URL}?name=${encodeURIComponent(city.trim())}&count=1&language=en&format=json`
    )

    if (!geoRes.ok) {
      return NextResponse.json(
        { error: "Failed to find city" },
        { status: 502 }
      )
    }

    const geoData = await geoRes.json()

    if (!geoData.results || geoData.results.length === 0) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      )
    }

    const { latitude, longitude, name, country } = geoData.results[0]

    const weatherRes = await fetch(
      `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}` +
      "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,surface_pressure,uv_index,cloud_cover" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max" +
      "&forecast_days=3&timezone=auto"
    )

    if (!weatherRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: 502 }
      )
    }

    const weatherData = await weatherRes.json()
    const current = weatherData.current
    const daily = weatherData.daily

    const currentCode = current.weather_code as number
    const currentWeather = weatherCodes[currentCode] ?? {
      label: "Unknown",
      icon: "❓",
    }

    const forecast = daily.time.map((date: string, i: number) => {
      const code = daily.weather_code[i] as number
      const w = weatherCodes[code] ?? { label: "Unknown", icon: "❓" }
      return {
        date,
        tempMax: daily.temperature_2m_max[i],
        tempMin: daily.temperature_2m_min[i],
        condition: w.label,
        icon: w.icon,
        sunrise: daily.sunrise[i],
        sunset: daily.sunset[i],
        precipitationSum: daily.precipitation_sum[i],
        precipitationProbability: daily.precipitation_probability_max[i],
      }
    })

    return NextResponse.json({
      city: name,
      country: country ?? "",
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      windDirection: current.wind_direction_10m,
      windGusts: current.wind_gusts_10m,
      pressure: Math.round(current.surface_pressure),
      precipitation: current.precipitation,
      cloudCover: current.cloud_cover,
      uvIndex: current.uv_index,
      condition: currentWeather.label,
      icon: currentWeather.icon,
      forecast,
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
