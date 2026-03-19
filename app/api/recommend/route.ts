/**
 * @file app/api/recommend/route.ts
 * @description Computes a single destination recommendation from a 4-answer quiz using Mistral.
 * @route POST /api/recommend
 * @body { answers: [string, string, string, string] }
 * @returns { destination, destinationId, title, explanation, catchphrase, matchScore } | { error: string }
 * @requires MISTRAL_API_KEY
 * @model mistral-small-latest (Mistral)
 */
import { Mistral } from "@mistralai/mistralai"
import { NextRequest, NextResponse } from "next/server"

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
})

const RECOMMENDATION_PROMPT = (answers: string[]) => `
Tu es le Contrôleur Temporel de TimeTravel Agency.
Un voyageur vient de répondre à ton questionnaire de personnalité.

Voici ses reponses :
1. Type d'expérience recherché : ${answers[0]}
2. Période préférée : ${answers[1]}
3. Ambiance préférée : ${answers[2]}
4. Activite ideale : ${answers[3]}

Les 3 destinations disponibles sont :
- PARIS 1889 : Belle Époque, Tour Eiffel, Moulin Rouge, impressionnistes,
  élégance urbaine, vie nocturne, Exposition Universelle.
  Idéal pour : culture, raffinement, histoire moderne, effervescence urbaine.
- FLORENCE 1504 : Renaissance italienne, Michel-Ange, Leonard de Vinci,
  Médicis, architecture, art, gastronomie, jardins.
  Idéal pour : art, architecture, classicisme, exploration culturelle.
- CRÉTACÉ -66M ANS : Dinosaures, jungle primordiale, T-Rex, Triceratops,
  nature préhistorique, aventure extrême, wilderness.
  Idéal pour : aventure, nature sauvage, observation de faune, sensations fortes.

Ta mission :
1. Analyse les reponses du voyageur
2. Recommande LA destination la plus adaptée (une seule)
3. Explique pourquoi en 3-4 phrases maximum, de façon personnalisée,
   en utilisant les reponses du voyageur
4. Termine par une phrase d'accroche poétique et mystérieuse
  qui donne envie de réserver

Reponds UNIQUEMENT en JSON valide, sans markdown, sans backticks :
{
  "destination": "PARIS 1889" | "FLORENCE 1504" | "CRÉTACÉ -66M ANS",
  "destinationId": "paris-1889" | "florence" | "cretace",
  "title": "Titre accrocheur personnalisé",
  "explanation": "Explication personnalisée 3-4 phrases",
  "catchphrase": "Phrase poétique finale",
  "matchScore": number between 85 and 99
}
`

interface Recommendation {
  destination: "PARIS 1889" | "FLORENCE 1504" | "CRÉTACÉ -66M ANS"
  destinationId: "paris-1889" | "florence" | "cretace"
  title: string
  explanation: string
  catchphrase: string
  matchScore: number
}

const FALLBACK_RECOMMENDATION: Recommendation = {
  destination: "PARIS 1889",
  destinationId: "paris-1889",
  title: "La Belle Époque vous tend les bras",
  explanation:
    "Votre profil de voyageur correspond parfaitement à l'effervescence parisienne de 1889. Paris vous attend.",
  catchphrase: "Le quai 9 vous attend, voyageur.",
  matchScore: 92,
}

const isRecommendation = (value: unknown): value is Recommendation => {
  if (!value || typeof value !== "object") {
    return false
  }

  const candidate = value as Record<string, unknown>
  const destinationOk =
    candidate.destination === "PARIS 1889" ||
    candidate.destination === "FLORENCE 1504" ||
    candidate.destination === "CRÉTACÉ -66M ANS" ||
    candidate.destination === "CRETACE -66M ANS"
  const destinationIdOk =
    candidate.destinationId === "paris-1889" ||
    candidate.destinationId === "florence" ||
    candidate.destinationId === "cretace"

  return (
    destinationOk &&
    destinationIdOk &&
    typeof candidate.title === "string" &&
    typeof candidate.explanation === "string" &&
    typeof candidate.catchphrase === "string" &&
    typeof candidate.matchScore === "number"
  )
}

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json()

    if (!answers || !Array.isArray(answers) || answers.length !== 4) {
      return NextResponse.json(
        { error: "Array of 4 answers required" },
        { status: 400 }
      )
    }

    const response = await client.chat.complete({
      model: "mistral-small-latest",
      maxTokens: 400,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: RECOMMENDATION_PROMPT(answers),
        },
      ],
    })

    const content = response.choices?.[0]?.message?.content
    const text =
      typeof content === "string"
        ? content
        : Array.isArray(content)
          ? content
              .filter((b): b is { type: "text"; text: string } => b.type === "text")
              .map((b) => b.text)
              .join("")
          : ""

    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim()
    const parsed = JSON.parse(cleaned)

    if (!isRecommendation(parsed)) {
      return NextResponse.json(FALLBACK_RECOMMENDATION)
    }

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Recommendation API error:", error)
    return NextResponse.json(FALLBACK_RECOMMENDATION)
  }
}
