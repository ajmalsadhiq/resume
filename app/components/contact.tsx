"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ajmalsadhiq7@gmail.com",
    href: "mailto:ajmalsadhiq7@gmail.com",
  },
  
  {
    icon: MapPin,
    label: "Location",
    value: "Vellore, Tamil Nadu",
    href: null,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Decorative background glow orbs */}
      <div className="pointer-events-none absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[120px] dark:bg-primary/5" />
      <div className="pointer-events-none absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-[120px] dark:bg-secondary/5" />

      {/* Spread greenish-cyan (#59C9B7) glow radiating from all sides behind the box */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[1050px] max-w-full rounded-full bg-[#59C9B7]/20 blur-[150px] opacity-95" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] max-w-full rounded-full bg-[#59C9B7]/15 blur-[100px] opacity-90" />

      <div className="mx-auto max-w-5xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-[#59C9B7]/25 bg-[#111318] p-8 md:p-12 lg:p-16 shadow-[0_0_60px_rgba(89,201,183,0.22),0_0_100px_rgba(89,201,183,0.15)] hover:shadow-[0_0_80px_rgba(89,201,183,0.35),0_0_120px_rgba(89,201,183,0.22)] transition-all duration-500"
        >
          {/* Top border neon glow - vibrant greenish-cyan gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#59C9B7] to-transparent opacity-85" />

          {/* Section Header */}
          <div className="mb-16 text-center">
            <p className="mb-2 font-mono text-sm text-[#59C9B7]">05. Contact</p>
            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
              {"Let's work together"}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-sm text-slate-400">
              {"I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + 0.1 * i }}
                  className="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-[#59C9B7]/40 hover:shadow-md hover:shadow-[#59C9B7]/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#59C9B7]/10 text-[#59C9B7] transition-colors group-hover:bg-[#59C9B7] group-hover:text-black">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium text-white transition-colors hover:text-[#59C9B7]"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-white">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-4 lg:col-span-3"
              action="https://formspree.io/f/xvzbzqel"
              method="POST"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#59C9B7] focus:ring-1 focus:ring-[#59C9B7]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required 
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#59C9B7] focus:ring-1 focus:ring-[#59C9B7]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-300">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#59C9B7] focus:ring-1 focus:ring-[#59C9B7]"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required 
                  className="w-full resize-none rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#59C9B7] focus:ring-1 focus:ring-[#59C9B7]"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#59C9B7] px-6 py-3 text-sm font-semibold text-black transition-shadow hover:shadow-lg hover:shadow-[#59C9B7]/30"
              >
                <Send className="h-4 w-4" />
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
