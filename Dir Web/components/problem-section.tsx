"use client"

import { motion } from "framer-motion"
import { Unplug, Shuffle, HelpCircle } from "lucide-react"

const problems = [
  {
    icon: Unplug,
    title: "Too Many Providers",
    description:
      "Businesses must negotiate with dozens of advertising providers across different channels, wasting time and budget.",
    stat: "12+",
    statLabel: "Avg. vendors per campaign",
  },
  {
    icon: Shuffle,
    title: "Disconnected Channels",
    description:
      "Advertising channels operate in silos with no unified view, making multi-channel campaigns nearly impossible to coordinate.",
    stat: "68%",
    statLabel: "Of budgets siloed by channel",
  },
  {
    icon: HelpCircle,
    title: "Guesswork Over Data",
    description:
      "Marketing decisions rely on guesswork rather than real-time data, leading to poor ROI and missed opportunities.",
    stat: "43%",
    statLabel: "Of ad spend wasted",
  },
]

export function ProblemSection() {
  return (
    <section className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-destructive/20 bg-destructive/5 px-4 py-1.5 text-xs font-medium tracking-widest text-destructive uppercase">
            The Problem
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
            Advertising Today Is Fragmented
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            The advertising landscape is broken into countless disconnected pieces.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card group rounded-2xl p-8 transition-all duration-300"
            >
              <div className="mb-5 inline-flex rounded-xl border border-border/50 bg-secondary/50 p-3">
                <problem.icon className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-destructive" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {problem.title}
              </h3>
              <p className="mb-5 leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
              <div className="border-t border-border/20 pt-4">
                <p className="text-2xl font-bold text-foreground">{problem.stat}</p>
                <p className="text-xs text-muted-foreground">{problem.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
