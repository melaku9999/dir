"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { CHANNELS } from "@/lib/channels-data"
import { LayoutDashboard, Settings, HelpCircle, Bell, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function PlatformSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r border-border/40 bg-secondary/5 backdrop-blur-xl lg:flex h-full w-72 flex-col">
      <div className="flex h-20 items-center px-6 border-b border-border/20">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">D</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Dir Web
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        <div>
          <h3 className="px-2 mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Menu
          </h3>
          <nav className="space-y-1">
            <SidebarItem 
              href="/platform" 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={pathname === "/platform"} 
            />
            <SidebarItem 
              href="/platform/notifications" 
              icon={Bell} 
              label="Notifications" 
              badge="12"
            />
            <SidebarItem 
              href="/platform/search" 
              icon={Search} 
              label="Global Search" 
            />
          </nav>
        </div>

        <div>
          <h3 className="px-2 mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Channels
          </h3>
          <nav className="space-y-1">
            {CHANNELS.map((channel) => (
              <SidebarItem
                key={channel.id}
                href={`/platform/channels/${channel.id}`}
                icon={channel.icon}
                label={channel.name}
                color={channel.color}
              />
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-border/20">
        <nav className="space-y-1">
          <SidebarItem href="/platform/settings" icon={Settings} label="Settings" />
          <SidebarItem href="/platform/help" icon={HelpCircle} label="Help & Support" />
        </nav>
        
        <div className="mt-6 flex items-center gap-3 px-2 py-3 rounded-xl bg-primary/5 border border-primary/10">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">JD</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@dirweb.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ 
  href, 
  icon: Icon, 
  label, 
  active, 
  badge,
  color
}: { 
  href: string
  icon: any
  label: string
  active?: boolean
  badge?: string
  color?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        active 
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
          : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "rounded-lg p-1.5 transition-colors",
          active ? "bg-white/20" : "bg-secondary/50 group-hover:bg-secondary"
        )}>
          <Icon className="h-4 w-4" style={{ color: !active ? color : undefined }} />
        </div>
        <span>{label}</span>
      </div>
      {badge && (
        <span className={cn(
          "px-1.5 py-0.5 text-[10px] rounded-full font-bold",
          active ? "bg-white/20 text-white" : "bg-primary/20 text-primary"
        )}>
          {badge}
        </span>
      )}
    </Link>
  )
}
