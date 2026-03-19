"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const eras = [
  { name: "Paris 1889", silhouette: "eiffel" },
  { name: "Crétacé", silhouette: "dino" },
  { name: "Florence 1504", silhouette: "florence" },
]

interface Particle {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  duration: number
  delay: number
}

interface Flame {
  id: number
  p1: number
  p2: number
  p3: number
}

function EiffelSilhouette() {
  return (
    <svg viewBox="0 0 200 300" className="h-full w-auto opacity-40">
      <path
        d="M100 10 L95 50 L70 120 L50 200 L30 290 L40 290 L55 200 L75 120 L90 50 L95 30 L105 30 L110 50 L125 120 L145 200 L160 290 L170 290 L150 200 L130 120 L105 50 L100 10Z"
        fill="currentColor"
      />
      <line x1="60" y1="150" x2="140" y2="150" stroke="currentColor" strokeWidth="3" />
      <line x1="45" y1="220" x2="155" y2="220" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

function DinoSilhouette() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-auto opacity-40">
      <path
        d="M20 180 Q30 160 50 150 Q60 140 80 145 L120 140 Q150 130 180 120 Q200 115 220 110 L240 100 Q250 95 255 85 Q260 90 265 95 Q268 85 272 80 Q275 90 280 100 L285 110 Q290 130 280 150 Q270 170 250 180 L230 185 Q200 180 180 175 Q150 180 120 185 L80 182 Q50 185 30 182 L20 180Z"
        fill="currentColor"
      />
      <circle cx="265" cy="92" r="3" fill="currentColor" />
    </svg>
  )
}

function FlorenceSilhouette() {
  return (
    <svg viewBox="0 0 300 250" className="h-full w-auto opacity-40">
      <rect x="110" y="100" width="80" height="140" fill="currentColor" />
      <path d="M150 20 Q180 40 180 80 Q180 100 150 100 Q120 100 120 80 Q120 40 150 20Z" fill="currentColor" />
      <rect x="130" y="80" width="40" height="20" fill="currentColor" />
      <rect x="40" y="150" width="50" height="90" fill="currentColor" />
      <rect x="210" y="150" width="50" height="90" fill="currentColor" />
      <rect x="45" y="120" width="40" height="30" fill="currentColor" />
      <rect x="215" y="120" width="40" height="30" fill="currentColor" />
    </svg>
  )
}

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 3,
      }))
    )
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${particle.x}%`, `${particle.targetX}%`],
            y: [`${particle.y}%`, `${particle.targetY}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

function FlameLandscape() {
  const [flames, setFlames] = useState<Flame[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setFlames(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        p1: Math.random() * 30,
        p2: 30 + Math.random() * 40,
        p3: 70 + Math.random() * 30,
      }))
    )
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="animate-parallax flex w-[200%]">
      {flames.map((flame) => (
        <div
          key={flame.id}
          className="w-20 h-20 bg-gradient-to-t from-primary/10 to-transparent"
          style={{
            clipPath: `polygon(${flame.p1}% 100%, 50% ${flame.p2}%, ${flame.p3}% 100%)`,
          }}
        />
      ))}
    </div>
  )
}

/**
 * @component Hero
 * @description Homepage hero with animated temporal silhouettes, particles, and CTA scrolling to destinations.
 * @state currentEra plus internal animated particle/flame states in child render helpers
 * @sideeffects Rotates displayed era on an interval and performs smooth scrolling to #destinations.
 * @example
 * <Hero />
 */
export function Hero() {
  const [currentEra, setCurrentEra] = useState(0)

  const handleChooseEra = () => {
    const section = document.getElementById("destinations")
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEra((prev) => (prev + 1) % eras.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />

      {/* Particle effects */}
      <ParticleField />

      {/* Train window frame */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Curtain decorations */}
        <div className="absolute -left-8 lg:-left-16 top-0 bottom-0 w-16 lg:w-24">
          <div className="h-full w-full bg-gradient-to-r from-primary/10 to-transparent rounded-l-3xl" />
        </div>
        <div className="absolute -right-8 lg:-right-16 top-0 bottom-0 w-16 lg:w-24">
          <div className="h-full w-full bg-gradient-to-l from-primary/10 to-transparent rounded-r-3xl" />
        </div>

        {/* Window frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative rounded-[3rem] border-4 border-primary/60 p-2 bg-secondary/30 glass-effect"
        >
          {/* Inner window */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-secondary via-navy-dark to-background aspect-[4/3] lg:aspect-[16/9]">
            {/* Parallax landscape container */}
            <div className="absolute inset-0 flex items-end justify-center pb-10">
              <motion.div
                key={currentEra}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1 }}
                className="h-48 lg:h-64 text-primary/40"
              >
                {eras[currentEra].silhouette === "eiffel" && <EiffelSilhouette />}
                {eras[currentEra].silhouette === "dino" && <DinoSilhouette />}
                {eras[currentEra].silhouette === "florence" && <FlorenceSilhouette />}
              </motion.div>
            </div>

            {/* Moving landscape effect */}
            <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
              <FlameLandscape />
            </div>

            {/* Hero content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4"
              >
                Bienvenue à bord
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-6 text-balance"
              >
                Voyagez à travers
                <br />
                <span className="text-gold-gradient">les Époques</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-foreground/70 text-lg md:text-xl mb-8"
              >
                Paris 1889 · Crétacé · Florence 1504
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  onClick={handleChooseEra}
                  size="lg"
                  className="gold-gradient text-primary-foreground font-medium px-8 py-6 rounded-full hover:opacity-90 transition-all group text-lg"
                  style={{ cursor: "pointer" }}
                >
                  Choisir mon époque
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>

            {/* Window shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Window frame decorations */}
          <div className="absolute top-1/2 -left-3 w-6 h-12 bg-primary/40 rounded-full transform -translate-y-1/2" />
          <div className="absolute top-1/2 -right-3 w-6 h-12 bg-primary/40 rounded-full transform -translate-y-1/2" />
        </motion.div>

        {/* Era indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          {eras.map((era, index) => (
            <button
              key={era.name}
              onClick={() => setCurrentEra(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentEra
                  ? "bg-primary w-8"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Voir ${era.name}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/40 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-primary/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
