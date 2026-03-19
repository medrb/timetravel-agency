"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, MapPin, Calendar, Sparkles, CheckCircle2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const steps = [
  { id: 1, label: "Destination", icon: MapPin },
  { id: 2, label: "Date", icon: Calendar },
  { id: 3, label: "Extras", icon: Sparkles },
  { id: 4, label: "Confirmation", icon: CheckCircle2 },
]

const destinations = [
  { value: "florence", label: "Florence 1504", era: "Renaissance" },
  { value: "paris", label: "Paris 1889", era: "Belle Époque" },
  { value: "cretace", label: "Crétacé -66M", era: "Préhistoire" },
]

const dates = [
  "15 Mars 2024",
  "22 Mars 2024",
  "29 Mars 2024",
  "5 Avril 2024",
  "12 Avril 2024",
  "19 Avril 2024",
]

/**
 * @component Booking
 * @description Renders the homepage booking wizard with four steps, pricing summary, and reservation anchor.
 * @state currentStep, selectedDestination, selectedDate, passengers, travelClass
 * @sideeffects Uses useInView to animate section reveal on scroll.
 * @example
 * <Booking />
 */
export function Booking() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDestination, setSelectedDestination] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [passengers, setPassengers] = useState(2)
  const [travelClass, setTravelClass] = useState("premiere")

  return (
    <section
      id="reservation"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Réservation
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Réservez votre{" "}
            <span className="text-gold-gradient">Billet</span>
          </h2>
        </motion.div>

        {/* Progress steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-between items-center mb-12 relative"
        >
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border/50">
            <motion.div
              className="h-full gold-gradient"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center cursor-pointer"
              onClick={() => setCurrentStep(step.id)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step.id <= currentStep
                    ? "gold-gradient text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  step.id <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Booking form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-6 md:p-8"
        >
          {/* Step 1: Destination */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-foreground mb-3 block text-lg font-medium">
                  Choisir votre époque
                </Label>
                <Select
                  value={selectedDestination}
                  onValueChange={setSelectedDestination}
                >
                  <SelectTrigger className="w-full bg-secondary/50 border-border/50 h-14 text-lg">
                    <SelectValue placeholder="Sélectionnez une destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest.value} value={dest.value}>
                        <span className="font-medium">{dest.label}</span>
                        <span className="text-muted-foreground ml-2">
                          — {dest.era}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {/* Step 2: Date */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-foreground mb-3 block text-lg font-medium">
                  Choisir votre date de départ
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-4 rounded-xl border transition-all ${
                        selectedDate === date
                          ? "border-primary gold-gradient text-primary-foreground"
                          : "border-border/50 bg-secondary/30 text-foreground hover:border-primary/40"
                      }`}
                    >
                      <span className="text-sm font-medium">{date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-foreground mb-3 block text-lg font-medium">
                  Nombre de voyageurs
                </Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="h-12 w-12 border-border/50 hover:border-primary"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-serif font-bold text-primary w-12 text-center">
                    {passengers}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPassengers(Math.min(8, passengers + 1))}
                    className="h-12 w-12 border-border/50 hover:border-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Extras */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-foreground mb-4 block text-lg font-medium">
                  Classe de voyage
                </Label>
                <RadioGroup
                  value={travelClass}
                  onValueChange={setTravelClass}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem
                      value="premiere"
                      id="premiere"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="premiere"
                      className="flex flex-col p-5 rounded-xl border border-border/50 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/40"
                    >
                      <span className="font-serif text-xl font-semibold text-foreground mb-1">
                        Première Classe
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Cabine privée, champagne, service personnalisé
                      </span>
                      <span className="mt-3 text-primary font-bold">
                        2 500 €<span className="text-muted-foreground font-normal text-sm">/personne</span>
                      </span>
                    </Label>
                  </div>

                  <div className="relative">
                    <RadioGroupItem
                      value="decouverte"
                      id="decouverte"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="decouverte"
                      className="flex flex-col p-5 rounded-xl border border-border/50 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/40"
                    >
                      <span className="font-serif text-xl font-semibold text-foreground mb-1">
                        Classe Découverte
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Wagon partagé, confort optimal, collations incluses
                      </span>
                      <span className="mt-3 text-primary font-bold">
                        1 200 €<span className="text-muted-foreground font-normal text-sm">/personne</span>
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Récapitulatif de votre voyage
                </h3>
                <p className="text-muted-foreground">
                  Vérifiez les détails avant de confirmer
                </p>
              </div>

              <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="text-foreground font-medium">
                    {destinations.find((d) => d.value === selectedDestination)?.label || "Non sélectionnée"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground font-medium">
                    {selectedDate || "Non sélectionnée"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voyageurs</span>
                  <span className="text-foreground font-medium">
                    {passengers} personne{passengers > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Classe</span>
                  <span className="text-foreground font-medium">
                    {travelClass === "premiere" ? "Première Classe" : "Classe Découverte"}
                  </span>
                </div>
                <div className="border-t border-border/50 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-foreground font-semibold">Total</span>
                    <span className="text-primary font-bold text-xl">
                      {(travelClass === "premiere" ? 2500 : 1200) * passengers} €
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 h-14 border-border/50 hover:border-primary"
              >
                Retour
              </Button>
            )}
            <Button
              onClick={() => {
                if (currentStep < 4) {
                  setCurrentStep(currentStep + 1)
                }
              }}
              className="flex-1 h-14 gold-gradient text-primary-foreground font-medium text-lg hover:opacity-90"
            >
              {currentStep === 4 ? (
                <>
                  Émettre mon billet 🚂
                </>
              ) : (
                "Continuer"
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
