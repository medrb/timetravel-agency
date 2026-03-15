"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/page-wrapper"
import { Send, MapPin, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const epoques = [
  { value: "paris-1889", label: "Paris 1889" },
  { value: "florence-1504", label: "Florence 1504" },
  { value: "cretace", label: "Crétacé -66M ans" },
  { value: "autre", label: "Autre / Pas encore décidé" },
]

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "Gare Temporelle, Quai 9¾, Paris",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@timetravel-agency.com",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Ouverts dans tous les fuseaux horaires",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    epoque: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
  }

  return (
    <PageWrapper breadcrumbs={[{ label: "Contact" }]}>
      <div className="container mx-auto px-4 pb-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Contactez-nous <span className="text-gold-gradient">à travers le temps</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une question ? Un projet de voyage ? Notre équipe vous répond rapidement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="bg-card/60 glass-effect rounded-2xl border border-primary/30 p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
                  <Send className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Message envoyé !
                </h2>
                <p className="text-muted-foreground">
                  Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais, 
                  quelle que soit l{"'"}époque d{"'"}où vous nous contactez.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-8 space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-foreground">
                    Nom complet
                  </Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="Votre nom"
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="epoque" className="text-foreground">
                    Époque préférée
                  </Label>
                  <Select
                    value={formData.epoque}
                    onValueChange={(value) => setFormData({ ...formData, epoque: value })}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue placeholder="Sélectionnez une époque" />
                    </SelectTrigger>
                    <SelectContent>
                      {epoques.map((epoque) => (
                        <SelectItem key={epoque.value} value={epoque.value}>
                          {epoque.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre projet de voyage ou posez votre question..."
                    rows={5}
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gold-gradient text-primary-foreground h-12 text-lg"
                >
                  Envoyer un message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-card/60 glass-effect rounded-xl border border-border/50 p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                  <info.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                  <p className="text-muted-foreground">{info.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="bg-card/40 glass-effect rounded-xl border border-border/50 p-8 text-center h-64 flex flex-col items-center justify-center"
            >
              <MapPin className="h-12 w-12 text-primary/50 mb-4" />
              <p className="text-muted-foreground font-medium">
                Localisation confidentielle
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Pour des raisons de sécurité temporelle, notre adresse exacte 
                est communiquée uniquement après réservation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
