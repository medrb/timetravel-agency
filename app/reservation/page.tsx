"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, MapPin, Calendar, Sparkles, CheckCircle2, Minus, Plus, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PageWrapper } from "@/components/page-wrapper"
import Image from "next/image"

const steps = [
  { id: 1, label: "Destination", icon: MapPin },
  { id: 2, label: "Date", icon: Calendar },
  { id: 3, label: "Extras", icon: Sparkles },
  { id: 4, label: "Confirmation", icon: CheckCircle2 },
]

const destinations = [
  {
    value: "cretace",
    label: "Crétacé -66M ans",
    era: "Préhistoire",
    image: "https://i.imgur.com/EHlHB64.jpeg",
    price: 3500,
  },
  {
    value: "florence",
    label: "Florence 1504",
    era: "Renaissance",
    image: "https://i.imgur.com/mPaSqkc.jpeg",
    price: 2500,
  },
  {
    value: "paris",
    label: "Paris 1889",
    era: "Belle Époque",
    image: "https://i.imgur.com/Wjo85QD.jpeg",
    price: 2000,
  },
]

const dates = [
  "15 Mars 2024",
  "22 Mars 2024",
  "29 Mars 2024",
  "5 Avril 2024",
  "12 Avril 2024",
  "19 Avril 2024",
]

const extras = [
  { id: "guide", label: "Guide interprète", price: 200 },
  { id: "survie", label: "Équipement survie", price: 150 },
  { id: "tenue", label: "Tenue d'époque", price: 100 },
  { id: "assurance", label: "Assurance temporelle", price: 250 },
]

export default function ReservationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDestination, setSelectedDestination] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [passengers, setPassengers] = useState(2)
  const [travelClass, setTravelClass] = useState("premiere")
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [ticketNumber, setTicketNumber] = useState("0000")

  useEffect(() => {
    setTicketNumber(Math.floor(Math.random() * 10000).toString().padStart(4, "0"))
  }, [])

  const destinationData = destinations.find((d) => d.value === selectedDestination)
  const basePrice = travelClass === "premiere" ? (destinationData?.price || 0) : Math.round((destinationData?.price || 0) * 0.6)
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const extra = extras.find((e) => e.id === id)
    return sum + (extra?.price || 0)
  }, 0)
  const totalPrice = (basePrice + extrasTotal) * passengers

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    )
  }

  return (
    <PageWrapper breadcrumbs={[{ label: "Réservation" }]}>
      <div className="container mx-auto px-4 pb-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Réservez votre <span className="text-gold-gradient">Voyage Temporel</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choisissez votre destination, votre date et personnalisez votre expérience
          </p>
        </motion.div>

        {/* Progress steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-between items-center mb-12 relative max-w-3xl mx-auto"
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
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
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
                  step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-6 md:p-8 max-w-4xl mx-auto"
        >
          {/* Step 1: Destination */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Choisissez votre destination
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {destinations.map((dest) => (
                  <button
                    key={dest.value}
                    onClick={() => setSelectedDestination(dest.value)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      selectedDestination === dest.value
                        ? "border-primary shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                        : "border-border/50 hover:border-primary/40"
                    }`}
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={dest.image}
                        alt={dest.label}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                      <p className="text-xs text-primary mb-1">{dest.era}</p>
                      <h3 className="font-serif text-lg font-semibold text-white">
                        {dest.label}
                      </h3>
                      <p className="text-white/80 text-sm mt-1">
                        À partir de {Math.round(dest.price * 0.6)} €
                      </p>
                    </div>
                    {selectedDestination === dest.value && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full gold-gradient flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Passengers */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Choisissez votre date de départ
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-4 rounded-xl border transition-all font-serif ${
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
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Nombre de voyageurs
                </h2>
                <div className="flex items-center gap-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="h-14 w-14 border-border/50 hover:border-primary text-xl"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="text-4xl font-serif font-bold text-primary w-16 text-center">
                    {passengers}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPassengers(Math.min(8, passengers + 1))}
                    className="h-14 w-14 border-border/50 hover:border-primary text-xl"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Classe de voyage
                </h2>
                <RadioGroup
                  value={travelClass}
                  onValueChange={setTravelClass}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem value="premiere" id="premiere" className="peer sr-only" />
                    <Label
                      htmlFor="premiere"
                      className="flex flex-col p-5 rounded-xl border border-border/50 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/40"
                    >
                      <span className="font-serif text-xl font-semibold text-foreground mb-1">
                        Première Classe Temporelle
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Cabine privée, champagne, service personnalisé
                      </span>
                      <span className="mt-3 text-primary font-bold">
                        {destinationData?.price || 0} €
                        <span className="text-muted-foreground font-normal text-sm">/personne</span>
                      </span>
                    </Label>
                  </div>

                  <div className="relative">
                    <RadioGroupItem value="decouverte" id="decouverte" className="peer sr-only" />
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
                        {Math.round((destinationData?.price || 0) * 0.6)} €
                        <span className="text-muted-foreground font-normal text-sm">/personne</span>
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
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
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Options supplémentaires
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {extras.map((extra) => (
                  <div
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedExtras.includes(extra.id)
                        ? "border-primary bg-primary/5"
                        : "border-border/50 hover:border-primary/40"
                    }`}
                  >
                    <Checkbox
                      id={extra.id}
                      checked={selectedExtras.includes(extra.id)}
                      onCheckedChange={() => toggleExtra(extra.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="flex-1">
                      <Label htmlFor={extra.id} className="text-foreground font-medium cursor-pointer">
                        {extra.label}
                      </Label>
                    </div>
                    <span className="text-primary font-semibold">+{extra.price} €</span>
                  </div>
                ))}
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
              <div className="text-center py-4">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Votre billet temporel
                </h2>
                <p className="text-muted-foreground">
                  Vérifiez les détails avant de confirmer
                </p>
              </div>

              {/* Ticket styled summary */}
              <div className="relative bg-card border-2 border-primary rounded-xl overflow-hidden">
                {/* Ticket header */}
                <div className="gold-gradient px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚂</span>
                    <span className="font-serif text-xl font-bold text-primary-foreground">
                      TimeTravel Agency
                    </span>
                  </div>
                  <span className="font-serif text-primary-foreground text-sm">
                    Billet #{ticketNumber}
                  </span>
                </div>

                {/* Ticket body */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-dashed border-border/50">
                    <span className="text-muted-foreground">Destination</span>
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {destinationData?.label || "Non sélectionnée"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-dashed border-border/50">
                    <span className="text-muted-foreground">Date de départ</span>
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {selectedDate || "Non sélectionnée"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-dashed border-border/50">
                    <span className="text-muted-foreground">Voyageurs</span>
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {passengers} personne{passengers > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-dashed border-border/50">
                    <span className="text-muted-foreground">Classe</span>
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {travelClass === "premiere" ? "Première Classe Temporelle" : "Classe Découverte"}
                    </span>
                  </div>
                  {selectedExtras.length > 0 && (
                    <div className="flex justify-between items-start py-3 border-b border-dashed border-border/50">
                      <span className="text-muted-foreground">Extras</span>
                      <div className="text-right">
                        {selectedExtras.map((id) => {
                          const extra = extras.find((e) => e.id === id)
                          return (
                            <p key={id} className="font-serif text-foreground">
                              {extra?.label} (+{extra?.price} €)
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4">
                    <span className="font-serif text-xl font-semibold text-foreground">Total</span>
                    <span className="font-serif text-3xl font-bold text-primary">
                      {totalPrice} €
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
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            )}
            <Button
              onClick={() => {
                if (currentStep < 4) {
                  setCurrentStep(currentStep + 1)
                }
              }}
              disabled={
                (currentStep === 1 && !selectedDestination) ||
                (currentStep === 2 && !selectedDate)
              }
              className="flex-1 h-14 gold-gradient text-primary-foreground font-medium text-lg hover:opacity-90 disabled:opacity-50"
            >
              {currentStep === 4 ? (
                "Émettre mon billet 🚂"
              ) : (
                <>
                  Étape suivante
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
