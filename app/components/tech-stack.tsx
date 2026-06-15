"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

interface Skill {
  name: string
  level: number
  color: string
  category: string
  description: string
}

const skills: Skill[] = [
  { name: "Java", level: 75, color: "from-[#f89820] to-[#e76f00]", category: "Languages", description: "Primary language for DSA and OOP" },
  { name: "Python", level: 85, color: "from-[#3776ab] to-[#ffd43b]", category: "Languages", description: "ML, NLP, and scripting" },
  { name: "C", level: 80, color: "from-[#555555] to-[#a8b9cc]", category: "Languages", description: "Systems programming & embedded" },
  { name: "C++", level: 78, color: "from-[#00599c] to-[#659ad2]", category: "Languages", description: "Competitive programming" },
  { name: "HTML", level: 92, color: "from-[#e34f26] to-[#f06529]", category: "Web", description: "Semantic markup & accessibility" },
  { name: "CSS", level: 85, color: "from-[#1572b6] to-[#33a9dc]", category: "Web", description: "Responsive design & animations" },
  { name: "JavaScript", level: 78, color: "from-[#f7df1e] to-[#d4c500]", category: "Web", description: "ES6+, DOM manipulation, async" },
  { name: "Node.js", level: 70, color: "from-[#339933] to-[#68a063]", category: "Web", description: "Server-side development & APIs" },
  { name: "SQL", level: 82, color: "from-[#336791] to-[#4479a1]", category: "Databases", description: "Complex queries & optimization" },
  { name: "MySQL", level: 80, color: "from-[#4479a1] to-[#00758f]", category: "Databases", description: "Database design & management" },
  { name: "MongoDB", level: 70, color: "from-[#47a248] to-[#3e8e3e]", category: "Databases", description: "NoSQL document store" },
  { name: "Git", level: 60, color: "from-[#f05032] to-[#de4c36]", category: "Tools", description: "Version control & collaboration" },
  { name: "Docker", level: 65, color: "from-[#4a90d9] to-[#357abd]", category: "Tools", description: "Containerization & deployment" },
]

const categories = ["All", "Languages", "Web", "Databases", "Tools"]

export default function TechStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filtered = activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-sm text-primary">02. Tech Stack</p>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Technologies I work with
          </h2>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="group relative cursor-default overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Hover glow effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className={`absolute -inset-1 bg-gradient-to-r ${skill.color} opacity-[0.06] blur-xl`} />
              </div>

              <div className="relative z-10">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">{skill.name}</h3>
                  <motion.span
                    className="font-mono text-sm font-bold text-primary"
                    initial={{ opacity: 0 }}
                    animate={hoveredSkill === skill.name ? { opacity: 1 } : { opacity: 0.6 }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>

                {/* Progress bar */}
                <div className="mb-3 h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.2 + 0.05 * i, ease: "easeOut" }}
                  />
                </div>

                {/* Description - shows on hover */}
                <motion.p
                  className="overflow-hidden text-xs leading-relaxed text-muted-foreground"
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    hoveredSkill === skill.name
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.2 }}
                >
                  {skill.description}
                </motion.p>

                <div className="flex items-center gap-2">
                  <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {skill.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
