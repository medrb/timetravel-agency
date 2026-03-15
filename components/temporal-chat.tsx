"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Briefcase, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Shield,
    title: "Sécurité Garantie",
    description:
      "Nos protocoles temporels assurent votre retour en toute sécurité",
  },
  {
    icon: Users,
    title: "Guides Locaux",
    description:
      "Des experts de chaque époque vous accompagnent dans votre voyage",
  },
  {
    icon: Briefcase,
    title: "Équipement Fourni",
    description:
      "Vêtements d'époque et accessoires adaptés inclus dans votre voyage",
  },
]

export function TemporalChat() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="le-train"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Assistance
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Votre{" "}
            <span className="text-gold-gradient">Conseiller Temporel</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* CTA panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between gap-8 rounded-2xl border border-border/50 bg-card/60 p-8 glass-effect"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl">
                  🎩
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Contrôleur Temporel</h3>
                  <p className="text-xs text-muted-foreground">Assistant IA en ligne</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-foreground">
                  Notre Contrôleur Temporel répond à toutes vos questions sur Paris 1889,
                  Florence 1504 et le Crétacé avec le même raffinement qu'un chef de train privé.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cliquez sur le bouton en bas à droite pour démarrer la conversation,
                  obtenir une recommandation ou vérifier les conditions de votre prochain départ.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
                className="gold-gradient text-primary-foreground rounded-full px-6 py-6 text-sm font-medium"
              >
                🎩
                Démarrer la conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Le widget est disponible sur toutes les pages du site, y compris la réservation.
              </p>
            </div>
          </motion.div>

          {/* Features panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              Pourquoi nous choisir
            </h3>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="group p-5 rounded-xl bg-card/40 glass-effect border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
