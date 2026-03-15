"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

const destinations = [
  {
    id: "cretace",
    slug: "cretace",
    era: "Crétacé · -66 000 000",
    title: "L'Ère des Titans",
    description:
      "Observez les derniers dinosaures dans leur habitat naturel depuis la sécurité du train",
    tags: ["Aventure", "Nature", "Danger"],
    difficulty: 3,
    difficultyLabel: "Extrême",
    image: "https://i.imgur.com/EHlHB64.jpeg",
    gradient: "from-emerald-950/50 to-green-950/40",
    accentColor: "text-emerald-400",
    fallbackGradient: "from-emerald-900 to-green-950",
    featured: false,
  },
  {
    id: "florence",
    slug: "florence",
    era: "Renaissance · 1504",
    title: "Florence, La Renaissance",
    description:
      "Côtoyez Léonard de Vinci et Michel-Ange au cœur de la Florence des Médicis",
    tags: ["Culture", "Art", "Aventure"],
    difficulty: 2,
    difficultyLabel: "Modéré",
    image: "https://i.imgur.com/mPaSqkc.jpeg",
    gradient: "from-amber-900/40 to-orange-950/40",
    accentColor: "text-amber-400",
    fallbackGradient: "from-amber-900 to-orange-950",
    featured: true,
    badge: "Le plus populaire",
  },
  {
    id: "paris",
    slug: "paris-1889",
    era: "Belle Époque · 1889",
    title: "Paris, Belle Époque",
    description:
      "Assistez à l'inauguration de la Tour Eiffel et découvrez le tout nouveau Moulin Rouge, ouvert cette même année 1889 au cœur de Montmartre",
    tags: ["Histoire", "Culture", "Romance", "Cabaret"],
    difficulty: 1,
    difficultyLabel: "Facile",
    image: "https://i.imgur.com/Wjo85QD.jpeg",
    gradient: "from-primary/30 to-amber-950/40",
    accentColor: "text-primary",
    fallbackGradient: "from-amber-800 to-amber-950",
    featured: false,
  },
]

const blurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCgwMDQ4PEAwODxMODAwQEhQRFRYXFxcOERkbGRYaFBb/2wBDAQMEBAUEBQkFBQkWDQsNFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAcI/8QAIRAAAgEEAgIDAAAAAAAAAAAAAQIDAAQFEQYhEjEHQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8AuPIOZcfxOGa8yN7Db2iKWZpWCqoA2ST/AH0KxPyD8kcV5JzC/wAfhbuO8tbeUxieJtyMB7BPrZPYOiCKKUoQoYTqyVF5If/Z"

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((star) => (
        <Star
          key={star}
          className={`h-3 w-3 ${
            star <= level
              ? "fill-primary text-primary"
              : "fill-transparent text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

function DestinationCard({
  destination,
  index,
}: {
  destination: (typeof destinations)[0]
  index: number
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className={`relative group flex-shrink-0 w-[320px] md:w-[360px] ${
        destination.featured ? "md:-mt-4" : ""
      }`}
    >
      {/* Featured badge */}
      {destination.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="gold-gradient text-primary-foreground border-0 px-4 py-1 text-xs font-medium">
            {destination.badge}
          </Badge>
        </div>
      )}

      {/* Card */}
      <div
        className={`relative h-full rounded-2xl overflow-hidden border ${
          destination.featured
            ? "border-primary/50 shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            : "border-border/50"
        } bg-card/80 glass-effect transition-all duration-500 group-hover:border-primary/40`}
      >
        {/* Image section - 55% of card */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {!imageError ? (
            <Image
              src={destination.image}
              alt={destination.title}
              fill
              sizes="(max-width: 768px) 320px, 360px"
              className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
              loading="lazy"
              placeholder="blur"
              blurDataURL={blurDataURL}
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${destination.fallbackGradient}`}
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" style={{ background: 'linear-gradient(to bottom, transparent 40%, hsl(var(--card)) 100%)' }} />
          
          {/* Era badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm border-border/50"
            >
              <span className={`text-xs font-medium tracking-wide ${destination.accentColor}`}>
                {destination.era}
              </span>
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 pt-2">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            {destination.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
            {destination.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {destination.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/50 text-foreground/70 border-border/30 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-2 mb-6">
            <DifficultyStars level={destination.difficulty} />
            <span className="text-xs text-muted-foreground">
              {destination.difficultyLabel}
            </span>
          </div>

          {/* CTA */}
          <Link href={`/destinations/${destination.slug}`}>
            <Button
              variant="ghost"
              className={`w-full justify-between ${destination.accentColor} hover:bg-primary/10 group/btn`}
            >
              Explorer ce wagon
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function Destinations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="destinations"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Nos Wagons
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choisissez votre{" "}
            <span className="text-gold-gradient">Wagon</span>
          </h2>
        </motion.div>

        {/* Timeline rail */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:block relative h-0.5 bg-primary/30 mx-auto max-w-2xl mb-12"
        >
          <div className="absolute top-1/2 left-0 w-3 h-3 rounded-full bg-primary -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-primary -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 right-0 w-3 h-3 rounded-full bg-primary -translate-y-1/2 translate-x-1/2" />
        </motion.div>

        {/* Cards container */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:overflow-visible md:justify-center md:flex-wrap lg:flex-nowrap scrollbar-hide">
          {destinations.map((destination, index) => (
            <div key={destination.id} className="snap-center">
              <DestinationCard destination={destination} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile pagination dots */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {destinations.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-primary/30"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
