import type { Metadata } from "next"
import { getTool } from "./constants"

export interface ToolApiDoc {
  endpoint?: string
  method?: string
  requestBody?: string
  exampleResponse?: string
  sourceUrl?: string
  sourceLabel?: string
  clientSide?: boolean
}

export const toolApiDocs: Record<string, ToolApiDoc> = {
  weather: {
    endpoint: "/api/weather",
    method: "POST",
    requestBody: '{ "city": "London" }',
    exampleResponse: `{
  "city": "London",
  "country": "GB",
  "temperature": 15,
  "condition": "Partly Cloudy",
  "humidity": 72,
  "windSpeed": 12.5,
  "forecast": [...]
}`,
    sourceUrl: "https://open-meteo.com",
    sourceLabel: "Open-Meteo Weather API",
  },
  dictionary: {
    endpoint: "/api/dictionary",
    method: "POST",
    requestBody: '{ "word": "serendipity" }',
    exampleResponse: `{
  "word": "serendipity",
  "phonetic": "/ˌsɛrənˈdɪpɪti/",
  "meanings": [
    {
      "partOfSpeech": "noun",
      "definitions": [...]
    }
  ]
}`,
    sourceUrl: "https://api.dictionaryapi.dev",
    sourceLabel: "Free Dictionary API",
  },
  "qr-code": {
    endpoint: "/api/qr-code",
    method: "POST",
    requestBody: '{ "data": "https://example.com", "size": 250 }',
    exampleResponse: "(binary PNG image data)",
    sourceUrl: "https://goqr.me/api",
    sourceLabel: "goQR.me API",
  },
  "password-generator": {
    clientSide: true,
    exampleResponse: `{
  "password": "aB3#kL9$xQ2@mN7&"
}`,
    sourceLabel: "Client-side generation",
  },
  "ip-info": {
    endpoint: "/api/ip-info",
    method: "POST",
    requestBody: '{ "ip": "8.8.8.8" }',
    exampleResponse: `{
  "ip": "8.8.8.8",
  "country": "United States",
  "city": "Mountain View",
  "isp": "Google LLC",
  "org": "Google Public DNS",
  "lat": 37.4056,
  "lon": -122.0775
}`,
    sourceUrl: "https://ipwho.is",
    sourceLabel: "ipwho.is",
  },
  "dns-lookup": {
    endpoint: "/api/dns-lookup",
    method: "POST",
    requestBody: '{ "domain": "example.com", "type": "A" }',
    exampleResponse: `{
  "domain": "example.com",
  "records": [
    { "name": "example.com", "type": 1, "typeLabel": "A", "TTL": 3600, "data": "93.184.216.34" }
  ]
}`,
    sourceUrl: "https://dns.google",
    sourceLabel: "Google DNS-over-HTTPS",
  },
  "header-check": {
    endpoint: "/api/header-check",
    method: "POST",
    requestBody: '{ "url": "https://example.com" }',
    exampleResponse: `{
  "url": "https://example.com",
  "statusCode": 200,
  "headers": [
    { "key": "Content-Type", "value": "text/html", "security": false },
    { "key": "Strict-Transport-Security", "value": "max-age=31536000", "security": true }
  ]
}`,
    sourceLabel: "Server-side fetch",
  },
  countries: {
    endpoint: "/api/countries",
    method: "POST",
    requestBody: '{ "country": "France" }',
    exampleResponse: `{
  "name": "France",
  "capital": "Paris",
  "region": "Europe",
  "population": 67391582,
  "flag": "🇫🇷"
}`,
    sourceUrl: "https://countriesnow.space",
    sourceLabel: "CountriesNow API",
  },
  universities: {
    endpoint: "/api/universities",
    method: "POST",
    requestBody: '{ "name": "Harvard", "country": "United States" }',
    exampleResponse: `{
  "results": [
    { "name": "Harvard University", "country": "United States", "domains": ["harvard.edu"], "webPages": ["https://www.harvard.edu"] }
  ]
}`,
    sourceUrl: "https://hipolabs.com/univ",
    sourceLabel: "Hipolabs Universities API",
  },
  books: {
    endpoint: "/api/books",
    method: "POST",
    requestBody: '{ "query": "The Hobbit" }',
    exampleResponse: `{
  "results": [
    { "title": "The Hobbit", "author": "J.R.R. Tolkien", "firstPublishYear": 1937, "coverId": 123456 }
  ]
}`,
    sourceUrl: "https://openlibrary.org",
    sourceLabel: "Open Library API",
  },
  space: {
    endpoint: "/api/space",
    method: "GET",
    exampleResponse: `{
  "number": 7,
  "people": [
    { "name": "Oleg Kononenko", "craft": "ISS" },
    { "name": "Ye Guangfu", "craft": "Tiangong" }
  ]
}`,
    sourceUrl: "http://open-notify.org",
    sourceLabel: "Open Notify API",
  },
  "github-profile": {
    endpoint: "/api/github-profile",
    method: "POST",
    requestBody: '{ "username": "octocat" }',
    exampleResponse: `{
  "login": "octocat",
  "name": "The Octocat",
  "publicRepos": 8,
  "followers": 9000,
  "repos": [...]
}`,
    sourceUrl: "https://docs.github.com/en/rest",
    sourceLabel: "GitHub REST API",
  },
  "npm-package": {
    endpoint: "/api/npm-package",
    method: "POST",
    requestBody: '{ "package": "express" }',
    exampleResponse: `{
  "name": "express",
  "version": "4.19.2",
  "description": "Fast, unopinionated, minimalist web framework",
  "license": "MIT",
  "keywords": ["web", "framework", "node"]
}`,
    sourceUrl: "https://registry.npmjs.org",
    sourceLabel: "npm Registry API",
  },
  "pypi-package": {
    endpoint: "/api/pypi-package",
    method: "POST",
    requestBody: '{ "package": "requests" }',
    exampleResponse: `{
  "name": "requests",
  "version": "2.31.0",
  "summary": "Python HTTP for Humans.",
  "author": "Kenneth Reitz",
  "requiresPython": ">=3.7"
}`,
    sourceUrl: "https://pypi.org",
    sourceLabel: "PyPI JSON API",
  },
  "uuid-generator": {
    clientSide: true,
    exampleResponse: `{
  "uuids": [
    "550e8400-e29b-41d4-a716-446655440000",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
  ]
}`,
    sourceLabel: "Client-side generation",
  },
  "placeholder-images": {
    endpoint: "/api/placeholder",
    method: "POST",
    requestBody: '{ "width": 800, "height": 600 }',
    exampleResponse: `{
  "id": "237",
  "url": "https://picsum.photos/id/237/800/600",
  "author": "Charles Deluvio",
  "width": 800,
  "height": 600
}`,
    sourceUrl: "https://picsum.photos",
    sourceLabel: "Lorem Picsum API",
  },
  "avatar-generator": {
    endpoint: "/api/avatar",
    method: "POST",
    requestBody: '{ "seed": "John", "style": "adventurer" }',
    exampleResponse: `{
  "seed": "John",
  "style": "adventurer",
  "imageUrl": "https://api.dicebear.com/9.x/adventurer/svg?seed=John"
}`,
    sourceUrl: "https://dicebear.com",
    sourceLabel: "DiceBear Avatars",
  },
  "color-tools": {
    clientSide: true,
    exampleResponse: `{
  "hex": "#ff6b6b",
  "rgb": { "r": 255, "g": 107, "b": 107 },
  "hsl": { "h": 0, "s": 100, "l": 71 }
}`,
    sourceLabel: "Client-side conversion",
  },
  "random-animal": {
    endpoint: "/api/random-animal",
    method: "POST",
    requestBody: '{ "type": "cat" }',
    exampleResponse: `{
  "type": "cat",
  "imageUrl": "https://cataas.com/cat/60",
  "tags": ["cute"]
}`,
    sourceUrl: "https://cataas.com",
    sourceLabel: "Cataas & RandomFox APIs",
  },
  "currency-converter": {
    endpoint: "/api/currency",
    method: "POST",
    requestBody: '{ "amount": 100, "from": "USD", "to": "EUR" }',
    exampleResponse: `{
  "amount": 100,
  "from": "USD",
  "to": "EUR",
  "rate": 0.9234,
  "result": 92.34
}`,
    sourceUrl: "https://frankfurter.app",
    sourceLabel: "Frankfurter API (ECB data)",
  },
}

export function toolMetadata(slug: string) {
  return function generateMetadata(): Metadata {
    const tool = getTool(slug)
    if (!tool) return {}
    return {
      title: tool.name,
      description: tool.description,
      alternates: { canonical: `/tools/${slug}` },
      openGraph: {
        title: tool.name,
        description: tool.description,
        url: `/tools/${slug}`,
      },
      twitter: {
        title: tool.name,
        description: tool.description,
      },
    }
  }
}
