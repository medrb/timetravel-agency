"use client"

import { motion } from "framer-motion"
import {
  TreePine,
  Leaf,
  Zap,
  Palette,
  Building,
  Landmark as BridgeIcon,
  TowerControl,
  Theater,
} from "lucide-react"
import type { DestinationData } from "@/lib/destinations-data"

interface DestinationHighlightsProps {
  destination: DestinationData
}

const iconMap: Record<string, React.ElementType> = {
  dinosaur: TreePine,
  leaf: Leaf,
  zap: Zap,
  palette: Palette,
  building: Building,
  bridge: BridgeIcon,
  tower: TowerControl,
  theater: Theater,
}

export function DestinationHighlights({ destination }: DestinationHighlightsProps) {
  return (
    <section className="relative py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Expériences uniques
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground">
            Points forts du voyage
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {destination.highlights.map((highlight, index) => {
            const Icon = iconMap[highlight.icon] || Zap

            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-border/50 bg-card/50 glass-effect p-8 hover:border-primary/40 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-primary/10 mb-4`}>
                  <Icon className={`h-6 w-6 ${destination.accentColor}`} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
