# TimeTravel Agency

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.0-06B6D4?logo=tailwindcss&logoColor=white)
![Mistral AI](https://img.shields.io/badge/Mistral_AI-@mistralai%2Fmistralai%201.15.1-FF7000)
![License MIT](https://img.shields.io/badge/License-MIT-green)

## 1. Titre du projet + badges
Nom du package detecte: `TimeTravel Agency` (application brandee TimeTravel Agency dans l'interface).

## 2. Description
TimeTravel Agency est une application web Next.js qui met en scene une agence de voyages temporels fictive. Le site propose des destinations immersives (Paris 1889, Florence 1504, Cretace), un parcours de reservation, et plusieurs pages editoriales (train, securite, legal). Deux endpoints IA (chat assistant et quiz de recommandation) utilisent Mistral pour personnaliser l'experience voyageur.

## 3. Table des matieres
- [1. Titre du projet + badges](#1-titre-du-projet--badges)
- [2. Description](#2-description)
- [3. Table des matieres](#3-table-des-matieres)
- [4. Technologies](#4-technologies)
- [5. Fonctionnalites implementees](#5-fonctionnalites-implementees)
- [6. Transparence IA](#6-transparence-ia)
- [7. Installation](#7-installation)
- [8. Variables d'environnement](#8-variables-denvironnement)
- [9. Structure du projet](#9-structure-du-projet)
- [10. Credits](#10-credits)
- [11. Licence](#11-licence)

## 4. Technologies
### Frontend
| Technologie | Version | Usage |
|---|---:|---|
| Next.js | 16.1.6 | Framework React (App Router, pages, routes API) |
| React / React DOM | 19.2.4 | Rendu UI et logique composant |
| TypeScript | 5.7.3 | Typage statique du projet |
| Tailwind CSS | ^4.2.0 | Styling utilitaire + theme tokens |
| shadcn/ui (style new-york) | components.json | Bibliotheque de composants UI basee sur Radix |
| Framer Motion | ^11.15.0 | Animations (hero, sections, transitions quiz) |
| lucide-react | ^0.564.0 | Iconographie |
| next-themes | ^0.4.6 | Gestion du theme |
| embla-carousel-react | 8.6.0 | Support carrousel |
| react-hook-form + resolvers | ^7.54.1 / ^3.9.1 | Gestion/validation de formulaires |
| date-fns / react-day-picker | 4.1.0 / 9.13.2 | Dates et calendrier |

### Backend
| Technologie | Version | Usage |
|---|---:|---|
| Next.js Route Handlers | 16.1.6 | Endpoints `POST /api/chat` et `POST /api/recommend` |
| @mistralai/mistralai | ^1.15.1 | Client API Mistral (chat + recommandation) |
| zod | ^3.24.1 | Validation schema (disponible pour validations futures) |
| @vercel/analytics | 1.6.1 | Telemetrie front |

### Outils de dev
| Technologie | Version | Usage |
|---|---:|---|
| postcss + @tailwindcss/postcss | ^8.5 / ^4.2.0 | Pipeline CSS |
| autoprefixer | ^10.4.20 | Prefixes CSS |
| tw-animate-css | 1.3.3 | Utilitaires d'animation |
| @types/node/react/react-dom | ^22 / 19.2.14 / 19.2.3 | Typages TypeScript |

## 5. Fonctionnalites implementees
### Navigation et structure
- [x] Header sticky responsive avec menu mobile (`components/header.tsx`)
- [x] Navigation par ancres (`destinations`, `quiz`, `le-train`, `reservation`)
- [x] Footer multi-colonnes avec liens destinations/train/legal (`components/footer.tsx`)
- [x] Wrapper reutilisable pour pages internes (`components/page-wrapper.tsx`)
- [x] Fil d'ariane reutilisable (`components/breadcrumb.tsx`)

### Homepage
- [x] Hero anime avec rotation d'epoques et CTA scroll (`components/hero.tsx`)
- [x] Section destinations avec cartes et badges (`components/destinations.tsx`)
- [x] Quiz IA de recommandation de destination (`components/destination-quiz.tsx`)
- [x] Galerie media avec video + miniatures (`components/gallery.tsx`)
- [x] Bloc conseiller temporel et CTA chat (`components/temporal-chat.tsx`)
- [x] Module de reservation multi-etapes homepage (`components/booking.tsx`)
- [x] Widget chat flottant global (`components/chat-widget.tsx`)

### Pages et routes applicatives
- [x] Page d'accueil (`app/page.tsx`)
- [x] Page contact (`app/contact/page.tsx`)
- [x] Page reservation complete (`app/reservation/page.tsx`)
- [x] Page destination dynamique (`app/destinations/[slug]/page.tsx`)
- [x] Pages train: histoire, train temporel, equipement, securite (`app/le-train/...`)
- [x] Pages legales: CGV, confidentialite, mentions legales (`app/legal/...`)

### Experience destination detail
- [x] Hero destination (`components/destination/hero.tsx`)
- [x] Stats destination (`components/destination/stats.tsx`)
- [x] Description + infos pratiques (`components/destination/description.tsx`)
- [x] Highlights (`components/destination/highlights.tsx`)
- [x] Itineraire timeline (`components/destination/itinerary.tsx`)
- [x] CTA de reservation (`components/destination/cta.tsx`)
- [x] Destinations similaires (`components/destination/similar.tsx`)

### IA et personnalisation
- [x] Endpoint conversationnel Contrôleur Temporel (`app/api/chat/route.ts`)
- [x] Endpoint recommandation quiz IA (`app/api/recommend/route.ts`)
- [x] Parsing robuste des sorties JSON du modele (nettoyage markdown/fallback)
- [x] Fallback de recommandation en cas d'erreur API

## 6. Transparence IA
### a) IA utilisee dans l'application
| Feature | Modele | Provider | Usage | Theme du prompt |
|---|---|---|---|---|
| Assistant conversationnel (`/api/chat`) | `mistral-small-latest` | Mistral AI | Repondre aux questions voyageurs, guider vers reservation | Persona "Contrôleur Temporel", ton chic, conseil voyage |
| Recommandation quiz (`/api/recommend`) | `mistral-small-latest` | Mistral AI | Analyser 4 reponses et recommander 1 destination | Compatibilite profil voyageur -> Paris/Florence/Cretace |

### b) IA utilisee pendant le developpement
| Tool | Usage |
|---|---|
| GitHub Copilot | Code generation, bug fixes, refactoring |
| Claude Sonnet 4.6 | Generation des prompts originaux |
| Seelab et Gemini | Generation des visuels photos |
| Pixverse | Transformation des images en videos |
| v0.app (metadata `generator`) | Bootstrap initial / generation de base de projet |

> Part of the code was generated or assisted by AI tools.
> The project was supervised, corrected and integrated by the team.

## 7. Installation
### Prerequis
- Node.js 20+
- npm (ou pnpm)

### Etapes
```bash
git clone <url-du-repo>
cd b_2qJ6yvgp8Eo-1773606929759
```

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Application disponible sur http://localhost:3000.

### Build production
```bash
npm run build
npm run start
```

### Script lint
```bash
npm run lint
```

Note: le script lint est declare dans `package.json` mais le package `eslint` n'est pas present actuellement.

### Scripts disponibles
| Script | Commande reelle |
|---|---|
| dev | `next dev` |
| build | `next build` |
| start | `next start` |
| lint | `eslint .` |

## 8. Variables d'environnement
### Variables detectees
| Nom | Requis | Obtention | Utilisation |
|---|---|---|---|
| `MISTRAL_API_KEY` | Oui | Console Mistral: https://console.mistral.ai/api-keys | Auth des routes `/api/chat` et `/api/recommend` |

### Exemple
```env
MISTRAL_API_KEY=your_mistral_api_key_here
```

## 9. Structure du projet
```text
.
├── app/
│   ├── api/
│   │   ├── chat/route.ts                 # Chat IA (Contrôleur Temporel)
│   │   └── recommend/route.ts            # Recommandation IA via quiz
│   ├── destinations/[slug]/page.tsx      # Page destination dynamique
│   ├── contact/page.tsx                  # Formulaire de contact
│   ├── reservation/page.tsx              # Reservation detaillee multi-etapes
│   ├── le-train/
│   │   ├── equipement/page.tsx           # Catalogue equipements
│   │   ├── notre-histoire/page.tsx       # Timeline de la marque
│   │   ├── securite/page.tsx             # Protocoles securite
│   │   └── train-temporel/page.tsx       # Specs du train
│   ├── legal/
│   │   ├── cgv/page.tsx                  # Conditions generales
│   │   ├── confidentialite/page.tsx      # Politique RGPD
│   │   └── mentions-legales/page.tsx     # Mentions legales
│   ├── globals.css                       # Theme design principal (dark luxe)
│   ├── layout.tsx                        # Layout root + fonts + widget chat
│   └── page.tsx                          # Assemblage homepage
├── components/
│   ├── destination/                      # Blocs de page destination
│   ├── ui/                               # Composants shadcn/ui
│   ├── booking.tsx                       # Reservation homepage
│   ├── chat-widget.tsx                   # Widget chat flottant
│   ├── destination-quiz.tsx              # Quiz IA
│   ├── destinations.tsx                  # Section destinations
│   ├── gallery.tsx                       # Galerie media
│   ├── header.tsx                        # Navigation globale
│   ├── hero.tsx                          # Hero anime
│   ├── temporal-chat.tsx                 # Bloc CTA assistant IA
│   └── footer.tsx                        # Footer global
├── hooks/
│   ├── use-mobile.ts                     # Hook detection mobile
│   └── use-toast.ts                      # Etat toast
├── lib/
│   ├── destinations-data.ts              # Donnees source destinations + types
│   └── utils.ts                          # Helper `cn`
├── public/                               # Assets statiques
├── styles/globals.css                    # Ancien theme CSS
├── .env.example                          # Variables d'environnement (exemple)
├── next.config.mjs                       # Config Next + remote images + TS ignoreBuildErrors
├── package.json                          # Scripts + dependances
└── tsconfig.json                         # Config TypeScript
```

## 10. Credits
### Creatrice du projet
Marie-Emily DARBON

### Ressources et fournisseurs
| Resource | Source | Usage |
|---|---|---|
| AI provider | Mistral AI | Generation de reponses chat + recommandation quiz |
| Analytics | Vercel Analytics | Suivi telemetrique client |
| Hosting (mentions legales) | Vercel Inc. | Hebergement plateforme |
| Images destinations | i.imgur.com | Cartes, hero, miniatures |
| Video preview | i.imgur.com/eTc6k4G.mp4 | Media section galerie |
| UI primitives | Radix UI | Base composants accessibles |
| Icons | lucide-react | Iconographie globale |

### Dependances runtime (package.json -> dependencies)
| Package | Version | NPM |
|---|---:|---|
| @hookform/resolvers | ^3.9.1 | https://www.npmjs.com/package/@hookform/resolvers |
| @mistralai/mistralai | ^1.15.1 | https://www.npmjs.com/package/@mistralai/mistralai |
| @radix-ui/react-accordion | 1.2.12 | https://www.npmjs.com/package/@radix-ui/react-accordion |
| @radix-ui/react-alert-dialog | 1.1.15 | https://www.npmjs.com/package/@radix-ui/react-alert-dialog |
| @radix-ui/react-aspect-ratio | 1.1.8 | https://www.npmjs.com/package/@radix-ui/react-aspect-ratio |
| @radix-ui/react-avatar | 1.1.11 | https://www.npmjs.com/package/@radix-ui/react-avatar |
| @radix-ui/react-checkbox | 1.3.3 | https://www.npmjs.com/package/@radix-ui/react-checkbox |
| @radix-ui/react-collapsible | 1.1.12 | https://www.npmjs.com/package/@radix-ui/react-collapsible |
| @radix-ui/react-context-menu | 2.2.16 | https://www.npmjs.com/package/@radix-ui/react-context-menu |
| @radix-ui/react-dialog | 1.1.15 | https://www.npmjs.com/package/@radix-ui/react-dialog |
| @radix-ui/react-dropdown-menu | 2.1.16 | https://www.npmjs.com/package/@radix-ui/react-dropdown-menu |
| @radix-ui/react-hover-card | 1.1.15 | https://www.npmjs.com/package/@radix-ui/react-hover-card |
| @radix-ui/react-label | 2.1.8 | https://www.npmjs.com/package/@radix-ui/react-label |
| @radix-ui/react-menubar | 1.1.16 | https://www.npmjs.com/package/@radix-ui/react-menubar |
| @radix-ui/react-navigation-menu | 1.2.14 | https://www.npmjs.com/package/@radix-ui/react-navigation-menu |
| @radix-ui/react-popover | 1.1.15 | https://www.npmjs.com/package/@radix-ui/react-popover |
| @radix-ui/react-progress | 1.1.8 | https://www.npmjs.com/package/@radix-ui/react-progress |
| @radix-ui/react-radio-group | 1.3.8 | https://www.npmjs.com/package/@radix-ui/react-radio-group |
| @radix-ui/react-scroll-area | 1.2.10 | https://www.npmjs.com/package/@radix-ui/react-scroll-area |
| @radix-ui/react-select | 2.2.6 | https://www.npmjs.com/package/@radix-ui/react-select |
| @radix-ui/react-separator | 1.1.8 | https://www.npmjs.com/package/@radix-ui/react-separator |
| @radix-ui/react-slider | 1.3.6 | https://www.npmjs.com/package/@radix-ui/react-slider |
| @radix-ui/react-slot | 1.2.4 | https://www.npmjs.com/package/@radix-ui/react-slot |
| @radix-ui/react-switch | 1.2.6 | https://www.npmjs.com/package/@radix-ui/react-switch |
| @radix-ui/react-tabs | 1.1.13 | https://www.npmjs.com/package/@radix-ui/react-tabs |
| @radix-ui/react-toast | 1.2.15 | https://www.npmjs.com/package/@radix-ui/react-toast |
| @radix-ui/react-toggle | 1.1.10 | https://www.npmjs.com/package/@radix-ui/react-toggle |
| @radix-ui/react-toggle-group | 1.1.11 | https://www.npmjs.com/package/@radix-ui/react-toggle-group |
| @radix-ui/react-tooltip | 1.2.8 | https://www.npmjs.com/package/@radix-ui/react-tooltip |
| @vercel/analytics | 1.6.1 | https://www.npmjs.com/package/@vercel/analytics |
| autoprefixer | ^10.4.20 | https://www.npmjs.com/package/autoprefixer |
| class-variance-authority | ^0.7.1 | https://www.npmjs.com/package/class-variance-authority |
| clsx | ^2.1.1 | https://www.npmjs.com/package/clsx |
| cmdk | 1.1.1 | https://www.npmjs.com/package/cmdk |
| date-fns | 4.1.0 | https://www.npmjs.com/package/date-fns |
| embla-carousel-react | 8.6.0 | https://www.npmjs.com/package/embla-carousel-react |
| framer-motion | ^11.15.0 | https://www.npmjs.com/package/framer-motion |
| input-otp | 1.4.2 | https://www.npmjs.com/package/input-otp |
| lucide-react | ^0.564.0 | https://www.npmjs.com/package/lucide-react |
| next | 16.1.6 | https://www.npmjs.com/package/next |
| next-themes | ^0.4.6 | https://www.npmjs.com/package/next-themes |
| react | 19.2.4 | https://www.npmjs.com/package/react |
| react-day-picker | 9.13.2 | https://www.npmjs.com/package/react-day-picker |
| react-dom | 19.2.4 | https://www.npmjs.com/package/react-dom |
| react-hook-form | ^7.54.1 | https://www.npmjs.com/package/react-hook-form |
| react-resizable-panels | ^2.1.7 | https://www.npmjs.com/package/react-resizable-panels |
| recharts | 2.15.0 | https://www.npmjs.com/package/recharts |
| sonner | ^1.7.1 | https://www.npmjs.com/package/sonner |
| tailwind-merge | ^3.3.1 | https://www.npmjs.com/package/tailwind-merge |
| vaul | ^1.1.2 | https://www.npmjs.com/package/vaul |
| zod | ^3.24.1 | https://www.npmjs.com/package/zod |

### Dependances developpement (package.json -> devDependencies)
| Package | Version | NPM |
|---|---:|---|
| @tailwindcss/postcss | ^4.2.0 | https://www.npmjs.com/package/@tailwindcss/postcss |
| @types/node | ^22 | https://www.npmjs.com/package/@types/node |
| @types/react | 19.2.14 | https://www.npmjs.com/package/@types/react |
| @types/react-dom | 19.2.3 | https://www.npmjs.com/package/@types/react-dom |
| postcss | ^8.5 | https://www.npmjs.com/package/postcss |
| tailwindcss | ^4.2.0 | https://www.npmjs.com/package/tailwindcss |
| tw-animate-css | 1.3.3 | https://www.npmjs.com/package/tw-animate-css |
| typescript | 5.7.3 | https://www.npmjs.com/package/typescript |

## 11. Licence
Projet pedagogique - M2 Brand Entertaining et Content Marketing
