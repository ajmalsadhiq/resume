"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/ajmalsadhiq",
    label: "GitHub",
    external: true,
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ajmal-sadhiq-puthanpura-ebrahim-012ab0291/",
    label: "LinkedIn",
    external: true,
  },
  {
    icon: Mail,
    href: "mailto:ajmalsadhiq7@gmail.com",
    label: "Email",
    external: false,
  },
]
  


export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground"
        >
          {new Date().getFullYear()} Ajmal Sadhiq. Built with Next.js & Tailwind CSS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary hover:shadow-sm"
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  )
}
