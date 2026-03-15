"use client"

import { motion } from "framer-motion"
import { Globe, Thermometer, Briefcase, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { DestinationData } from "@/lib/destinations-data"

interface DestinationDescriptionProps {
  destination: DestinationData
}

const securityColors = {
  LOW: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  MODERATE: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  MAXIMUM: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function DestinationDescription({ destination }: DestinationDescriptionProps) {
  const { infoPractique } = destination

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left column - Description (60%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
              À propos de ce voyage
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {destination.description}
            </p>
          </motion.div>

          {/* Right column - Info pratique (40%) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-border/50 bg-card/50 glass-effect p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                Informations pratiques
              </h3>

              <div className="space-y-5">
                {/* Language */}
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Langue parlée</p>
                    <p className="text-foreground">{infoPractique.language}</p>
                  </div>
                </div>

                {/* Climate */}
                <div className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Climat</p>
                    <p className="text-foreground">{infoPractique.climate}</p>
                  </div>
                </div>

                {/* Equipment */}
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Équipement fourni
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {infoPractique.equipment.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="bg-secondary/50 text-foreground/70 border-border/30 text-xs"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Niveau de sécurité
                    </p>
                    <Badge
                      variant="outline"
                      className={securityColors[infoPractique.securityLevel]}
                    >
                      {infoPractique.security}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
