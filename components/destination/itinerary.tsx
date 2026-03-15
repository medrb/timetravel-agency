"use client"

import { motion } from "framer-motion"
import type { DestinationData } from "@/lib/destinations-data"

interface DestinationItineraryProps {
  destination: DestinationData
}

export function DestinationItinerary({ destination }: DestinationItineraryProps) {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Votre aventure
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground">
            Programme du voyage
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />

            {/* Timeline items */}
            <div className="space-y-6">
              {destination.itinerary.map((step, index) => (
                <motion.div
                  key={step.day}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  {/* Dot */}
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                  {/* Content */}
                  <div className="rounded-xl border border-border/50 bg-card/50 glass-effect p-5">
                    <span className={`text-sm font-medium ${destination.accentColor}`}>
                      {step.day}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-foreground mt-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
