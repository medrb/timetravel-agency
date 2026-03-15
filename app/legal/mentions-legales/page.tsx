"use client"

import { motion } from "framer-motion"
import { PageWrapper } from "@/components/page-wrapper"

export default function MentionsLegalesPage() {
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Légal", href: "/" },
        { label: "Mentions Légales" },
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
            Mentions <span className="text-gold-gradient">Légales</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto prose prose-invert"
        >
          <div className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-8 md:p-12 space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Éditeur du site
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">TimeTravel Agency SAS</strong><br />
                Capital social : 1 000 000 €<br />
                Siège social : Gare Temporelle, Quai 9¾, 75001 Paris<br />
                SIRET : 123 456 789 00001<br />
                RCS Paris B 123 456 789<br />
                Directeur de la publication : Pr. Émile Durand
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Hébergeur
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Propriété intellectuelle
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                L{"'"}ensemble de ce site relève de la législation française et internationale 
                sur le droit d{"'"}auteur et la propriété intellectuelle. Tous les droits de 
                reproduction sont réservés, y compris pour les documents téléchargeables et 
                les représentations iconographiques et photographiques.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                La reproduction de tout ou partie de ce site sur un support électronique 
                quel qu{"'"}il soit est formellement interdite sauf autorisation expresse du 
                directeur de la publication.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Responsabilité
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                TimeTravel Agency s{"'"}efforce d{"'"}assurer au mieux de ses possibilités, 
                l{"'"}exactitude et la mise à jour des informations diffusées sur ce site, 
                dont elle se réserve le droit de corriger, à tout moment et sans préavis, 
                le contenu.
              </p>
            </section>

            <section className="bg-primary/10 rounded-xl p-6 border border-primary/30">
              <h2 className="font-serif text-xl font-semibold text-primary mb-3">
                Note importante
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                TimeTravel Agency est une agence fictive créée à des fins de démonstration. 
                Tout voyage temporel réel reste à la charge du voyageur et dépend 
                entièrement des avancées futures de la physique quantique.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
