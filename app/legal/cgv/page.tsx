"use client"

import { motion } from "framer-motion"
import { PageWrapper } from "@/components/page-wrapper"

const articles = [
  {
    title: "Article 1 — Objet",
    content: `Les présentes Conditions Générales de Vente régissent les relations contractuelles 
    entre TimeTravel Agency SAS et ses clients (ci-après "les Voyageurs") pour toute réservation 
    de voyage temporel. En effectuant une réservation, le Voyageur accepte sans réserve les 
    présentes conditions.`,
  },
  {
    title: "Article 2 — Prix et modalités de paiement",
    content: `Les prix sont exprimés en euros et comprennent : le transport temporel aller-retour, 
    l'équipement de base adapté à l'époque, l'accompagnement par un guide certifié, et l'assurance 
    de base. Un acompte de 30% est requis à la réservation, le solde étant dû 30 jours avant le départ.`,
  },
  {
    title: "Article 3 — Annulation et remboursement",
    content: `Annulation plus de 60 jours avant le départ : remboursement intégral moins 50€ de frais de dossier.
    Entre 30 et 60 jours : remboursement de 70%.
    Entre 15 et 30 jours : remboursement de 50%.
    Moins de 15 jours : aucun remboursement.
    En cas d'annulation par TimeTravel Agency (conditions météorologiques temporelles défavorables), 
    remboursement intégral ou report sans frais.`,
  },
  {
    title: "Article 4 — Responsabilité temporelle",
    content: `Le Voyageur s'engage solennellement à ne pas interagir de manière à modifier le cours 
    de l'histoire. Il est formellement interdit de : révéler des événements futurs aux personnes 
    de l'époque visitée, emporter des objets technologiques anachroniques, tenter de modifier 
    des événements historiques connus. L'agence décline toute responsabilité en cas de paradoxe 
    temporel causé par le non-respect de ces règles.`,
  },
  {
    title: "Article 5 — Obligations du Voyageur",
    content: `Le Voyageur s'engage à : suivre scrupuleusement les consignes de sécurité, 
    rester dans les zones autorisées définies par le guide, porter en permanence son 
    chronocompas, ne pas divulguer l'existence des voyages temporels aux personnes de 
    l'époque visitée, revenir au point de rendez-vous à l'heure convenue.`,
  },
  {
    title: "Article 6 — Assurances",
    content: `Une assurance de base est incluse couvrant : les frais médicaux d'urgence 
    (adaptés à l'époque), le rapatriement temporel d'urgence, la perte d'équipement fourni 
    par l'agence. L'assurance temporelle premium (recommandée) couvre en supplément : 
    les paradoxes temporels mineurs, la perte de souvenirs autorisés, et l'extraction 
    d'urgence en cas de danger imminent.`,
  },
  {
    title: "Article 7 — Litiges",
    content: `En cas de litige, une solution amiable sera recherchée avant toute action 
    judiciaire. À défaut, les tribunaux de Paris seront seuls compétents. La loi applicable 
    est la loi française, quelle que soit l'époque visitée.`,
  },
]

export default function CGVPage() {
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Légal", href: "/" },
        { label: "CGV" },
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Conditions Générales de <span className="text-gold-gradient">Vente</span>
          </h1>
          <p className="text-muted-foreground">
            Dernière mise à jour : 1er janvier 2024
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-8 md:p-12 space-y-8">
            {articles.map((article, index) => (
              <motion.section
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              >
                <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {article.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {article.content}
                </p>
              </motion.section>
            ))}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30"
            >
              <h2 className="font-serif text-lg font-semibold text-amber-400 mb-3">
                Clause spéciale paradoxe temporel
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Le Voyageur reconnaît que tout paradoxe temporel créé par ses actions 
                pourrait théoriquement effacer son existence ou modifier sa réalité 
                de manière imprévisible. TimeTravel Agency ne pourra en aucun cas être 
                tenue responsable de tels événements, le Voyageur ayant été dûment informé 
                des risques.
              </p>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
