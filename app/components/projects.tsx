"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink, Github, Folder, Code } from "lucide-react"
import Image from "next/image"

interface Project {
  title: string
  description: string
  details: string[]
  tech: string[]
  image: string
  color: string
  github?: string
  live?: string
  category: "AI & ML" | "Web" | "Mobile"
}

interface OtherProject {
  title: string
  description: string
  tech: string[]
  color: string
  github?: string
  live?: string
  category: "AI & ML" | "Web" | "Mobile"
}

const featuredProjects: Project[] = [
  {
    title: "Planora — AI Floor Plan to 3D Visualizer",
    description:
      "A cutting-edge generative AI tool that transforms flat 2D floor plans into realistic, depth-aware 3D architectural renders.",
    details: [
      "Integrates Puter.js AI endpoints for visual processing and depth estimation",
      "Preserves exact structural layout boundaries, wall alignments, and lighting depth",
      "Features dynamic preview comparisons and direct export to high-fidelity PDF documentation"
    ],
    tech: ["React", "Vite", "React Router 7", "Puter.js AI", "jsPDF", "Tailwind CSS v4"],
    image: "/images/planora.png",
    color: "from-[#8B5CF6] to-[#EC4899]",
    github: "https://github.com/ajmalsadhiq/Planora",
    live: "https://planora-pi.vercel.app/",
    category: "AI & ML",
  },
  {
    title: "AI-Powered RAG Chatbot Suite",
    description:
      "A complete end-to-end Retrieval-Augmented Generation pipeline built to process complex structured HR/IT business policies.",
    details: [
      "Engineered automated file ingestion and parsing pipelines using n8n workflows",
      "Utilized Gemini API embeddings for vector indexing and structured context parsing",
      "Stored and queried document chunks using Qdrant vector database with high semantic relevance"
    ],
    tech: ["n8n", "Gemini API", "Qdrant Vector DB", "Python", "JSON"],
    image: "/images/rag-chatbot.png",
    color: "from-[#0D9488] to-[#3B82F6]",
    github: "https://github.com/ajmalsadhiq/RAG-Chatbot-with-n8n-Gemini-Qdrant",
    category: "AI & ML",
  },
  {
    title: "MSSPF Oman Pension Fund Portal",
    description:
      "A government-grade, multi-portal administrative portal representing the Military & Security Services Pension Fund.",
    details: [
      "Built complete bi-directional support with Arabic (RTL) and English (LTR) options",
      "Designed a luxurious government-themed palette matching military and national service colors",
      "Implemented reactive streams with RxJS to handle user dashboard and benefit actions"
    ],
    tech: ["Angular 21", "TypeScript", "Tailwind CSS v4", "RxJS", "RTL/LTR Layouts"],
    image: "/images/msspf.png",
    color: "from-[#9E9B46] to-[#3E321A]",
    github: "https://github.com/ajmalsadhiq/mssf-portal",
    live: "https://mssf-portal.vercel.app/",
    category: "Web",
  },
  {
    title: "AutoVault — Used Car Marketplace",
    description:
      "A comprehensive, location-aware mobile application for browsing, buying, and listing second-hand vehicles.",
    details: [
      "Utilized Expo Location API to calculate map proximity for localized car searches",
      "Configured Appwrite backend cloud functions for user management and secure databases",
      "Implemented visual manipulation utilities and packaged standard APK builds for Android"
    ],
    tech: ["React Native", "Expo", "Appwrite", "TypeScript", "NativeWind"],
    image: "/images/autovault.png",
    color: "from-[#F97316] to-[#EF4444]",
    github: "https://github.com/ajmalsadhiq/Auto-Vault",
    category: "Mobile",
  },
  {
    title: "MeetFlow — Video Conferencing Suite",
    description:
      "A rich virtual meeting platform designed with WebRTC capabilities for real-time remote collaboration.",
    details: [
      "Configured scheduled events, lobby rooms, recordings, and direct screen sharing panels",
      "Integrated Stream Video React SDK to manage low-latency audio-video streams",
      "Secured application flows using Clerk Authentication alongside custom guest mode entries"
    ],
    tech: ["Next.js 14", "Stream SDK", "Clerk Auth", "TypeScript", "Tailwind CSS"],
    image: "/images/meetflow.png",
    color: "from-[#6366F1] to-[#4F46E5]",
    github: "https://github.com/ajmalsadhiq/MeetFlow",
    live: "https://meet-flow-psi.vercel.app",
    category: "Web",
  },
  {
    title: "Hand Gesture Control Mouse",
    description:
      "A computer vision utility that maps real-time hand coordinates to mouse, system volume, and screen controls.",
    details: [
      "Tracks 21 hand joints using MediaPipe framework inside live webcam streams",
      "Configured gestures for moving, clicking, zooming, and capturing system screenshots",
      "Rendered overlay menus showing FPS indicators and activated gesture states"
    ],
    tech: ["Python", "MediaPipe", "OpenCV", "PyAutoGUI"],
    image: "/images/handgesture.png",
    color: "from-[#10B981] to-[#059669]",
    github: "https://github.com/ajmalsadhiq/handgesture-control-mouse",
    category: "AI & ML",
  },
]

const otherProjects: OtherProject[] = [
  {
    title: "Energy Wastage Detector",
    description:
      "An ML-powered anomaly detector that tracks appliance power consumption and flags issues using Isolation Forest models.",
    tech: ["Python", "Isolation Forest", "Flask", "Pandas", "Scikit-Learn"],
    color: "from-[#FBBF24] to-[#F59E0B]",
    github: "https://github.com/ajmalsadhiq/energy_wastage_detector",
    category: "AI & ML",
  },
  {
    title: "Ajmal.fm (Spotify Portfolio Player)",
    description:
      "A client-only, Spotify-inspired web music player that lists skills, experience, and projects as tracks.",
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    color: "from-[#1DB954] to-[#191414]",
    github: "https://github.com/ajmalsadhiq/resume-player",
    live: "https://resume-player.vercel.app/",
    category: "Web",
  },
  {
    title: "ResumeOS",
    description:
      "An interactive desktop OS themed digital portfolio containing console shells, windows, and responsive applications.",
    tech: ["Next.js", "React 19", "Framer Motion", "Tailwind CSS"],
    color: "from-[#3B82F6] to-[#1D4ED8]",
    github: "https://github.com/ajmalsadhiq/resumeos",
    live: "https://resumeos-puce.vercel.app/",
    category: "Web",
  },
  {
    title: "Budget Tracker v2.0",
    description:
      "Financial monitoring app with onboarding configurations, transaction controls, and Google Authentication credentials.",
    tech: ["Next.js", "Supabase", "Recharts", "TypeScript", "Tailwind CSS"],
    color: "from-[#10B981] to-[#047857]",
    github: "https://github.com/ajmalsadhiq/budget-tracker-v2.0",
    live: "https://benevolent-naiad-d653e2.netlify.app",
    category: "Web",
  },
  {
    title: "budgetTracker v1.0",
    description:
      "Student budget calculator tracking monthly expenses, category breakdowns, and weekly stats.",
    tech: ["HTML", "CSS", "JavaScript", "LocalStorage", "Chart.js"],
    color: "from-[#6B7280] to-[#374151]",
    github: "https://github.com/ajmalsadhiq/budgetTracker",
    category: "Web",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const filteredFeatured =
    activeCategory === "All"
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === activeCategory)

  const filteredOther =
    activeCategory === "All"
      ? otherProjects
      : otherProjects.filter((p) => p.category === activeCategory)

  const categories = ["All", "AI & ML", "Web", "Mobile"]

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-sm text-primary">03. Projects</p>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Things I have built
          </h2>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex flex-wrap gap-2"
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

        {/* Featured Projects Stack */}
        <div className="flex flex-col gap-24">
          {filteredFeatured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Other Projects Section */}
        {filteredOther.length > 0 && (
          <div className="mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h3 className="text-2xl font-bold text-foreground">Other Noteworthy Projects</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A selection of utilities, CLI scripts, and smaller web experiments
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredOther.map((project, i) => (
                <OtherProjectCard key={project.title} project={project} index={i} isInView={isInView} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project
  index: number
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const isReversed = index % 2 !== 0
  const [imgSrc, setImgSrc] = useState(project.image)

  useEffect(() => {
    setImgSrc(project.image)
  }, [project.image])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 * index }}
      className={`group relative flex flex-col gap-8 lg:flex-row ${isReversed ? "lg:flex-row-reverse" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Image Cover */}
      <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-muted aspect-video lg:aspect-auto lg:min-h-[350px]">
        <motion.div
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => {
              if (imgSrc.endsWith('.png')) {
                setImgSrc(project.image.replace('.png', '.svg'))
              }
            }}
          />
        </motion.div>

        {/* Action buttons on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-4 bg-black/45 backdrop-blur-[4px] z-20"
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl bg-background/95 px-4 py-2.5 text-xs font-semibold text-foreground shadow-xl border border-border/40 backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all duration-200"
            >
              <Github className="h-4 w-4" />
              Source Code
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl bg-background/95 px-4 py-2.5 text-xs font-semibold text-foreground shadow-xl border border-border/40 backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center">
        <motion.div
          animate={isHovered ? { x: isReversed ? -5 : 5 } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="mb-1 font-mono text-xs text-primary">Featured Project</p>
          <h3 className="mb-3 text-2xl font-bold text-foreground">{project.title}</h3>

          <div className="mb-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-primary/5">
            <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          <ul className="mb-5 space-y-2">
            {project.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {detail}
              </li>
            ))}
          </ul>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40 bg-card"
                aria-label="View source code"
              >
                <Github className="h-4 w-4" />
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40 bg-card"
                aria-label="View live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function OtherProjectCard({
  project,
  index,
  isInView,
}: {
  project: OtherProject
  index: number
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 min-h-[250px]"
    >
      {/* Background glow hover effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} opacity-[0.04] blur-xl`} />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div>
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="text-primary">
              <Code className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Github source"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Live demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <h4 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech list */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded bg-primary/5 px-2 py-0.5 font-mono text-[10px] font-medium text-primary"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="rounded bg-secondary px-2 py-0.5 text-[9px] font-bold text-muted-foreground uppercase tracking-wide">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* Slide-up / Fade-in Action Overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-background/90 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3.5 z-20"
        initial={{ opacity: 0, y: 15 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <span className="text-sm font-bold text-foreground mb-1">{project.title}</span>
        <div className="flex items-center gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 rounded-lg bg-card border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all duration-200 shadow-sm"
            >
              <Github className="h-4 w-4" />
              Source Code
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 rounded-lg bg-card border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all duration-200 shadow-sm"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

