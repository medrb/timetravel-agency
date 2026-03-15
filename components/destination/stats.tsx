"use client"

import { motion } from "framer-motion"
import { Clock, AlertTriangle, Calendar, Users, Star } from "lucide-react"
import type { DestinationData } from "@/lib/destinations-data"

interface DestinationStatsProps {
  destination: DestinationData
}

function RiskStars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= level
              ? "fill-primary text-primary"
              : "fill-transparent text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

const stats = [
  {
    key: "duration",
    label: "Durée du séjour",
    icon: Clock,
  },
  {
    key: "risk",
    label: "Niveau de risque",
    icon: AlertTriangle,
    hasStars: true,
  },
  {
    key: "era",
    label: "Époque",
    icon: Calendar,
  },
  {
    key: "seats",
    label: "Places disponibles",
    icon: Users,
  },
]

export function DestinationStats({ destination }: DestinationStatsProps) {
  return (
    <section className="relative py-8 bg-secondary/30 border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const value = destination.stats[stat.key as keyof typeof destination.stats]
            
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-4 md:p-6 rounded-xl bg-card/50 border border-border/30 text-center"
              >
                <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="flex flex-col items-center gap-1">
                  {stat.hasStars ? (
                    <>
                      <RiskStars level={destination.stats.riskStars} />
                      <span className="text-lg md:text-xl font-semibold text-primary">
                        {value}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg md:text-xl font-semibold text-primary">
                      {value}
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
