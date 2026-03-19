"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Train, ArrowRight, RotateCcw, Loader2 } from "lucide-react"

const QUESTIONS = [
  {
    id: 1,
    icon: "🎫",
    question: "Quel type de voyageur êtes-vous, camarade ?",
    subtitle: "Chaque passager a son wagon. Quel est le vôtre ?",
    options: [
      {
        label: "Explorateur culturel",
        description: "Art, histoire, patrimoine",
        icon: "🎨",
        value: "Culturelle et artistique",
      },
      {
        label: "Aventurier de l'extrême",
        description: "Nature, sensations, survie",
        icon: "🌿",
        value: "Aventure et nature",
      },
      {
        label: "Âme élégante",
        description: "Raffinement, mondanités, prestige",
        icon: "🥂",
        value: "Élégance et raffinement",
      },
    ],
  },
  {
    id: 2,
    icon: "🕰️",
    question: "Le train s'arrête à quelle ère vous fait battre le cœur ?",
    subtitle: "Les aiguilles du temps n'attendent pas — choisissez votre quai.",
    options: [
      {
        label: "L'ère moderne",
        description: "XIXe siècle, révolution industrielle",
        icon: "🗼",
        value: "Histoire moderne XIXe-XXe siècle",
      },
      {
        label: "Les origines du monde",
        description: "Avant l'humanité, nature primordiale",
        icon: "🦕",
        value: "Temps anciens et origines",
      },
      {
        label: "Le siècle des Maîtres",
        description: "Renaissance, art et architecture",
        icon: "🏛",
        value: "Renaissance et classicisme",
      },
    ],
  },
  {
    id: 3,
    icon: "🚃",
    question: "Regardez par le hublot. Quel paysage vous appelle ?",
    subtitle: "Le train traverse tous les décors — lequel vous hypnotise ?",
    options: [
      {
        label: "Les lumières de la ville",
        description: "Cafes, boulevards, vie nocturne",
        icon: "✨",
        value: "L'effervescence urbaine",
      },
      {
        label: "La jungle sauvage",
        description: "Forêts denses, créatures imposantes",
        icon: "🌴",
        value: "La nature sauvage",
      },
      {
        label: "Les palais et cathédrales",
        description: "Fresques, coupoles, chefs-d'œuvre",
        icon: "🎭",
        value: "L'art et l'architecture",
      },
    ],
  },
  {
    id: 4,
    icon: "⌚",
    question: "Une fois à destination, que fait votre âme ?",
    subtitle: "Votre dernière réponse déterminera votre destinée temporelle.",
    options: [
      {
        label: "Flâner et s'immerger",
        description: "Monuments, musées, expositions",
        icon: "🏛",
        value: "Visiter des monuments et musees",
      },
      {
        label: "Observer et s'émerveiller",
        description: "Faune, paysages, phénomènes naturels",
        icon: "🦎",
        value: "Observer la faune et la nature",
      },
      {
        label: "Créer et s'inspirer",
        description: "Ateliers, rencontres, créations",
        icon: "🎨",
        value: "Explorer l'art et les ateliers",
      },
    ],
  },
]

const DESTINATION_IMAGES: Record<string, string> = {
  "paris-1889": "https://i.imgur.com/Wjo85QD.jpeg",
  florence: "https://i.imgur.com/mPaSqkc.jpeg",
  cretace: "https://i.imgur.com/EHlHB64.jpeg",
}

const DESTINATION_COLORS: Record<string, string> = {
  "paris-1889": "rgba(201, 168, 76, 0.15)",
  florence: "rgba(201, 130, 76, 0.15)",
  cretace: "rgba(76, 168, 76, 0.15)",
}

interface Recommendation {
  destination: string
  destinationId: string
  title: string
  explanation: string
  catchphrase: string
  matchScore: number
}

const FALLBACK_RECOMMENDATION: Recommendation = {
  destination: "PARIS 1889",
  destinationId: "paris-1889",
  title: "La Belle Époque vous attend",
  explanation: "Votre profil de voyageur correspond à la magie de Paris 1889.",
  catchphrase: "Le quai 9 vous attend, voyageur.",
  matchScore: 92,
}

const isRecommendation = (value: unknown): value is Recommendation => {
  if (!value || typeof value !== "object") {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.destination === "string" &&
    typeof candidate.destinationId === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.explanation === "string" &&
    typeof candidate.catchphrase === "string" &&
    typeof candidate.matchScore === "number"
  )
}

/**
 * @component DestinationQuiz
 * @description Runs a four-question personality quiz, calls /api/recommend, and renders a personalized destination result.
 * @state currentQuestion, answers, selectedOption, isLoading, recommendation, isStarted
 * @sideeffects Performs network requests to recommendation API and manages staged animated quiz transitions.
 * @example
 * <DestinationQuiz />
 */
export function DestinationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [isStarted, setIsStarted] = useState(false)

  const progress = (currentQuestion / QUESTIONS.length) * 100
  const question = QUESTIONS[currentQuestion]

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value)
  }

  const handleNext = async () => {
    if (!selectedOption) return

    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsLoading(true)
      try {
        const response = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers }),
        })

        const data = await response.json()
        if (isRecommendation(data)) {
          setRecommendation(data)
        } else {
          setRecommendation(FALLBACK_RECOMMENDATION)
        }
      } catch (error) {
        console.error("Recommendation error:", error)
        setRecommendation(FALLBACK_RECOMMENDATION)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(null)
    setRecommendation(null)
    setIsStarted(false)
  }

  if (!isStarted) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎫</div>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: 500,
            color: "#c9a84c",
            marginBottom: "12px",
            fontFamily: "serif",
          }}
        >
          Le Questionnaire du Contrôleur
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "15px",
            marginBottom: "32px",
            maxWidth: "400px",
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          4 questions. L'algorithme temporel analysera votre âme et vous
          assignera votre époque de prédilection.
        </p>
        <motion.button
          onClick={() => setIsStarted(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "linear-gradient(135deg, #c9a84c, #a07830)",
            color: "#0a0a0f",
            border: "none",
            borderRadius: "40px",
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Train size={18} />
          Monter à bord du questionnaire
        </motion.button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ fontSize: "48px" }}>🕰️</div>
        <Loader2
          size={32}
          color="#c9a84c"
          style={{ animation: "spin 1s linear infinite" }}
        />
        <p style={{ color: "#c9a84c", fontSize: "16px", fontFamily: "serif" }}>
          Le Contrôleur Temporel analyse votre destinée...
        </p>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
          Consultation des archives temporelles en cours
        </p>
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      </div>
    )
  }

  if (recommendation) {
    const imageSrc =
      DESTINATION_IMAGES[recommendation.destinationId] ??
      DESTINATION_IMAGES[FALLBACK_RECOMMENDATION.destinationId]
    const bgColor =
      DESTINATION_COLORS[recommendation.destinationId] ??
      DESTINATION_COLORS[FALLBACK_RECOMMENDATION.destinationId]

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "560px", margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span
              style={{
                background: "rgba(201,168,76,0.15)",
                border: "1px solid rgba(201,168,76,0.4)",
                borderRadius: "40px",
                padding: "6px 18px",
                fontSize: "13px",
                color: "#c9a84c",
              }}
            >
              ✦ Compatibilité temporelle : {recommendation.matchScore}%
            </span>
          </div>

          <div
            style={{
              background: bgColor,
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "200px",
                overflow: "hidden",
              }}
            >
              <img
                src={imageSrc}
                alt={recommendation.destination}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 30%, #0f0f1a 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "20px",
                }}
              >
                <span
                  style={{
                    background: "rgba(201,168,76,0.9)",
                    color: "#0a0a0f",
                    borderRadius: "20px",
                    padding: "4px 14px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  {recommendation.destination}
                </span>
              </div>
            </div>

            <div style={{ padding: "24px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#c9a84c",
                  marginBottom: "12px",
                  fontFamily: "serif",
                  lineHeight: 1.3,
                }}
              >
                {recommendation.title}
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  marginBottom: "16px",
                }}
              >
                {recommendation.explanation}
              </p>

              <p
                style={{
                  color: "#c9a84c",
                  fontSize: "13px",
                  fontStyle: "italic",
                  fontFamily: "serif",
                  borderLeft: "2px solid rgba(201,168,76,0.4)",
                  paddingLeft: "12px",
                  marginBottom: "24px",
                }}
              >
                "{recommendation.catchphrase}"
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href={`/destinations/${recommendation.destinationId}`}
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #c9a84c, #a07830)",
                    color: "#0a0a0f",
                    borderRadius: "40px",
                    padding: "12px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  Découvrir ce wagon
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/reservation"
                  style={{
                    flex: 1,
                    background: "transparent",
                    color: "#c9a84c",
                    border: "1px solid rgba(201,168,76,0.4)",
                    borderRadius: "40px",
                    padding: "12px 20px",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  Réserver maintenant
                </Link>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handleReset}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.35)",
                fontSize: "13px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <RotateCcw size={12} />
              Recommencer le questionnaire
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
            Question {currentQuestion + 1} sur {QUESTIONS.length}
          </span>
          <span style={{ fontSize: "12px", color: "#c9a84c" }}>
            {Math.round(progress)}% complété
          </span>
        </div>
        <div
          style={{
            height: "3px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #c9a84c, #a07830)",
              borderRadius: "2px",
            }}
            initial={{ width: `${(currentQuestion / QUESTIONS.length) * 100}%` }}
            animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
        >
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>
              {question.icon}
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: "#e8e8e8",
                fontFamily: "serif",
                marginBottom: "8px",
                lineHeight: 1.3,
              }}
            >
              {question.question}
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.4)",
                fontStyle: "italic",
              }}
            >
              {question.subtitle}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            {question.options.map((option) => {
              const isSelected = selectedOption === option.value
              return (
                <motion.button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: isSelected
                      ? "rgba(201,168,76,0.15)"
                      : "rgba(255,255,255,0.03)",
                    border: isSelected
                      ? "1px solid rgba(201,168,76,0.7)"
                      : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    textAlign: "left",
                    transition: "background 0.2s, border 0.2s",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: "24px", flexShrink: 0 }}>
                    {option.icon}
                  </span>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: 500,
                        color: isSelected ? "#c9a84c" : "#e8e8e8",
                        marginBottom: "2px",
                      }}
                    >
                      {option.label}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {option.description}
                    </p>
                  </div>
                  {isSelected && (
                    <span
                      style={{
                        marginLeft: "auto",
                        color: "#c9a84c",
                        fontSize: "18px",
                      }}
                    >
                      ✦
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>

          <motion.button
            onClick={handleNext}
            disabled={!selectedOption}
            whileHover={selectedOption ? { scale: 1.03 } : {}}
            whileTap={selectedOption ? { scale: 0.97 } : {}}
            style={{
              width: "100%",
              background: selectedOption
                ? "linear-gradient(135deg, #c9a84c, #a07830)"
                : "rgba(255,255,255,0.05)",
              color: selectedOption ? "#0a0a0f" : "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "40px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: selectedOption ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {currentQuestion === QUESTIONS.length - 1
              ? "✦ Révéler ma destinée"
              : "Question suivante"}
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
