"use client"

import { motion } from "framer-motion"
import { PageWrapper } from "@/components/page-wrapper"

const timeline = [
  {
    year: "2020",
    title: "La Découverte",
    description: "Le professeur Émile Durand découvre une anomalie dans le continuum espace-temps lors de ses recherches à l'Institut Temporel de Paris.",
  },
  {
    year: "2021",
    title: "Premiers Tests",
    description: "Première traversée temporelle réussie avec un objet inanimé. La théorie devient réalité.",
  },
  {
    year: "2022",
    title: "Le Premier Voyage Humain",
    description: "Le professeur Durand devient le premier humain à voyager dans le temps, visitant Paris en 1889.",
  },
  {
    year: "2023",
    title: "Fondation de l'Agence",
    description: "TimeTravel Agency est officiellement créée pour permettre au public de vivre cette expérience unique.",
  },
  {
    year: "2024",
    title: "Ouverture au Public",
    description: "Les premiers voyageurs embarquent à bord du Train Temporel vers des époques fascinantes.",
  },
]

export default function NotreHistoirePage() {
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Le Train", href: "/#le-train" },
        { label: "Notre Histoire" },
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
            Notre <span className="text-gold-gradient">Histoire</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            De la découverte scientifique au voyage temporel accessible à tous
          </p>
        </motion.div>

        {/* Origin Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="bg-card/60 glass-effect rounded-2xl border border-border/50 p-8 md:p-12">
            <p className="text-foreground leading-relaxed text-lg mb-6">
              TimeTravel Agency est née d{"'"}une vision audacieuse : rendre le voyage temporel 
              accessible à tous ceux qui rêvent d{"'"}explorer les époques qui ont façonné notre monde.
            </p>
            <p className="text-foreground leading-relaxed text-lg mb-6">
              Fondée en 2024 par le professeur Émile Durand, éminent physicien quantique, 
              notre agence combine la rigueur scientifique avec l{"'"}émerveillement du voyage. 
              Chaque destination est soigneusement sélectionnée pour son intérêt historique 
              et sa sécurité temporelle.
            </p>
            <p className="text-foreground leading-relaxed text-lg">
              Aujourd{"'"}hui, nous avons le privilège d{"'"}accueillir des milliers de voyageurs 
              chaque année, leur offrant des expériences uniques à travers le temps.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
            Les Étapes Clés
          </h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full gold-gradient -translate-x-1/2 z-10" />
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}>
                  <span className="text-primary font-bold text-xl">{item.year}</span>
                  <h3 className="font-serif text-xl font-semibold text-foreground mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Founder Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <blockquote className="relative bg-card/40 glass-effect rounded-2xl border border-primary/30 p-8 md:p-12">
            <div className="text-6xl text-primary/30 absolute top-4 left-6">"</div>
            <p className="font-serif text-xl md:text-2xl text-foreground italic leading-relaxed mb-6 relative z-10">
              Le temps n{"'"}est pas une prison, c{"'"}est un océan. Et nous avons construit 
              le navire qui permet de le traverser.
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-2xl">
                👨‍🔬
              </div>
              <div>
                <cite className="font-semibold text-foreground not-italic">
                  Pr. Émile Durand
                </cite>
                <p className="text-sm text-muted-foreground">
                  Fondateur de TimeTravel Agency
                </p>
              </div>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
