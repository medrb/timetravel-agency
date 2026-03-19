import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Destinations } from "@/components/destinations"
import { DestinationQuiz } from "@/components/destination-quiz"
import { Gallery } from "@/components/gallery"
import { TemporalChat } from "@/components/temporal-chat"
import { Booking } from "@/components/booking"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Destinations />
      <section
        id="quiz"
        style={{
          padding: "80px 20px",
          background:
            "linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)",
          scrollMarginTop: "80px",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "40px",
                padding: "6px 16px",
                fontSize: "12px",
                color: "#c9a84c",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Algorithme temporel — Propulsé par Mistral AI
            </span>

            <h2
              style={{
                fontSize: "36px",
                fontWeight: 500,
                color: "#e8e8e8",
                fontFamily: "serif",
                margin: "16px 0 12px",
              }}
            >
              Quel voyageur temporel êtes-vous ?
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "16px",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Le Contrôleur Temporel analyse votre profil et vous assigne la
              destination qui correspond à votre âme de voyageur.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: "20px",
              padding: "40px",
            }}
          >
            <DestinationQuiz />
          </div>
        </div>
      </section>
      <Gallery />
      <TemporalChat />
      <Booking />
      <Footer />
    </main>
  )
}
