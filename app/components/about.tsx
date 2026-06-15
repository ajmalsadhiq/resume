"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Database, Globe, Terminal } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "Building end-to-end web applications with modern frameworks and clean architecture.",
  },
  {
    icon: Database,
    title: "Database Design",
    desc: "Designing efficient database schemas with SQL and MySQL for scalable applications.",
  },
  {
    icon: Globe,
    title: "Web Technologies",
    desc: "Crafting responsive interfaces with HTML, CSS, JavaScript, and Node.js.",
  },
  {
    icon: Terminal,
    title: "Problem Solving",
    desc: "Strong foundations in DSA, algorithms, and competitive programming in Java, C++, and Python.",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mb-2 font-mono text-sm text-primary">01. About Me</p>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Passionate about building things that matter
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            I am a dedicated Computer Science Engineering student at VIT with strong foundations in programming,
            data structures, databases, and web development. I love turning ideas into real-world applications
            and am always eager to learn and contribute to impactful software engineering projects.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
