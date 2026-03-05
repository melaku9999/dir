"use client"

import { motion } from "framer-motion"
import { BillboardMap } from "@/components/billboard-map"
import { Card } from "@/components/ui/card"
import { 
  Box, 
  MapPin, 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  Clock, 
  Users, 
  Eye,
  Settings,
  Download,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function BillboardChannelPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-[oklch(0.63_0.2_25_/_0.15)] flex items-center justify-center">
            <Box className="h-10 w-10 text-[oklch(0.63_0.2_25)]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Digital Billboards</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase ring-1 ring-emerald-500/20">Active</span>
            </div>
            <p className="text-muted-foreground">Nationwide physical advertising infrastructure management.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl border border-border/40 hover:bg-secondary/40 transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('launch-campaign'))}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
          >
            <Zap className="h-4 w-4" />
            Launch New Campaign
          </button>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Inventory", value: "450 Units", icon: Box, subtext: "85% Occupancy", color: "oklch(0.63 0.2 25)" },
          { label: "Weekly Reach", value: "8.2M", icon: Users, subtext: "Across 12 Major Cities", color: "oklch(0.72 0.15 192)" },
          { label: "Avg. CPM", value: "$4.50", icon: TrendingUp, subtext: "Highly Competitive", color: "oklch(0.7 0.17 150)" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 border-border/40 bg-secondary/5 backdrop-blur-md relative overflow-hidden group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-background/50 border border-border/20 shadow-sm" style={{ color: stat.color }}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-3xl font-bold tracking-tight mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-2">{stat.subtext}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Immersive Map Visualization */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Real-time Location Network</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 border border-border/40 text-xs font-bold hover:bg-secondary/20 transition-all">
              <Filter className="h-3.5 w-3.5" />
              Filter Locations
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 border border-border/40 text-xs font-bold hover:bg-secondary/20 transition-all">
              <Download className="h-3.5 w-3.5" />
              Export Map
            </button>
          </div>
        </div>
        
        <BillboardMap />
      </div>

      {/* Inventory & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 border-border/40 bg-secondary/5 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Upcoming Content Slots
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-background/40 border border-border/15 group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[oklch(0.63_0.2_25_/_0.1)] flex items-center justify-center">
                    <Eye className="h-5 w-5 text-[oklch(0.63_0.2_25)]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Billboard #{820 + i} - Main St.</p>
                    <p className="text-xs text-muted-foreground">Today at {10 + i}:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-primary">$120/hr</span>
                  <button className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 border-border/40 bg-secondary/5 backdrop-blur-md flex flex-col justify-center">
          <div className="text-center max-w-sm mx-auto space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Scale Your Physical Presence</h3>
            <p className="text-muted-foreground">
              Deploy campaigns across hundreds of screens with a single click. Our AI optimizes content delivery based on real-time pedestrian and traffic data.
            </p>
            <div className="pt-6">
              <button className="w-full py-4 rounded-2xl bg-foreground text-background font-bold hover:opacity-90 transition-all shadow-xl shadow-foreground/10">
                View Advanced Analytics
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
