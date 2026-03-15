export interface Highlight {
  icon: string
  title: string
  description: string
}

export interface ItineraryStep {
  day: string
  title: string
  description: string
}

export interface DestinationData {
  slug: string
  heroImage: string
  badge: string
  title: string
  tagline: string
  stats: {
    duration: string
    risk: string
    riskStars: number
    era: string
    seats: string
  }
  description: string
  infoPractique: {
    language: string
    climate: string
    equipment: string[]
    security: string
    securityLevel: "LOW" | "MODERATE" | "MAXIMUM"
  }
  highlights: Highlight[]
  itinerary: ItineraryStep[]
  accentColor: string
  gradient: string
  iconType: "tree" | "landmark" | "building"
}

export const destinationsData: Record<string, DestinationData> = {
  cretace: {
    slug: "cretace",
    heroImage: "https://i.imgur.com/EHlHB64.jpeg",
    badge: "Crétacé · -66 000 000 ans",
    title: "L'Ère des Titans",
    tagline: "Observez les derniers dinosaures avant leur extinction",
    stats: {
      duration: "5 jours",
      risk: "Extrême",
      riskStars: 3,
      era: "-66 000 000 ans",
      seats: "2 places / départ",
    },
    description:
      "Plongez au cœur du Crétacé supérieur, à quelques millénaires avant l'impact météoritique qui allait tout changer. Notre train temporel blindé vous permet d'observer en toute sécurité les derniers T-Rex, Triceratops et Ptérosaures dans leur habitat naturel intact. Une expérience unique que seul TimeTravel Agency peut vous offrir.",
    infoPractique: {
      language: "Aucune (ère pré-humaine)",
      climate: "Chaud et humide, 25-35°C",
      equipment: [
        "Combinaison anti-odeur",
        "Masque filtrant",
        "Capteur sismique",
        "Trousse médicale avancée",
      ],
      security: "MAXIMUM — Sorties du train interdites",
      securityLevel: "MAXIMUM",
    },
    highlights: [
      {
        icon: "dinosaur",
        title: "Les derniers dinosaures",
        description:
          "Observation de T-Rex et Triceratops depuis le wagon panoramique",
      },
      {
        icon: "leaf",
        title: "Jungle primordiale",
        description:
          "Forêts de fougères géantes et paysages jamais vus par l'homme",
      },
      {
        icon: "zap",
        title: "Avant l'extinction",
        description:
          "Vivez les derniers jours d'un monde sur le point de disparaître",
      },
    ],
    itinerary: [
      {
        day: "Jour 1",
        title: "Départ de la gare temporelle",
        description: "Arrivée dans la jungle du Crétacé",
      },
      {
        day: "Jour 2",
        title: "Observation matinale",
        description: "Observation des troupeaux de Triceratops",
      },
      {
        day: "Jour 3",
        title: "Survol panoramique",
        description: "Survol en wagon panoramique de la vallée des T-Rex",
      },
      {
        day: "Jour 4",
        title: "Nuit dans le train",
        description: "Ciel étoilé de l'ère primitive",
      },
      {
        day: "Jour 5",
        title: "Retour",
        description: "Briefing de décompression temporelle",
      },
    ],
    accentColor: "text-emerald-400",
    gradient: "from-emerald-950 to-green-950",
    iconType: "tree",
  },
  florence: {
    slug: "florence",
    heroImage: "https://i.imgur.com/mPaSqkc.jpeg",
    badge: "Renaissance · 1504",
    title: "Florence, La Renaissance",
    tagline: "Au cœur du berceau de l'art occidental",
    stats: {
      duration: "7 jours",
      risk: "Modéré",
      riskStars: 2,
      era: "An 1504",
      seats: "8 places / départ",
    },
    description:
      "Florence, 1504. Léonard de Vinci achève ses derniers chefs-d'œuvre, Michel-Ange vient tout juste de terminer son David. La cité des Médicis est au sommet de sa splendeur artistique et intellectuelle. Déambulez dans les rues pavées, fréquentez les ateliers des plus grands maîtres et assistez à la naissance de l'art tel que nous le connaissons aujourd'hui.",
    infoPractique: {
      language: "Italien toscan (guide-interprète inclus)",
      climate: "Méditerranéen, 18-26°C",
      equipment: [
        "Costume d'époque",
        "Guide-interprète",
        "Carnet de voyage",
        "Monnaie florine",
      ],
      security: "MODÉRÉE — Sorties encadrées autorisées",
      securityLevel: "MODERATE",
    },
    highlights: [
      {
        icon: "palette",
        title: "Les ateliers des Maîtres",
        description:
          "Visitez les botteghe de Vinci et Michel-Ange en activité",
      },
      {
        icon: "building",
        title: "Les Offices avant les Offices",
        description:
          "Découvrez les collections Médicis dans leur contexte original",
      },
      {
        icon: "bridge",
        title: "Vie florentine",
        description:
          "Marché du Ponte Vecchio, banquets Renaissance, joutes et fêtes",
      },
    ],
    itinerary: [
      {
        day: "Jour 1",
        title: "Arrivée à Florence",
        description: "Installation et briefing culturel",
      },
      {
        day: "Jour 2",
        title: "Visite du Duomo",
        description: "Découverte des quartiers artisanaux",
      },
      {
        day: "Jour 3",
        title: "Journée aux ateliers",
        description: "Rencontre avec des artisans de l'époque",
      },
      {
        day: "Jour 4",
        title: "Excursion",
        description: "Jardins Médicis et villas de la campagne toscane",
      },
      {
        day: "Jour 5",
        title: "Marché du Ponte Vecchio",
        description: "Shopping en florins",
      },
      {
        day: "Jour 6",
        title: "Soirée banquet Renaissance",
        description: "Costume d'époque obligatoire",
      },
      {
        day: "Jour 7",
        title: "Retour",
        description: "Séance de décompression culturelle",
      },
    ],
    accentColor: "text-amber-400",
    gradient: "from-amber-900 to-orange-950",
    iconType: "landmark",
  },
  "paris-1889": {
    slug: "paris-1889",
    heroImage: "https://i.imgur.com/Wjo85QD.jpeg",
    badge: "Belle Époque · 1889",
    title: "Paris, Belle Époque",
    tagline: "Inauguration de la Tour Eiffel & naissance du Moulin Rouge",
    stats: {
      duration: "5 jours",
      risk: "Facile",
      riskStars: 1,
      era: "An 1889",
      seats: "12 places / départ",
    },
    description:
      "Paris, 1889. L'Exposition Universelle bat son plein et la Tour Eiffel, surnommée la 'Dame de Fer', vient d'être inaugurée par Gustave Eiffel en personne. La même année, au pied de la butte Montmartre, un certain Joseph Oller ouvre les portes du Moulin Rouge. Cancan, absinthe, impressionnisme et effervescence intellectuelle — Paris est au cœur de sa Belle Époque.",
    infoPractique: {
      language: "Français (aucune assistance requise)",
      climate: "Tempéré parisien, 15-22°C",
      equipment: [
        "Tenue Belle Époque",
        "Carnet de bons de consommation",
        "Guide des expositions",
        "Plan de l'Exposition Universelle",
      ],
      security: "FAIBLE — Liberté de déplacement totale (avec escorte optionnelle)",
      securityLevel: "LOW",
    },
    highlights: [
      {
        icon: "tower",
        title: "Inauguration de la Dame de Fer",
        description:
          "Montez au sommet de la Tour Eiffel le jour de son inauguration",
      },
      {
        icon: "theater",
        title: "Nuit au Moulin Rouge",
        description:
          "Assistez au tout premier spectacle de cabaret de l'histoire",
      },
      {
        icon: "palette",
        title: "Les Impressionnistes",
        description:
          "Croisez Toulouse-Lautrec, Monet et Renoir dans leurs cafés habituels",
      },
    ],
    itinerary: [
      {
        day: "Jour 1",
        title: "Arrivée Gare du Nord",
        description: "Promenade sur les Grands Boulevards",
      },
      {
        day: "Jour 2",
        title: "Exposition Universelle",
        description: "Visite et montée à la Tour Eiffel",
      },
      {
        day: "Jour 3",
        title: "Montmartre",
        description: "Ateliers des peintres impressionnistes",
      },
      {
        day: "Jour 4",
        title: "Soirée au Moulin Rouge",
        description: "Première représentation historique",
      },
      {
        day: "Jour 5",
        title: "Marché aux puces",
        description: "Saint-Ouen, retour temporel",
      },
    ],
    accentColor: "text-primary",
    gradient: "from-primary/80 to-amber-950",
    iconType: "building",
  },
}

export function getDestination(slug: string): DestinationData | undefined {
  return destinationsData[slug]
}

export function getOtherDestinations(currentSlug: string): DestinationData[] {
  return Object.values(destinationsData).filter((d) => d.slug !== currentSlug)
}
