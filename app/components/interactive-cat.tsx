"use client"

import React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"

type CatMood = "idle" | "happy" | "tickled" | "sleepy"

export default function InteractiveCat() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [headRotation, setHeadRotation] = useState(0)
  const [mood, setMood] = useState<CatMood>("idle")
  const [petCount, setPetCount] = useState(0)
  const [showHearts, setShowHearts] = useState(false)
  const [showStars, setShowStars] = useState(false)
  const [tailWag, setTailWag] = useState(false)
  const bodyControls = useAnimation()
  const moodTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const maxOffset = 6
      const distance = Math.sqrt(dx * dx + dy * dy)
      const normalizedX = (dx / Math.max(distance, 1)) * Math.min(distance / 20, maxOffset)
      const normalizedY = (dy / Math.max(distance, 1)) * Math.min(distance / 20, maxOffset)
      setEyeOffset({ x: normalizedX, y: normalizedY })
      const headRot = (dx / window.innerWidth) * 15
      setHeadRotation(headRot)
    },
    [],
  )

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handlePet = () => {
    setPetCount((p) => p + 1)
    setShowHearts(true)
    setMood("happy")
    setTailWag(true)
    bodyControls.start({
      scale: [1, 1.05, 0.98, 1.02, 1],
      transition: { duration: 0.5 },
    })

    if (moodTimeout.current) clearTimeout(moodTimeout.current)
    moodTimeout.current = setTimeout(() => {
      setShowHearts(false)
      setTailWag(false)
      setMood("idle")
    }, 2000)
  }

  const handleTickle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowStars(true)
    setMood("tickled")
    bodyControls.start({
      rotate: [-2, 2, -3, 3, -1, 1, 0],
      transition: { duration: 0.6 },
    })

    if (moodTimeout.current) clearTimeout(moodTimeout.current)
    moodTimeout.current = setTimeout(() => {
      setShowStars(false)
      setMood("idle")
    }, 2000)
  }

  const getMouthPath = () => {
    switch (mood) {
      case "happy":
        return "M 35 58 Q 42 66 50 58"
      case "tickled":
        return "M 33 56 Q 42 68 52 56"
      case "sleepy":
        return "M 37 58 Q 42 60 48 58"
      default:
        return "M 37 57 Q 42 62 48 57"
    }
  }

  const getEyeShape = () => {
    if (mood === "tickled") return { scaleY: 0.3, scaleX: 1.2 }
    if (mood === "happy") return { scaleY: 0.5, scaleX: 1.1 }
    return { scaleY: 1, scaleX: 1 }
  }

  return (
    <div ref={containerRef} className="relative inline-block select-none">
      {/* Floating hearts on pet */}
      {showHearts &&
        Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`heart-${petCount}-${i}`}
            className="pointer-events-none absolute text-lg"
            initial={{
              opacity: 1,
              x: 40 + Math.random() * 40,
              y: 20,
              scale: 0,
            }}
            animate={{
              opacity: 0,
              y: -60 - Math.random() * 40,
              x: 20 + Math.random() * 80,
              scale: 1,
              rotate: Math.random() * 40 - 20,
            }}
            transition={{ duration: 1.2, delay: i * 0.1 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--primary))" className="opacity-80">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}

      {/* Sparkle stars on tickle */}
      {showStars &&
        Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="pointer-events-none absolute"
            initial={{
              opacity: 1,
              x: 20 + Math.random() * 80,
              y: 20 + Math.random() * 60,
              scale: 0,
            }}
            animate={{
              opacity: 0,
              scale: [0, 1.8, 0],
              y: [20 + Math.random() * 60, -20 - Math.random() * 30],
              x: [20 + Math.random() * 80, 20 + Math.random() * 80 + (Math.random() - 0.5) * 40],
              rotate: 360,
            }}
            transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }}
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill={i % 3 === 0 ? "hsl(45, 100%, 60%)" : i % 3 === 1 ? "hsl(175, 90%, 55%)" : "hsl(var(--primary))"} 
              className="opacity-95"
            >
              <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8 2.4-7.2-6-4.8h7.6z" />
            </svg>
          </motion.div>
        ))}

      {/* Speech bubble */}
      {mood !== "idle" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground shadow-lg border border-border"
        >
          {mood === "happy" && "Purrrr~"}
          {mood === "tickled" && "MMMmmmm💕"}
        </motion.div>
      )}

      <motion.div
        animate={bodyControls}
        style={{ cursor: "pointer" }}
        className="relative"
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 85 90"
          onClick={handlePet}
          onDoubleClick={handleTickle}
          aria-label="Interactive cat mascot. Click to pet, double-click to tickle."
          role="img"
        >
          {/* Tail */}
          <motion.path
            d="M 68 70 Q 80 60 78 45 Q 76 35 72 38"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="3"
            strokeLinecap="round"
            animate={
              tailWag
                ? {
                    d: [
                      "M 68 70 Q 80 60 78 45 Q 76 35 72 38",
                      "M 68 70 Q 85 55 82 42 Q 80 32 76 36",
                      "M 68 70 Q 75 65 74 48 Q 72 38 68 40",
                      "M 68 70 Q 80 60 78 45 Q 76 35 72 38",
                    ],
                  }
                : {}
            }
            transition={tailWag ? { duration: 0.4, repeat: 4, ease: "easeInOut" } : {}}
          />

          {/* Body */}
          <motion.ellipse
            cx="42"
            cy="65"
            rx="22"
            ry="18"
            className="fill-card stroke-foreground"
            strokeWidth="2"
            animate={{
              ry: [18, 18.5, 18],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Head */}
          <motion.g style={{ rotate: headRotation, transformOrigin: "42px 40px" }}>
            {/* Left ear */}
            <path
              d="M 24 28 L 18 8 L 34 22 Z"
              className="fill-card stroke-foreground"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M 23 24 L 20 12 L 31 22 Z" className="fill-primary/30" />

            {/* Right ear */}
            <path
              d="M 60 28 L 66 8 L 50 22 Z"
              className="fill-card stroke-foreground"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M 61 24 L 64 12 L 53 22 Z" className="fill-primary/30" />

            {/* Head circle */}
            <circle cx="42" cy="38" r="20" className="fill-card stroke-foreground" strokeWidth="2" />

            {/* Left eye */}
            <motion.g
              animate={{ x: eyeOffset.x, y: eyeOffset.y }}
              transition={{ duration: 0.1 }}
            >
              <motion.ellipse
                cx={34}
                cy={36}
              rx="4"
              ry="5"
              className="fill-foreground"
              animate={getEyeShape()}
              transition={{ duration: 0.2 }}
            />
            <circle
              cx={35}
              cy={36}
              r="1.5"
              className="fill-card"
            />
          </motion.g>

            

            {/* Right eye */}

            <motion.g
              animate={{ x: eyeOffset.x, y: eyeOffset.y }}
              transition={{ duration: 0.1 }}
            >
              <motion.ellipse
                cx={50}
                cy={36}
              rx="4"
              ry="5"
              className="fill-foreground"
              animate={getEyeShape()}
              transition={{ duration: 0.2 }}
            />
            <circle
              cx={51}
              cy={36}
              r="1.5"
              className="fill-card"
            />
          </motion.g>


            {/* Nose */}
            <path d="M 40 48 L 42 51 L 44 48 Z" className="fill-primary" />

            {/* Mouth */}
            <motion.path
              d={getMouthPath()}
              fill="none"
              className="stroke-foreground"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ d: getMouthPath() }}
              transition={{ duration: 0.3 }}
            />

            {/* Whiskers */}
            <line x1="15" y1="44" x2="30" y2="46" className="stroke-foreground" strokeWidth="1" opacity="0.5" />
            <line x1="15" y1="48" x2="30" y2="48" className="stroke-foreground" strokeWidth="1" opacity="0.5" />
            <line x1="54" y1="46" x2="69" y2="44" className="stroke-foreground" strokeWidth="1" opacity="0.5" />
            <line x1="54" y1="48" x2="69" y2="48" className="stroke-foreground" strokeWidth="1" opacity="0.5" />

            {/* Blush when happy */}
            {(mood === "happy" || mood === "tickled") && (
              <>
                <circle cx="26" cy="44" r="4" className="fill-primary/20" />
                <circle cx="58" cy="44" r="4" className="fill-primary/20" />
              </>
            )}
          </motion.g>

          {/* Paws */}
          <ellipse cx="30" cy="80" rx="7" ry="4" className="fill-card stroke-foreground" strokeWidth="1.5" />
          <ellipse cx="54" cy="80" rx="7" ry="4" className="fill-card stroke-foreground" strokeWidth="1.5" />
        </svg>
      </motion.div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Click to pet &middot; Double-click to tickle
      </p>
    </div>
  )
}
