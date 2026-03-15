"use client"

import { motion } from "framer-motion"
import { PageWrapper } from "@/components/page-wrapper"
import { Gauge, Users, Train, Eye, Utensils, Cog } from "lucide-react"

const specs = [
  { icon: Train, label: "Longueur", value: "12 wagons" },
  { icon: Gauge, label: "Vitesse", value: "299 792 km/s" },
  { icon: Users, label: "Capacité", value: "48 voyageurs" },
]

const wagons = [
  {
    icon: Eye,
    name: "Wagon Panoramique",
    description: "Des baies vitrées à 360° pour observer le passage entre les époques. Un spectacle hypnotique de lumières et de couleurs.",
    capacity: "8 places",
    class: "Première Classe",
  },
  {
    icon: Utensils,
    name: "Wagon Restaurant",
    description: "Cuisine gastronomique inspirée des époques visitées. Notre chef reconstitue des recettes historiques authentiques.",
    capacity: "16 places",
    class: "Toutes classes",
  },
  {
    icon: Cog,
    name: "Wagon de Contrôle",
    description: "Le cœur technologique du train. Nos ingénieurs temporels surveillent chaque paramètre du voyage.",
    capacity: "Accès restreint",
    class: "Équipage uniquement",
  },
]

export default function TrainTemporelPage() {
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Le Train", href: "/#le-train" },
        { label: "Le Train Temporel" },
      ]}
    >
      <div className="container mx-auto px-4 pb-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Le Train <span className="text-gold-gradient">Temporel</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une merveille d{"'"}ingénierie conçue pour traverser les âges en toute sécurité et confort
          </p>
        </motion.div>

        {/* Technical Specs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
        >
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-6 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl gold-gradient flex items-center justify-center">
                <spec.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <p className="text-muted-foreground text-sm mb-1">{spec.label}</p>
              <p className="font-serif text-2xl font-bold text-foreground">{spec.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Train Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">
            Architecture du Train
          </h2>
          
          <div className="bg-card/40 glass-effect rounded-2xl border border-border/50 p-8 overflow-x-auto">
            <div className="flex items-end gap-2 min-w-max justify-center">
              {/* Locomotive */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-16 bg-primary/80 rounded-t-xl rounded-l-2xl relative">
                  <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-primary-foreground/80" />
                  <div className="absolute bottom-2 left-3 right-3 h-1 bg-primary-foreground/50 rounded" />
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="w-4 h-4 rounded-full bg-primary/60" />
                  <div className="w-4 h-4 rounded-full bg-primary/60" />
                  <div className="w-4 h-4 rounded-full bg-primary/60" />
                </div>
                <span className="text-xs text-muted-foreground mt-2">Locomotive</span>
              </div>
              
              {/* Wagons */}
              {["Contrôle", "Première", "Première", "Panoramique", "Restaurant", "Restaurant", "Découverte", "Découverte", "Découverte", "Découverte", "Bagages"].map((name, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-14 h-12 rounded-t ${
                    name === "Première" ? "bg-amber-700/70" :
                    name === "Panoramique" ? "bg-sky-700/70" :
                    name === "Restaurant" ? "bg-rose-700/70" :
                    name === "Contrôle" ? "bg-primary/70" :
                    name === "Bagages" ? "bg-slate-700/70" :
                    "bg-secondary"
                  }`}>
                    {name === "Panoramique" && (
                      <div className="w-full h-full border-2 border-white/20 rounded-t" />
                    )}
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary/40" />
                    <div className="w-3 h-3 rounded-full bg-primary/40" />
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-2 writing-mode-vertical">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Wagon Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
            Nos Wagons Signature
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {wagons.map((wagon, index) => (
              <motion.div
                key={wagon.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-6 hover:border-primary/40 transition-colors"
              >
                <div className="w-14 h-14 mb-4 rounded-xl gold-gradient flex items-center justify-center">
                  <wagon.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {wagon.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {wagon.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-secondary text-foreground/70">
                    {wagon.capacity}
                  </span>
                  <span className="px-2 py-1 rounded bg-primary/20 text-primary">
                    {wagon.class}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
