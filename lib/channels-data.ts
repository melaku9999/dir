import { 
  Monitor, 
  Tv, 
  Radio, 
  Smartphone, 
  Box, 
  Plane, 
  Code,
  Share2,
  Zap,
  MessageSquare,
  Mail
} from "lucide-react"

export const CHANNELS = [
  {
    id: "billboards",
    name: "Digital Billboards",
    icon: Box,
    color: "oklch(0.63 0.2 25)",
    stats: { users: "450 Units", growth: "+5%", status: "Active" },
    description: "High-impact physical advertising in prime locations."
  },
  {
    id: "digital-displays",
    name: "Digital Displays",
    icon: Monitor,
    color: "oklch(0.72 0.15 192)",
    stats: { users: "1.2K Screens", growth: "+12%", status: "Stable" },
    description: "In-store and public space digital signage."
  },
  {
    id: "drone-ads",
    name: "Drone Ads",
    icon: Plane,
    color: "oklch(0.65 0.25 350)",
    stats: { users: "85 Drones", growth: "+25%", status: "Innovation" },
    description: "Aerial advertising and light shows."
  },
  {
    id: "mobile-ads",
    name: "Mobile Ads",
    icon: Smartphone,
    color: "oklch(0.55 0.18 250)",
    stats: { users: "12.5M Reach", growth: "+18%", status: "High RoI" },
    description: "Targeted advertising for mobile devices."
  },
  {
    id: "tv",
    name: "TV Burst",
    icon: Tv,
    color: "oklch(0.7 0.17 150)",
    stats: { users: "24 Channels", growth: "+8%", status: "Broadcasting" },
    description: "Linear and connected TV advertising slots."
  },
  {
    id: "radio",
    name: "Radio Spots",
    icon: Radio,
    color: "oklch(0.8 0.15 85)",
    stats: { users: "110 Stations", growth: "+3%", status: "Live" },
    description: "Audio-based advertising for commuting audiences."
  },
  {
    id: "web-sdk",
    name: "Web SDK",
    icon: Code,
    color: "oklch(0.45 0.15 240)",
    stats: { users: "5.2K Installs", growth: "+15%", status: "Growing" },
    description: "Programmatic ads embedded in web applications."
  }
]

export const GLOBAL_STATS = [
  { label: "Total Reach", value: "24.5M", icon: Share2, change: "+6.8%" },
  { label: "Active Channels", value: "7", icon: Zap, change: "+2" },
  { label: "Daily Impressions", value: "1.8M", icon: Monitor, change: "+12%" },
  { label: "Ad Inventory", value: "92%", icon: Box, change: "+4%" },
]

export const RECENT_ACTIVITY = [
  { id: 1, channel: "billboards", user: "Campaign Alpha", action: "went live in Times Square", time: "2m ago" },
  { id: 2, channel: "drone-ads", user: "Sky Brand", action: "finished aerial show", time: "15m ago" },
  { id: 3, channel: "web-sdk", user: "App Developer", action: "integrated new ad slot", time: "1h ago" },
  { id: 4, channel: "tv", user: "Primetime Ad", action: "scheduled for 8:00 PM", time: "3h ago" },
]
