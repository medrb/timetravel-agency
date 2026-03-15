"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import type { DestinationData } from "@/lib/destinations-data"

const blurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCgwMDQ4PEAwODxMODAwQEhQRFRYXFxcOERkbGRYaFBb/2wBDAQMEBAUEBQkFBQkWDQsNFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAcI/8QAIRAAAgEEAgIDAAAAAAAAAAAAAQIDAAQFEQYhEjEHQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8AuPIOZcfxOGa8yN7Db2iKWZpWCqoA2ST/AH0KxPyD8kcV5JzC/wAfhbuO8tbeUxieJtyMB7BPrZPYOiCKKUoQoYTqyVF5If/Z"

interface DestinationHeroProps {
  destination: DestinationData
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src={destination.heroImage}
          alt={destination.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-24 left-0 right-0 z-10"
      >
        <div className="container mx-auto px-4">
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-foreground/70">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <span className="opacity-50">/</span>
            <Link href="/#destinations" className="hover:text-primary transition-colors">
              Destinations
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-primary">{destination.title}</span>
          </nav>
        </div>
      </motion.div>

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge
            variant="secondary"
            className="bg-background/20 backdrop-blur-sm border-primary/30 text-foreground mb-6 px-4 py-2"
          >
            <span className={`text-sm font-medium ${destination.accentColor}`}>
              {destination.badge}
            </span>
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance"
        >
          {destination.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl text-pretty"
        >
          {destination.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/#booking">
            <Button
              size="lg"
              className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity px-8"
            >
              Réserver ce voyage
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/#destinations">
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/30 text-foreground hover:bg-foreground/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux destinations
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
