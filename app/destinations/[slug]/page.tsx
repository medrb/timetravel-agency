import { notFound } from "next/navigation"
import { getDestination, getOtherDestinations, destinationsData } from "@/lib/destinations-data"
import { DestinationHero } from "@/components/destination/hero"
import { DestinationStats } from "@/components/destination/stats"
import { DestinationDescription } from "@/components/destination/description"
import { DestinationHighlights } from "@/components/destination/highlights"
import { DestinationItinerary } from "@/components/destination/itinerary"
import { DestinationCTA } from "@/components/destination/cta"
import { DestinationSimilar } from "@/components/destination/similar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export async function generateStaticParams() {
  return Object.keys(destinationsData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = getDestination(slug)
  
  if (!destination) {
    return {
      title: "Destination non trouvée | TimeTravel Agency",
    }
  }

  return {
    title: `${destination.title} | TimeTravel Agency`,
    description: destination.tagline,
  }
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = getDestination(slug)

  if (!destination) {
    notFound()
  }

  const otherDestinations = getOtherDestinations(slug)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <DestinationHero destination={destination} />
      <DestinationStats destination={destination} />
      <DestinationDescription destination={destination} />
      <DestinationHighlights destination={destination} />
      <DestinationItinerary destination={destination} />
      <DestinationCTA destination={destination} />
      <DestinationSimilar destinations={otherDestinations} currentSlug={slug} />
      <Footer />
    </main>
  )
}
