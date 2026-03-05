"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 7, suffix: "+", label: "Ad Channels" },
  { value: 500, suffix: "K+", label: "Impressions Daily" },
  { value: 99, suffix: "%", label: "Uptime" },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const glowX = useTransform(springX, (v) => `${v}px`)
  const glowY = useTransform(springY, (v) => `${v}px`)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,150,150,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,150,150,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Mouse-following radial glow */}
      <motion.div
        className="pointer-events-none absolute h-[900px] w-[900px] rounded-full opacity-15"
        style={{
          x: glowX,
          y: glowY,
          background: "radial-gradient(circle, oklch(0.72 0.15 192 / 0.35) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Static centered glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
        style={{
          background: "radial-gradient(ellipse, oklch(0.72 0.15 192 / 0.2) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Logo reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex justify-center"
        >

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-5 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            National Advertising Infrastructure
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-4xl leading-[1.1] font-bold tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl"
        >
          Advertising Infrastructure{" "}
          <br className="hidden sm:block" />
          for the{" "}
          <span className="bg-gradient-to-r from-primary to-[oklch(0.65_0.18_175)] bg-clip-text text-transparent">
            Modern World
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl"
        >
          Run campaigns across billboards, radio, TV, web, and emerging advertising
          channels from a single platform. Unified reach, real-time analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#cta"
            className="group relative overflow-hidden rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
          >
            <span className="relative z-10">Start Advertising</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[oklch(1_0_0_/_0.15)] to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#how-it-works"
            className="rounded-xl border border-border/60 px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-border hover:bg-secondary"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Animated stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex items-center justify-center gap-8 sm:gap-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs tracking-wide text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  )
}
