"use client"

import { motion } from "framer-motion"

export function CtaSection() {
  return (
    <section id="cta" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-primary/15 p-12 text-center md:p-20"
        >
          {/* Animated gradient border glow */}
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-30"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, oklch(0.72 0.15 192 / 0.3) 10%, transparent 20%, transparent 50%, oklch(0.72 0.15 192 / 0.2) 60%, transparent 70%)",
              animation: "orbit 8s linear infinite",
            }}
            aria-hidden="true"
          />

          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, oklch(0.72 0.15 192 / 0.1) 0%, oklch(0.09 0 0) 70%)",
            }}
            aria-hidden="true"
          />

          {/* Dot grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(oklch(0.72 0.15 192 / 0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
              Start Advertising Smarter
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground text-pretty">
              Join the next generation of advertising infrastructure. One platform, every channel, limitless reach.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="group relative overflow-hidden rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
              >
                <span className="relative z-10">Start Advertising</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[oklch(1_0_0_/_0.15)] to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </a>
              <a
                href="#"
                className="rounded-xl border border-border/60 px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-border hover:bg-secondary"
              >
                Request Demo
              </a>
            </div>

            <p className="mt-6 text-xs text-muted-foreground/60">
              No credit card required. Free tier available.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
