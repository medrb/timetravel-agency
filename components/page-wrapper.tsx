"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageWrapperProps {
  children: React.ReactNode
  breadcrumbs: BreadcrumbItem[]
}

export function PageWrapper({ children, breadcrumbs }: PageWrapperProps) {
  return (
    <>
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="min-h-screen bg-background pt-24"
      >
        <div className="container mx-auto px-4 mb-8">
          <Breadcrumb items={breadcrumbs} />
        </div>
        {children}
      </motion.main>
      <Footer />
    </>
  )
}
