"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * @component Header
 * @description Sticky top navigation with desktop/mobile menus and in-page section scrolling.
 * @state isScrolled, isMobileMenuOpen
 * @sideeffects Attaches a scroll listener to update header styling and handles cross-page anchor navigation.
 * @example
 * <Header />
 */
export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    if (pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${sectionId}`)
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: "Destinations", sectionId: "destinations" },
    { label: "Mon profil", sectionId: "quiz" },
    { label: "Le Train", sectionId: "le-train" },
    { label: "Réservation", sectionId: "reservation" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 glass-effect border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl">🚂</span>
            <span className="font-serif text-xl font-semibold text-primary">
              TimeTravel Agency
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.sectionId)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 text-sm tracking-wide cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => router.push("/reservation")}
              className="gold-gradient text-primary-foreground font-medium px-6 py-2 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
            >
              Monter à bord
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/98 glass-effect border-t border-primary/20"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.sectionId)}
                  className="text-foreground/80 hover:text-primary transition-colors py-2 text-lg text-left cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  router.push("/reservation")
                  setIsMobileMenuOpen(false)
                }}
                className="gold-gradient text-primary-foreground font-medium rounded-full mt-4 cursor-pointer"
              >
                Monter à bord
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
