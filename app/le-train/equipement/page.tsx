"use client"

import { motion } from "framer-motion"
import { PageWrapper } from "@/components/page-wrapper"
import { Shirt, Compass, Shield, Camera, Watch, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const equipment = [
  {
    icon: Shirt,
    name: "Tenue d'Époque",
    description: "Vêtements authentiques reconstitués par nos historiens du costume. Chaque détail est fidèle à l'époque visitée.",
    destinations: ["Paris 1889", "Florence 1504"],
    included: true,
  },
  {
    icon: Compass,
    name: "Chronocompas",
    description: "Boussole temporelle indiquant en permanence la direction du point de rendez-vous et le temps restant.",
    destinations: ["Paris 1889", "Florence 1504", "Crétacé"],
    included: true,
  },
  {
    icon: Shield,
    name: "Kit de Survie Temporelle",
    description: "Équipement de protection incluant rations, médicaments d'époque compatible, et balise de détresse.",
    destinations: ["Crétacé"],
    included: true,
  },
  {
    icon: Camera,
    name: "Capteur Mémoriel",
    description: "Dispositif d'enregistrement holographique discret pour immortaliser vos souvenirs sans altérer le cours de l'histoire.",
    destinations: ["Paris 1889", "Florence 1504", "Crétacé"],
    included: false,
    price: "+150 €",
  },
  {
    icon: Watch,
    name: "Chronomètre Quantique",
    description: "Montre synchronisée avec le présent, affichant l'heure actuelle et l'heure de l'époque visitée simultanément.",
    destinations: ["Paris 1889", "Florence 1504", "Crétacé"],
    included: true,
  },
  {
    icon: Briefcase,
    name: "Mallette du Voyageur",
    description: "Contient devises d'époque, documents d'identité temporels, et guide de conversation adapté.",
    destinations: ["Paris 1889", "Florence 1504"],
    included: true,
  },
]

const destinationColors: Record<string, string> = {
  "Paris 1889": "bg-primary/20 text-primary",
  "Florence 1504": "bg-amber-500/20 text-amber-400",
  "Crétacé": "bg-emerald-500/20 text-emerald-400",
}

export default function EquipementPage() {
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Le Train", href: "/#le-train" },
        { label: "Équipement" },
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
            Équipement & <span className="text-gold-gradient">Matériel</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tout le nécessaire pour voyager à travers le temps en toute sérénité
          </p>
        </motion.div>

        {/* Equipment Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  {item.included ? (
                    <span className="px-2 py-1 rounded text-xs bg-emerald-500/20 text-emerald-400">
                      Inclus
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
                      {item.price}
                    </span>
                  )}
                </div>
                
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {item.destinations.map((dest) => (
                    <span
                      key={dest}
                      className={`px-2 py-1 rounded text-xs ${destinationColors[dest]}`}
                    >
                      {dest}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-card/40 glass-effect rounded-2xl border border-primary/30 p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Prêt à embarquer ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Tous les équipements essentiels sont inclus dans votre réservation. 
              Personnalisez votre voyage avec nos options premium.
            </p>
            <Link href="/reservation">
              <Button className="gold-gradient text-primary-foreground px-8">
                Réserver maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
