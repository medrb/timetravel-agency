import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Destinations } from "@/components/destinations"
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
      <Gallery />
      <TemporalChat />
      <Booking />
      <Footer />
    </main>
  )
}
