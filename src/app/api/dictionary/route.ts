import { NextResponse } from "next/server"

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en"

export async function POST(req: Request) {
  try {
    const { word } = await req.json()

    if (!word || typeof word !== "string" || !word.trim()) {
      return NextResponse.json(
        { error: "Word is required" },
        { status: 400 }
      )
    }

    const res = await fetch(
      `${API_URL}/${encodeURIComponent(word.trim().toLowerCase())}`,
      { headers: { "Accept": "application/json" } }
    )

    if (res.status === 404) {
      return NextResponse.json(
        { error: `Word "${word.trim()}" not found` },
        { status: 404 }
      )
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch dictionary data" },
        { status: 502 }
      )
    }

    const data = await res.json()
    const entry = data[0]

    return NextResponse.json({
      word: entry.word,
      phonetic: entry.phonetic ?? "",
      phonetics: (entry.phonetics ?? []).map((p: { text?: string; audio?: string }) => ({
        text: p.text ?? "",
        audio: p.audio ?? "",
      })),
      meanings: (entry.meanings ?? []).map((m: {
        partOfSpeech: string
        definitions: { definition: string; example?: string; synonyms?: string[] }[]
      }) => ({
        partOfSpeech: m.partOfSpeech,
        definitions: (m.definitions ?? []).map((d) => ({
          definition: d.definition,
          example: d.example ?? "",
          synonyms: d.synonyms ?? [],
        })),
      })),
    })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
