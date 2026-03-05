"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, Store, Target, BarChart3, ArrowRight } from "lucide-react"

const features = [
  {
    icon: LayoutDashboard,
    title: "Unified Campaign Manager",
    description:
      "Create and launch campaigns across all advertising channels from a single, intuitive dashboard. No more juggling platforms.",
    tag: "Core",
  },
  {
    icon: Store,
    title: "Advertising Marketplace",
    description:
      "Access all available ad inventory in one place. Browse billboards, screens, radio slots, and more with transparent pricing.",
    tag: "Marketplace",
  },
  {
    icon: Target,
    title: "Smart Audience Targeting",
    description:
      "Target customers based on behavior, demographics, location, and interests. AI-powered optimization maximizes every dollar.",
    tag: "AI-Powered",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track performance and reach across every channel with real-time analytics, attribution modeling, and automated reporting.",
    tag: "Analytics",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
            Everything You Need to Advertise
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Powerful tools designed for modern advertising at scale.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 lg:p-10"
            >
              {/* Corner gradient on hover */}
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle, oklch(0.72 0.15 192 / 0.08), transparent)",
                }}
                aria-hidden="true"
              />

              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div className="inline-flex rounded-xl border border-primary/20 bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
