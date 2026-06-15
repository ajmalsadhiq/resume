"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Award, BookOpen } from "lucide-react"

const certifications = [
  {
    title: "Oracle Generative AI Certification",
    issuer: "Oracle",
    description: "Generative AI fundamentals, LLMs, enterprise AI use cases",
  },
  {
    title: "Google Analytics Certification",
    issuer: "Google",
    description: "Web analytics, user behavior tracking, traffic analysis, reporting insights",
  },
]

const coursework = [
  "Data Structures",
  "Algorithms",
  "DBMS",
  "Operating Systems",
  "Software Engineering",
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mb-2 font-mono text-sm text-primary">04. Education & Certifications</p>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Academic Background
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">B.Tech in Computer Science</h3>
                  <p className="text-sm text-primary">Vellore Institute of Technology</p>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-6">
                <div>
                  <p className="font-mono text-2xl font-bold text-foreground">8.38</p>
                  <p className="text-xs text-muted-foreground">CGPA</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-mono text-lg font-semibold text-foreground">2023 - 2027</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
              </div>

              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <div className="flex flex-col gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + 0.1 * i }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{cert.title}</h3>
                      <p className="text-xs text-primary">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
