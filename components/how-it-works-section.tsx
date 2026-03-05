"use client"

import { motion } from "framer-motion"
import { PenLine, Layers, Rocket } from "lucide-react"

const steps = [
  {
    icon: PenLine,
    step: "01",
    title: "Create Your Campaign",
    description:
      "Define your campaign goals, budget, and creative assets in minutes with our intuitive builder.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Choose Advertising Channels",
    description:
      "Select from billboards, radio, TV, digital displays, mobile ads, drones, and web placements.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Track Performance",
    description:
      "Go live across all channels simultaneously and monitor results with real-time analytics.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative px-6 py-24 lg:py-32">
      {/* Subtle horizontal gradient divider at top */}
      <div
        className="pointer-events-none absolute top-0 right-[10%] left-[10%] h-px"
        style={{
          background: "linear-gradient(to right, transparent, oklch(0.72 0.15 192 / 0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
            Three Steps to Smarter Advertising
          </h2>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Connecting line between steps */}
          <div
            className="pointer-events-none absolute top-[52px] right-[16.67%] left-[16.67%] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.72 0.15 192 / 0.25), oklch(0.72 0.15 192 / 0.25), transparent)",
            }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-8">
                <div className="flex h-[53px] w-[53px] items-center justify-center rounded-2xl border border-primary/20 bg-primary/5">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-background bg-primary text-[11px] font-bold text-primary-foreground">
                  {step.step}
                </span>
                {/* Soft glow */}
                <div
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-40"
                  style={{
                    background: "radial-gradient(circle, oklch(0.72 0.15 192 / 0.1) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="max-w-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
