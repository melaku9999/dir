"use client"

import { motion } from "framer-motion"

const partners = [
  "MediaCorp",
  "AdVision",
  "ScreenNet",
  "BroadReach",
  "SignalAds",
  "OmniMedia",
  "NetDisplay",
  "UrbanAds",
]

export function TrustSection() {
  return (
    <section className="relative border-y border-border/20 py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8 text-center"
      >
        <p className="text-xs tracking-widest text-muted-foreground/60 uppercase">
          Trusted by leading advertising networks
        </p>
      </motion.div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-40 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-40 bg-gradient-to-l from-background to-transparent" />

        <div className="animate-marquee flex items-center gap-20 whitespace-nowrap">
          {[...partners, ...partners].map((partner, i) => (
            <span
              key={i}
              className="shrink-0 text-lg font-semibold tracking-widest text-muted-foreground/20 uppercase transition-colors duration-300 hover:text-muted-foreground/40"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
