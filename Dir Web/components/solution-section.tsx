"use client"

import { motion } from "framer-motion"
import {
  Monitor,
  Radio,
  Tv,
  Smartphone,
  Globe,
  PlaneTakeoff,
  ScreenShare,
} from "lucide-react"

const channels = [
  { icon: Monitor, label: "Billboards", angle: 0 },
  { icon: Radio, label: "Radio", angle: 51.4 },
  { icon: Tv, label: "TV", angle: 102.8 },
  { icon: Smartphone, label: "Mobile Ads", angle: 154.3 },
  { icon: PlaneTakeoff, label: "Drone Ads", angle: 205.7 },
  { icon: Globe, label: "Web SDK", angle: 257.1 },
  { icon: ScreenShare, label: "Digital Displays", angle: 308.6 },
]

export function SolutionSection() {
  const outerRadius = 200
  const innerRadius = 140

  return (
    <section id="platform" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            The Solution
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
            One Platform for Every Channel
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Connect to any advertising surface through a single unified platform.
          </p>
        </motion.div>

        {/* Orbital diagram */}
        <div className="relative mx-auto flex h-[380px] w-[380px] items-center justify-center sm:h-[480px] sm:w-[480px] md:h-[540px] md:w-[540px]">
          {/* Outer orbital ring - slowly rotating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="animate-orbit absolute inset-6 rounded-full border border-dashed border-primary/10 sm:inset-8 md:inset-10"
            aria-hidden="true"
          />

          {/* Inner orbital ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="absolute inset-20 rounded-full border border-border/15 sm:inset-28 md:inset-32"
            aria-hidden="true"
          />

          {/* Glow behind center */}
          <div
            className="pointer-events-none absolute h-40 w-40 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.72 0.15 192 / 0.12) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Center node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            className="stat-glow relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm sm:h-24 sm:w-24"
          >
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase sm:text-xs">
              Dir Web
            </span>
          </motion.div>

          {/* Channel nodes */}
          {channels.map((channel, i) => {
            // Pre-compute stable rounded positions to avoid hydration mismatch
            const rad = (channel.angle * Math.PI) / 180
            const xPercent = Math.round(Math.cos(rad) * 4200) / 100
            const yPercent = Math.round(Math.sin(rad) * 4200) / 100
            const top = `${Math.round((50 + yPercent) * 100) / 100}%`
            const left = `${Math.round((50 + xPercent) * 100) / 100}%`
            const lineX = Math.round(-xPercent * 540) / 100
            const lineY = Math.round(-yPercent * 540) / 100

            return (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08, type: "spring" }}
                className="absolute flex flex-col items-center gap-1.5"
                style={{
                  top,
                  left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Dashed connection line to center */}
                <svg
                  className="pointer-events-none absolute -z-10 overflow-visible"
                  width="2"
                  height="2"
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={lineX}
                    y2={lineY}
                    stroke="oklch(0.72 0.15 192 / 0.12)"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                  />
                </svg>
                <div className="glass-card rounded-xl p-2.5 transition-all duration-300 sm:p-3">
                  <channel.icon className="h-4 w-4 text-foreground/70 sm:h-5 sm:w-5" />
                </div>
                <span className="hidden text-[10px] font-medium text-muted-foreground sm:block">
                  {channel.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
