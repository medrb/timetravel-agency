"use client"

import { motion } from "framer-motion"
import { PageWrapper } from "@/components/page-wrapper"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const safetyLevels = [
  {
    destination: "Paris 1889",
    href: "/destinations/paris-1889",
    level: "FAIBLE",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
    borderColor: "border-emerald-500/30",
    description: "Environnement civilisé et accueillant. La Belle Époque parisienne offre un cadre sûr et sophistiqué.",
    protocols: [
      "Briefing de 15 minutes sur les coutumes de l'époque",
      "Guide francophone accompagnateur",
      "Vêtements d'époque fournis",
      "Point de rendez-vous sécurisé",
    ],
  },
  {
    destination: "Florence 1504",
    href: "/destinations/florence",
    level: "MODÉRÉ",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
    borderColor: "border-amber-500/30",
    description: "Renaissance italienne avec quelques tensions politiques. Prudence recommandée dans certains quartiers.",
    protocols: [
      "Briefing de 30 minutes sur le contexte politique",
      "Guide historien spécialisé Renaissance",
      "Équipement d'époque complet",
      "Zones de sécurité définies",
      "Protocole d'extraction rapide",
    ],
  },
  {
    destination: "Crétacé -66M ans",
    href: "/destinations/cretace",
    level: "MAXIMUM",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    borderColor: "border-red-500/30",
    description: "Environnement préhistorique hostile. Les voyageurs restent à bord du train blindé sécurisé.",
    protocols: [
      "Formation de sécurité obligatoire de 2 heures",
      "Aucune sortie du train autorisée",
      "Observation depuis les baies blindées uniquement",
      "Équipement de survie d'urgence fourni",
      "Personnel médical à bord",
      "Protocole d'urgence temporelle actif",
    ],
  },
]

const emergencyProcedures = [
  {
    title: "Alerte Temporelle",
    description: "En cas de perturbation du continuum, le train effectue un retour automatique au présent.",
  },
  {
    title: "Évacuation d'Urgence",
    description: "Chaque wagon dispose d'un module de saut temporel indépendant pour évacuation individuelle.",
  },
  {
    title: "Contact Présent",
    description: "Communication instantanée avec notre QG 2024 via liaison quantique sécurisée.",
  },
  {
    title: "Paradoxe Temporel",
    description: "Nos systèmes détectent et corrigent automatiquement toute altération du flux temporel.",
  },
]

export default function SecuritePage() {
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Le Train", href: "/#le-train" },
        { label: "Sécurité" },
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Votre Sécurité, <span className="text-gold-gradient">Notre Priorité</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des protocoles rigoureux pour chaque destination, adaptés aux défis de chaque époque
          </p>
        </motion.div>

        {/* Safety Levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
            Niveaux de Sécurité par Destination
          </h2>
          
          <div className="space-y-6">
            {safetyLevels.map((item, index) => (
              <motion.div
                key={item.destination}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className={`bg-card/60 glass-effect rounded-2xl border ${item.borderColor} p-6 md:p-8`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Link href={item.href} className="font-serif text-2xl font-bold text-foreground hover:text-primary transition-colors">
                        {item.destination}
                      </Link>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.bgColor} ${item.color}`}>
                        Niveau {item.level}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <h4 className="font-semibold text-foreground mb-3">Protocoles de sécurité :</h4>
                    <ul className="space-y-2">
                      {item.protocols.map((protocol) => (
                        <li key={protocol} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${item.color}`} />
                          {protocol}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Procedures */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
            <AlertTriangle className="inline-block h-8 w-8 text-primary mr-3" />
            Procédures d{"'"}Urgence
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyProcedures.map((procedure, index) => (
              <motion.div
                key={procedure.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-card/40 glass-effect rounded-xl border border-border/50 p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {procedure.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {procedure.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Des questions sur nos protocoles de sécurité ?
            </p>
            <Link href="/contact">
              <Button className="gold-gradient text-primary-foreground">
                Contactez notre équipe
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
