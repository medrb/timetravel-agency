"use client"

import { motion } from "framer-motion"
import { PageWrapper } from "@/components/page-wrapper"

const sections = [
  {
    title: "Données collectées",
    content: `Nous collectons les données suivantes :
    • Données d'identification : nom, prénom, date de naissance, adresse
    • Coordonnées : email, numéro de téléphone
    • Données de voyage : destinations visitées, dates, préférences
    • Données de santé : uniquement celles nécessaires à votre sécurité temporelle
    • Données de paiement : traitées par nos prestataires certifiés`,
  },
  {
    title: "Utilisation des données",
    content: `Vos données sont utilisées pour :
    • Gérer vos réservations et personnaliser votre expérience
    • Assurer votre sécurité pendant le voyage temporel
    • Vous contacter en cas d'urgence (présent ou époque visitée)
    • Améliorer nos services et destinations
    • Respecter nos obligations légales et temporelles`,
  },
  {
    title: "Vos droits",
    content: `Conformément au RGPD, vous disposez des droits suivants :
    • Droit d'accès à vos données personnelles
    • Droit de rectification des données inexactes
    • Droit à l'effacement ("droit à l'oubli temporel")
    • Droit à la portabilité de vos données
    • Droit d'opposition au traitement
    • Droit de retirer votre consentement à tout moment`,
  },
  {
    title: "Conservation des données",
    content: `Vos données sont conservées :
    • Données de voyage : 5 ans après votre dernier voyage
    • Données de facturation : 10 ans (obligation légale)
    • Données de santé : 2 ans après le voyage concerné
    • Logs temporels : durée indéterminée pour des raisons de sécurité du continuum`,
  },
  {
    title: "Cookies",
    content: `Nous utilisons des cookies pour :
    • Assurer le bon fonctionnement du site (cookies essentiels)
    • Analyser l'utilisation du site (cookies analytiques)
    • Personnaliser votre expérience (cookies de préférence)
    
    Vous pouvez paramétrer vos préférences de cookies à tout moment.`,
  },
  {
    title: "Transferts de données",
    content: `Vos données restent dans l'Union Européenne. Aucun transfert vers des 
    époques antérieures au RGPD n'est effectué sans garanties appropriées de protection 
    anachronique des données.`,
  },
]

export default function ConfidentialitePage() {
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Légal", href: "/" },
        { label: "Confidentialité" },
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
            Politique de <span className="text-gold-gradient">Confidentialité</span>
          </h1>
          <p className="text-muted-foreground">
            Protection de vos données à travers le temps
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-8 md:p-12 space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              TimeTravel Agency s{"'"}engage à protéger la vie privée de ses voyageurs. 
              Cette politique décrit comment nous collectons, utilisons et protégeons 
              vos données personnelles conformément au Règlement Général sur la Protection 
              des Données (RGPD).
            </p>

            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              >
                <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </motion.section>
            ))}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="bg-card rounded-xl p-6 border border-border/50"
            >
              <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                Délégué à la Protection des Données
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                Pour toute question concernant vos données personnelles, contactez notre DPO :
              </p>
              <p className="text-primary font-medium">
                dpo@timetravel-agency.com
              </p>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
