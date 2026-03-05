"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CHANNELS, RECENT_ACTIVITY, GLOBAL_STATS } from "@/lib/channels-data"
import { Card } from "@/components/ui/card"
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Zap,
  Users,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function PlatformPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Unified Hub</h1>
          <p className="text-muted-foreground mt-1">Managed automated advertising across physical and digital surfaces.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search everything..." 
              className="bg-secondary/20 border border-border/40 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all w-64"
            />
          </div>
          <button className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Connect New Channel
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GLOBAL_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 border-border/40 bg-secondary/5 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                <stat.icon className="h-12 w-12" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className={cn(
                  "flex items-center text-xs font-medium px-2 py-0.5 rounded-full ",
                  stat.change.startsWith("+") ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                )}>
                  {stat.change.startsWith("+") ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Channel Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Connected Surfaces
            </h2>
            <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHANNELS.map((channel, i) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Link href={channel.id === 'billboards' ? `/platform/channels/billboards` : '#'}>
                  <Card className="p-5 border-border/40 bg-secondary/5 backdrop-blur-md hover:bg-secondary/10 transition-all cursor-pointer group h-full">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${channel.color}20` }}>
                            <channel.icon className="h-7 w-7" style={{ color: channel.color }} />
                          </div>
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-emerald-500" />
                        </div>
                        <div>
                          <h3 className="font-bold">{channel.name}</h3>
                          <p className="text-xs text-emerald-500 font-medium">{channel.stats.status}</p>
                        </div>
                      </div>
                      <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Inventory</p>
                        <p className="text-lg font-bold">{channel.stats.users}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Growth</p>
                        <p className="text-lg font-bold text-emerald-500">{channel.stats.growth}</p>
                      </div>
                    </div>

                    <div className="mt-6 h-1 w-full bg-secondary/30 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                      />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Live Activity
            </h2>
          </div>
          <Card className="border-border/40 bg-secondary/5 backdrop-blur-md p-0 overflow-hidden">
            <div className="divide-y divide-border/20">
              {RECENT_ACTIVITY.map((activity, i) => {
                const channel = CHANNELS.find(c => c.id === activity.channel)
                const Icon = channel?.icon || Zap
                return (
                  <motion.div 
                    key={activity.id} 
                    className="p-4 flex items-start gap-4 hover:bg-primary/5 transition-colors group cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <div className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center border border-border/40 bg-background group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" style={{ color: channel?.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold truncate">{activity.user}</p>
                        <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="text-primary font-medium">{activity.action}</span> via {channel?.name}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            <button className="w-full py-4 text-xs font-semibold text-muted-foreground hover:bg-secondary/10 transition-colors uppercase tracking-widest">
              View All History
            </button>
          </Card>

          {/* Integration Tip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Card className="p-5 border-primary/20 bg-primary/5 relative overflow-hidden group">
              <div className="absolute -top-6 -right-6 h-24 w-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h4 className="font-bold">Pro Tip</h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Connect your <span className="text-primary font-bold">API keys</span> in settings to enable real-time messaging across all 12+ supported channels.
                </p>
                <button className="mt-4 text-xs font-bold text-primary flex items-center gap-1 group/btn">
                  GET STARTED <ChevronRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
