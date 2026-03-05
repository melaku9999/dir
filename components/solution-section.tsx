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
  Zap,
} from "lucide-react"

const channels = [
  { icon: Monitor, label: "Billboards", angle: 0 },
  { icon: Radio, label: "Radio", angle: 45 },
  { icon: Tv, label: "TV", angle: 90 },
  { icon: Smartphone, label: "Mobile Ads", angle: 135 },
  { icon: PlaneTakeoff, label: "Drone Ads", angle: 180 },
  { icon: Globe, label: "Web SDK", angle: 225 },
  { icon: ScreenShare, label: "Digital Displays", angle: 270 },
  { icon: Zap, label: "Live Data", angle: 315 }, // Added one more for symmetry in the "web"
]

export function SolutionSection() {
  return (
    <section id="platform" className="relative px-6 py-24 lg:py-32 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
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
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
            One Platform for Every Channel
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-lg leading-relaxed">
            Connect to any advertising surface through a single unified platform. 
            Experience the power of total cross-channel synchronization.
          </p>
        </motion.div>

        {/* Spider Web Visualization Container */}
        <div className="relative mx-auto flex h-[500px] w-[500px] items-center justify-center sm:h-[600px] sm:w-[600px]">
          
          {/* Interactive Network SVG Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" aria-hidden="true">
            <defs>
              <radialGradient id="line-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Spider Web Radial Lines (Main) */}
            {channels.map((channel, i) => {
              const rad = (channel.angle * Math.PI) / 180
              const x2 = 50 + Math.cos(rad) * 45
              const y2 = 50 + Math.sin(rad) * 45
              return (
                <motion.line
                  key={`radial-${i}`}
                  x1="50%"
                  y1="50%"
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="oklch(0.72 0.15 192 / 0.15)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                />
              )
            })}

            {/* Perimeter Connections (The "Web") */}
            {[0.2, 0.35, 0.45].map((scale, layerIndex) => (
              <motion.path
                key={`layer-${layerIndex}`}
                d={channels.map((channel, i) => {
                  const rad = (channel.angle * Math.PI) / 180
                  const x = 50 + Math.cos(rad) * (45 * scale)
                  const y = 50 + Math.sin(rad) * (45 * scale)
                  return (i === 0 ? "M" : "L") + ` ${x}% ${y}%`
                }).join(" ") + " Z"}
                fill="none"
                stroke="oklch(0.72 0.15 192 / 0.1)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8 + layerIndex * 0.2 }}
              />
            ))}

            {/* Dynamic Pulses (Data Flow) */}
            {channels.map((channel, i) => {
              const rad = (channel.angle * Math.PI) / 180
              const x2 = 50 + Math.cos(rad) * 45
              const y2 = 50 + Math.sin(rad) * 45
              return (
                <motion.circle
                  key={`pulse-${i}`}
                  r="2"
                  fill="var(--color-primary)"
                  filter="url(#glow)"
                  initial={{ cx: "50%", cy: "50%", opacity: 0 }}
                  animate={{ 
                    cx: ["50%", `${x2}%`], 
                    cy: ["50%", `${y2}%`],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2 + Math.random(), 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              )
            })}
          </svg>

          {/* Center Hub Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative z-20 flex h-28 w-28 flex-col items-center justify-center rounded-[2rem] border border-primary/40 bg-background/40 backdrop-blur-xl shadow-[0_0_50px_rgba(var(--color-primary),0.2)] group hover:border-primary/60 transition-colors sm:h-32 sm:w-32"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[2px] rounded-[1.8rem] border border-dashed border-primary/20" 
            />
            <span className="relative z-10 text-xs font-black tracking-[0.2em] text-primary uppercase sm:text-sm">
              DIR WEB
            </span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary/40 rounded-full blur-[2px]" />
          </motion.div>

          {/* Channel Perimeter Nodes */}
          {channels.map((channel, i) => {
            const rad = (channel.angle * Math.PI) / 180
            const dist = 45 // Percentage from center
            const x = 50 + Math.cos(rad) * dist
            const y = 50 + Math.sin(rad) * dist

            return (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1, type: "spring" }}
                className="absolute flex flex-col items-center group cursor-pointer"
                style={{
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Node Box */}
                <div className="glass-card relative z-10 rounded-2xl p-3.5 border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-300 shadow-xl sm:p-4">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <channel.icon className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors sm:h-6 sm:w-6" />
                </div>
                
                {/* Label Overlay */}
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-10 whitespace-nowrap px-3 py-1.5 bg-background/80 backdrop-blur-md border border-white/5 rounded-full text-[10px] font-bold text-white shadow-2xl pointer-events-none sm:text-xs"
                >
                  {channel.label.toUpperCase()}
                </motion.div>

                {/* Connective Glow dot */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                   <div className="h-12 w-12 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            )
          })}

          {/* Subtle Rotating Orbs */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 border border-primary/20 h-4 w-4 rounded-full" />
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border border-primary/20 h-4 w-4 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
