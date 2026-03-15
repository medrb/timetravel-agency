"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const thumbnails = [
  {
    src: "https://i.imgur.com/EHlHB64.jpeg",
    alt: "Crétacé",
    href: "#destinations",
  },
  {
    src: "https://i.imgur.com/mPaSqkc.jpeg",
    alt: "Florence",
    href: "#destinations",
  },
  {
    src: "https://i.imgur.com/Wjo85QD.jpeg",
    alt: "Paris 1889",
    href: "#destinations",
  },
]

const blurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCgwMDQ4PEAwODxMODAwQEhQRFRYXFxcOERkbGRYaFBb/2wBDAQMEBAUEBQkFBQkWDQsNFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAcI/8QAIRAAAgEEAgIDAAAAAAAAAAAAAQIDAAQFEQYhEjEHQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8AuPIOZcfxOGa8yN7Db2iKWZpWCqoA2ST/AH0KxPyD8kcV5JzC/wAfhbuO8tbeUxieJtyMB7BPrZPYOiCKKUoQoYTqyVF5If/Z"

export function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const scrollToDestinations = () => {
    const element = document.getElementById("destinations")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-gold-gradient">Avant-première</span> de vos voyages
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Découvrez en images ce qui vous attend à bord
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[900px] mx-auto mb-8"
        >
          <video
            src="https://i.imgur.com/eTc6k4G.mp4"
            poster="https://i.imgur.com/Wjo85QD.jpeg"
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full rounded-xl border border-primary/20"
          />
        </motion.div>

        {/* Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          {thumbnails.map((thumb, index) => (
            <button
              key={thumb.alt}
              onClick={scrollToDestinations}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative aspect-video w-[200px] md:w-[280px] rounded-lg overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{
                transform: hoveredIndex === index ? "scale(1.03)" : "scale(1)",
                border: hoveredIndex === index ? "2px solid hsl(var(--primary))" : "2px solid transparent",
              }}
            >
              <Image
                src={thumb.src}
                alt={thumb.alt}
                fill
                sizes="(max-width: 768px) 200px, 280px"
                className="object-cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
              {/* Overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-foreground text-sm font-medium">{thumb.alt}</span>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
