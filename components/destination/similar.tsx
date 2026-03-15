"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import type { DestinationData } from "@/lib/destinations-data"

interface DestinationSimilarProps {
  destinations: DestinationData[]
  currentSlug: string
}

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

function MiniDestinationCard({ destination }: { destination: DestinationData }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/destinations/${destination.slug}`}>
        <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/50 glass-effect hover:border-primary/40 transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            {!imageError ? (
              <Image
                src={destination.heroImage}
                alt={destination.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurDataURL}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${destination.gradient}`} />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, hsl(var(--card)) 100%)",
              }}
            />
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm border-border/50"
            >
              <span className={`text-xs font-medium ${destination.accentColor}`}>
                {destination.badge}
              </span>
            </Badge>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
              {destination.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <DifficultyStars level={destination.stats.riskStars} />
              <span className="text-xs text-muted-foreground">
                {destination.stats.risk}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-between ${destination.accentColor} hover:bg-primary/10 group/btn`}
            >
              Découvrir
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function DestinationSimilar({
  destinations,
  currentSlug,
}: DestinationSimilarProps) {
  return (
    <section className="relative py-16 lg:py-24 bg-secondary/20 border-t border-border/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Continuez l'aventure
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground">
            Destinations similaires
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {destinations.map((destination) => (
            <MiniDestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  )
}
