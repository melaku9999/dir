"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  Calendar,
  MapPin,
  TrendingUp,
  Zap,
  Clock,
  ArrowUpRight,
  Eye,
} from "lucide-react"

export function DashboardSection() {
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
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            Dashboard
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
            Your Command Center
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Manage all advertising operations from a powerful, unified dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Multi-layer glow behind dashboard */}
          <div
            className="pointer-events-none absolute -inset-8 rounded-3xl opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, oklch(0.72 0.15 192 / 0.12) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="glass-card relative overflow-hidden rounded-2xl border border-border/40">
            {/* Dashboard header bar */}
            <div className="flex items-center gap-2 border-b border-border/20 px-5 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.63_0.2_25)]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.15_85)]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.17_150)]" />
              <div className="ml-4 flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded bg-primary/20" />
                <span className="text-xs font-medium text-muted-foreground">
                  Dir Web Dashboard
                </span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="rounded bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                  Live
                </span>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {/* Top stats row */}
              <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {[
                  {
                    label: "Active Campaigns",
                    value: "24",
                    icon: Zap,
                    change: "+3",
                    positive: true,
                  },
                  {
                    label: "Total Impressions",
                    value: "2.4M",
                    icon: Eye,
                    change: "+12.4%",
                    positive: true,
                  },
                  {
                    label: "Channels Active",
                    value: "7",
                    icon: MapPin,
                    change: "+1",
                    positive: true,
                  },
                  {
                    label: "Avg. Engagement",
                    value: "4.8%",
                    icon: TrendingUp,
                    change: "+0.3%",
                    positive: true,
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="rounded-xl border border-border/20 bg-secondary/20 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <stat.icon className="h-4 w-4 text-muted-foreground/60" />
                      <span className="flex items-center gap-0.5 text-[10px] font-medium text-[oklch(0.7_0.17_150)]">
                        <ArrowUpRight className="h-3 w-3" />
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground md:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Main content area */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* Chart area */}
                <div className="rounded-xl border border-border/20 bg-secondary/15 p-4 md:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">
                        Campaign Performance
                      </h4>
                      <p className="text-[11px] text-muted-foreground">Impressions over time</p>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="rounded-md border border-border/20 px-2.5 py-1 text-[10px] text-muted-foreground">
                        7d
                      </span>
                      <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                        30d
                      </span>
                      <span className="rounded-md border border-border/20 px-2.5 py-1 text-[10px] text-muted-foreground">
                        90d
                      </span>
                    </div>
                  </div>
                  {/* Chart with gradient bars */}
                  <div className="flex h-44 items-end gap-1.5">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 85, 75, 95, 68, 72, 88].map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                          className="relative flex-1 overflow-hidden rounded-t"
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(to top, oklch(0.72 0.15 192 / 0.5), oklch(0.72 0.15 192 / 0.15))`,
                            }}
                          />
                          <div
                            className="absolute inset-x-0 bottom-0 h-px"
                            style={{ background: "oklch(0.72 0.15 192 / 0.6)" }}
                          />
                        </motion.div>
                      )
                    )}
                  </div>
                  {/* X-axis labels */}
                  <div className="mt-2 flex justify-between">
                    <span className="text-[9px] text-muted-foreground/50">Mar 1</span>
                    <span className="text-[9px] text-muted-foreground/50">Mar 8</span>
                    <span className="text-[9px] text-muted-foreground/50">Mar 15</span>
                    <span className="text-[9px] text-muted-foreground/50">Mar 22</span>
                  </div>
                </div>

                {/* Scheduling panel */}
                <div className="rounded-xl border border-border/20 bg-secondary/15 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground/60" />
                      <h4 className="text-sm font-medium text-foreground">
                        Schedule
                      </h4>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Today</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {[
                      {
                        name: "Billboard Campaign",
                        time: "9:00 AM",
                        status: "Live",
                        channel: "Outdoor",
                      },
                      {
                        name: "Radio Spots",
                        time: "12:00 PM",
                        status: "Scheduled",
                        channel: "Audio",
                      },
                      {
                        name: "TV Ad Burst",
                        time: "6:00 PM",
                        status: "Pending",
                        channel: "Broadcast",
                      },
                      {
                        name: "Web Retargeting",
                        time: "All Day",
                        status: "Live",
                        channel: "Digital",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                        className="flex items-center justify-between rounded-lg border border-border/15 bg-background/40 px-3 py-2.5"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-foreground">
                            {item.name}
                          </p>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <Clock className="h-2.5 w-2.5 text-muted-foreground/60" />
                            <p className="text-[10px] text-muted-foreground">
                              {item.time}
                            </p>
                            <span className="text-[10px] text-muted-foreground/40">
                              {"·"}
                            </span>
                            <span className="text-[10px] text-muted-foreground/60">
                              {item.channel}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            item.status === "Live"
                              ? "bg-[oklch(0.7_0.17_150_/_0.1)] text-[oklch(0.7_0.17_150)]"
                              : item.status === "Scheduled"
                                ? "bg-primary/10 text-primary"
                                : "bg-[oklch(0.8_0.15_85_/_0.1)] text-[oklch(0.8_0.15_85)]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
