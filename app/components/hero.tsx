"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Mail, MapPin } from "lucide-react"
import InteractiveCat from "./interactive-cat"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      twinkleSpeed: number
      colorType: "gold" | "cyan" | "normal"
    }[] = []

    for (let i = 0; i < 120; i++) {
      const rand = Math.random()
      let colorType: "gold" | "cyan" | "normal" = "normal"
      if (rand < 0.2) colorType = "gold"
      else if (rand < 0.4) colorType = "cyan"

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (colorType === "normal" ? 1.5 : 3) + 0.5,
        speedX: (Math.random() - 0.5) * (colorType === "normal" ? 1.2 : 1.8),
        speedY: (Math.random() - 0.5) * (colorType === "normal" ? 1.2 : 1.8),
        opacity: Math.random() * 0.6 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        colorType,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height

        // Twinkle/sparkle animation
        p.opacity += Math.sin(Date.now() * p.twinkleSpeed) * 0.015
        if (p.opacity < 0.1) p.opacity = 0.1
        if (p.opacity > 0.8) p.opacity = 0.8

        const isDark = document.documentElement.classList.contains("dark")

        if (p.colorType === "gold") {
          ctx.fillStyle = isDark
            ? `hsla(45, 100%, 65%, ${p.opacity})`
            : `hsla(38, 95%, 45%, ${p.opacity})`
        } else if (p.colorType === "cyan") {
          ctx.fillStyle = isDark
            ? `hsla(175, 90%, 60%, ${p.opacity})`
            : `hsla(173, 85%, 35%, ${p.opacity})`
        } else {
          ctx.fillStyle = isDark
            ? `hsla(210, 20%, 95%, ${p.opacity * 0.5})`
            : `hsla(222, 47%, 20%, ${p.opacity * 0.12})`
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-32 lg:flex-row lg:justify-between">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Vellore, Tamil Nadu
          </motion.div>

          <motion.h1
            className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ajmal{" "}
            <span className="text-primary">Sadhiq</span>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Computer Science Engineering student with a passion for building real-world applications using modern technologies.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105 active:scale-95"
            >
              View Projects
            </a>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-mono text-xs text-muted-foreground">CGPA 8.38</span>
            <span className="h-3 w-px bg-border" />
            <span className="font-mono text-xs text-muted-foreground">VIT 2023-27</span>
            <span className="h-3 w-px bg-border" />
            <span className="font-mono text-xs text-muted-foreground">B.Tech CSE</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <InteractiveCat />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
