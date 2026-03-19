import Link from "next/link"

const footerLinks = {
  destinations: [
    { label: "Paris 1889", href: "/destinations/paris-1889" },
    { label: "Florence 1504", href: "/destinations/florence" },
    { label: "Crétacé -66M ans", href: "/destinations/cretace" },
  ],
  train: [
    { label: "Notre histoire", href: "/le-train/notre-histoire" },
    { label: "Le Train Temporel", href: "/le-train/train-temporel" },
    { label: "Sécurité", href: "/le-train/securite" },
    { label: "Équipement", href: "/le-train/equipement" },
  ],
  legal: [
    { label: "Mentions légales", href: "/legal/mentions-legales" },
    { label: "CGV", href: "/legal/cgv" },
    { label: "Confidentialité", href: "/legal/confidentialite" },
    { label: "Contact", href: "/contact" },
  ],
}

function FooterTrain() {
  return (
    <div className="train-emoji" aria-hidden="true">
      🚂🚃🚃🚃💨
    </div>
  )
}

/**
 * @component Footer
 * @description Global site footer with destination, train, legal navigation, and animated train strip.
 * @props None
 * @sideeffects No React side effects; renders static link groups and decorative animation hooks via CSS.
 * @example
 * <Footer />
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-secondary/30 pt-24">
      {/* Top border decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🚂</span>
              <span className="font-serif text-xl font-semibold text-primary">
                TimeTravel Agency
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Voyagez sans limites, revenez à temps.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Destinations
            </h3>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Le Train */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Le Train
            </h3>
            <ul className="space-y-3">
              {footerLinks.train.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Légal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-primary/20 py-4 text-center">
          <p className="text-center text-muted-foreground text-sm">
            © 2024 TimeTravel Agency — Tous droits dans tous les temps
          </p>
        </div>
      </div>

      {/* Train animation strip */}
      <div className="relative w-full h-11 overflow-hidden border-t border-primary/10">
        <FooterTrain />
      </div>
    </footer>
  )
}
