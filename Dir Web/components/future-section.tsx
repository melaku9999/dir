"use client"

import { motion } from "framer-motion"
import { PlaneTakeoff, Bike, Lightbulb, Code, ArrowRight } from "lucide-react"

const futureChannels = [
  {
    icon: PlaneTakeoff,
    title: "Drone Advertising",
    description:
      "Deploy drone-mounted displays for aerial advertising that captures attention in crowds and events.",
    coming: "Q3 2026",
  },
  {
    icon: Bike,
    title: "Mobile Ad Vehicles",
    description:
      "Reach audiences on the move with advertising motorcycles and vehicles equipped with digital screens.",
    coming: "Q4 2026",
  },
  {
    icon: Lightbulb,
    title: "Smart Billboards",
    description:
      "AI-powered billboards that adapt content in real time based on audience data and environmental conditions.",
    coming: "Q2 2026",
  },
  {
    icon: Code,
    title: "Web Advertising SDK",
    description:
      "Integrate Dir Web into any website with our lightweight SDK to monetize web traffic seamlessly.",
    coming: "Available Now",
  },
]

export function FutureSection() {
  return (
    <section id="developers" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            Innovation
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
            The Future of Advertising
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Pioneering next-generation advertising channels that don{"'"}t exist yet in your market.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {futureChannels.map((channel, i) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
            >
              {/* Animated corner glow */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle, oklch(0.72 0.15 192 / 0.12), transparent)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex rounded-xl border border-primary/20 bg-primary/10 p-2.5">
                    <channel.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      channel.coming === "Available Now"
                        ? "bg-[oklch(0.7_0.17_150_/_0.1)] text-[oklch(0.7_0.17_150)]"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {channel.coming}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {channel.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {channel.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
