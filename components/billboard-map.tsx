"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { 
  Users, Eye, Zap, ArrowUpRight, Filter, CheckCircle2, 
  Lock, X, Calendar, Clock, ChevronRight, MapPin, 
  ChevronLeft, Camera, ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })

interface BookingSlot {
  day: string;
  start: number;
  end: number;
}

interface BillboardNode {
  id: number;
  lat: number;
  lng: number;
  name: string;
  reach: string;
  status: string;
  isBooked: boolean;
  images: string[];
  bookedSlots: BookingSlot[];
  pricePerHour: number;
}

const ADDIS_LOCATIONS: BillboardNode[] = [
  { 
    id: 1, lat: 9.0105, lng: 38.7615, name: "Meskel Square Mega-Board", reach: "2.5M", status: "Live", isBooked: true,
    images: ["https://images.unsplash.com/photo-1574672044820-22c60c88358e?auto=format&fit=crop&q=80&w=800"],
    bookedSlots: [{ day: "2026-03-05", start: 9, end: 12 }, { day: "2026-03-05", start: 18, end: 21 }],
    pricePerHour: 450
  },
  { 
    id: 2, lat: 8.9902, lng: 38.7834, name: "Bole Road Digital Hub", reach: "1.8M", status: "Live", isBooked: false,
    images: ["https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=800"],
    bookedSlots: [],
    pricePerHour: 320
  },
  { 
    id: 3, lat: 9.0304, lng: 38.7512, name: "Piazza Central Display", reach: "1.2M", status: "Live", isBooked: false,
    images: ["https://images.unsplash.com/photo-1549675584-91f19337af3d?auto=format&fit=crop&q=80&w=800"],
    bookedSlots: [{ day: "2026-03-05", start: 14, end: 15 }],
    pricePerHour: 280
  },
  { 
    id: 4, lat: 9.0158, lng: 38.7502, name: "African Union Tech-Screen", reach: "950K", status: "Live", isBooked: true,
    images: ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"],
    bookedSlots: [{ day: "2026-03-05", start: 8, end: 18 }],
    pricePerHour: 550
  },
  { 
    id: 5, lat: 9.0221, lng: 38.7754, name: "Friendship Park LED", reach: "1.4M", status: "Pending", isBooked: false,
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"],
    bookedSlots: [],
    pricePerHour: 210
  }
]

export function BillboardMap() {
  const [L, setL] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)
  const [viewMode, setViewMode] = useState<"satellite" | "infrastructure">("satellite")
  const [inventoryFilter, setInventoryFilter] = useState<"all" | "available" | "booked">("all")
  const [selectedNode, setSelectedNode] = useState<BillboardNode | null>(null)
  const [bookingStep, setBookingStep] = useState<"details" | "slots">("details")
  const [selectedDay, setSelectedDay] = useState("2026-03-05")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingStartTime, setBookingStartTime] = useState<number | null>(null) // In minutes from 00:00
  const [bookingEndTime, setBookingEndTime] = useState<number | null>(null)

  useEffect(() => {
    setIsClient(true)
    import("leaflet").then((leaflet) => {
      setL(leaflet)
    })
  }, [])

  useEffect(() => {
    // setSelectedSlots([]) // Reset selection when node changes
    setBookingStartTime(null)
    setBookingEndTime(null)
  }, [selectedNode])

  if (!isClient || !L) return <div className="w-full aspect-[16/9] bg-background animate-pulse rounded-3xl" />

  // Generate 20-min intervals for the modal
  const TIME_INTERVALS = []
  for (let h = 8; h <= 22; h++) {
    for (let m = 0; m < 60; m += 20) {
      if (h === 22 && m > 0) break
      TIME_INTERVALS.push(h * 60 + m)
    }
  }

  const formatTime = (totalMinutes: number) => {
    const h = Math.floor(totalMinutes / 60)
    const m = totalMinutes % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  }

  const isIntervalBooked = (minutes: number) => {
    if (!selectedNode) return false
    return selectedNode.bookedSlots.some(slot =>
      slot.day === selectedDay && minutes >= slot.start * 60 && minutes < slot.end * 60
    )
  }

  const filteredLocations = ADDIS_LOCATIONS.filter(loc => {
    if (inventoryFilter === "available") return !loc.isBooked
    if (inventoryFilter === "booked") return loc.isBooked
    return true
  })

  return (
    <div className="relative w-full aspect-[16/9] bg-background border border-border/40 rounded-3xl overflow-hidden glass-card group shadow-2xl">
      <MapContainer
        center={[9.01, 38.76]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          url={viewMode === "satellite"
            ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"}
        />

        {filteredLocations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            eventHandlers={{
              click: () => {
                setSelectedNode(loc)
              }
            }}
            icon={L.divIcon({
              className: "custom-div-icon",
              html: `<div class="relative group/marker">
                <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center relative z-20 transition-all border border-primary/40 backdrop-blur-sm group-hover/marker:scale-125">
                  <div class="h-4 w-4 rounded-full border-2 border-background shadow-lg ${loc.isBooked ? 'bg-[#6366f1]' : 'bg-[#10b981]'}"></div>
                </div>
                <div class="absolute inset-0 rounded-full border border-primary animate-ping opacity-20" style="animation-duration: 3s"></div>
              </div>`,
              iconSize: [40, 40],
              iconAnchor: [20, 20],
            })}
          />
        ))}
      </MapContainer>

      {/* Map UI Overlays (Top Left) */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-3 pointer-events-none">
        <div className="glass-card px-4 py-2.5 rounded-xl border-primary/20 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            ADDIS ABABA AD-SPACE
          </span>
        </div>

        <div className="flex bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-1 pointer-events-auto">
          {["all", "available", "booked"].map((f) => (
            <button
              key={f}
              onClick={() => setInventoryFilter(f as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-bold transition-all uppercase",
                inventoryFilter === f ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Sidebar */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-[400px] z-[2000] bg-background/80 backdrop-blur-2xl border-l border-white/10 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-30 flex items-center justify-between p-6 bg-background/40 backdrop-blur-md border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  selectedNode.isBooked ? "bg-indigo-500" : "bg-emerald-500"
                )} />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Node ID: AD-${selectedNode.id}</span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image Gallery */}
              <div className="relative group mb-6 overflow-hidden rounded-2xl aspect-video border border-white/10">
                <img
                  src={selectedNode.images[0]}
                  alt={selectedNode.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80">
                  <Camera className="h-4 w-4" />
                  <span className="text-[10px] font-medium tracking-tight">Verified Site Photo</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">{selectedNode.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-6">
                <MapPin className="h-3 w-3" />
                <span>Addis Ababa, Ethiopia</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="glass-card p-4 rounded-2xl border-white/5">
                  <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Weekly Reach</p>
                  <p className="text-lg font-bold text-white">{selectedNode.reach}</p>
                </div>
                <div className="glass-card p-4 rounded-2xl border-white/5">
                  <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Price / Hour</p>
                  <p className="text-lg font-bold text-primary">${selectedNode.pricePerHour}</p>
                </div>
              </div>

              {/* Quick Booking Preview */}
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Active Inventory</span>
                  </div>
                  <p className="text-[10px] text-indigo-300/80 leading-relaxed italic">
                    "This node is highly targeted for {selectedNode.id % 2 === 0 ? 'commuter traffic' : 'night-life'} crowds. Hourly rates adjust based on historical impressions."
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <Calendar className="h-4 w-4" />
                  BOOK NOW (GRANULAR)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robust Booking Modal (Popup) */}
      <AnimatePresence>
        {isModalOpen && selectedNode && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-background/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Left Side: Summary & Site Info */}
              <div className="w-full md:w-5/12 p-8 border-b md:border-b-0 md:border-r border-white/5 bg-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Booking</h3>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Configuration</p>
                  </div>
                </div>

                <div className="aspect-video rounded-xl overflow-hidden mb-6 border border-white/10">
                  <img src={selectedNode.images[0]} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-black mb-1">Selected Billboard</p>
                    <p className="text-sm font-bold text-white">{selectedNode.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-black mb-1">Start Time</p>
                      <p className="text-sm font-black text-primary">{bookingStartTime ? formatTime(bookingStartTime) : "--:--"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-black mb-1">End Time</p>
                      <p className="text-sm font-black text-primary">{bookingEndTime ? formatTime(bookingEndTime) : "--:--"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-[10px] text-white/40 uppercase font-black mb-2 tracking-[0.2em]">Estimated Cost</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">
                      ${bookingStartTime && bookingEndTime ? Math.round(((bookingEndTime - bookingStartTime) / 60) * selectedNode.pricePerHour) : "0"}
                    </span>
                    <span className="text-xs font-bold text-white/40 uppercase tracking-tighter">Total Price</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Date & Time Selectors */}
              <div className="w-full md:w-7/12 flex flex-col">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">Select Slots</h4>
                    <p className="text-[10px] text-muted-foreground font-bold">20-MINUTE RECURRING INTERVALS</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-white/40">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                  <div className="grid grid-cols-7 gap-1.5 mb-8">
                    {/* Simplified calendar row */}
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                      <div key={d} className="flex flex-col items-center gap-2">
                        <span className="text-[8px] font-black text-white/20 uppercase">{d}</span>
                        <button
                          className={cn(
                            "h-10 w-10 rounded-xl text-xs font-bold transition-all",
                            i === 3 ? "bg-primary text-primary-foreground" : "bg-white/5 text-white/40 hover:bg-white/10"
                          )}
                        >
                          {5 + i}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {TIME_INTERVALS.map((t) => {
                      const booked = isIntervalBooked(t)
                      const isSelected = (bookingStartTime && t >= bookingStartTime && bookingEndTime && t < bookingEndTime) || (bookingStartTime === t)

                      return (
                        <button
                          key={t}
                          disabled={booked}
                          onClick={() => {
                            if (!bookingStartTime || (bookingStartTime && bookingEndTime)) {
                              setBookingStartTime(t)
                              setBookingEndTime(null)
                            } else {
                              if (t > bookingStartTime) {
                                // Enforce 20-min minimum
                                if (t - bookingStartTime < 20) {
                                  setBookingEndTime(bookingStartTime + 20)
                                } else {
                                  setBookingEndTime(t + 20)
                                }
                              } else {
                                setBookingStartTime(t)
                                setBookingEndTime(null)
                              }
                            }
                          }}
                          className={cn(
                            "py-2.5 rounded-xl text-[10px] font-bold border transition-all flex flex-col items-center justify-center gap-1",
                            booked
                              ? "bg-white/5 border-white/5 text-white/10 cursor-not-allowed opacity-30"
                              : isSelected
                                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/40 scale-105 z-10"
                                : "bg-white/5 border-white/5 text-white/60 hover:border-primary/50 hover:bg-primary/5 hover:text-white"
                          )}
                        >
                          <Clock className="h-3 w-3" />
                          {formatTime(t)}
                          {booked && <span className="text-[6px] text-white/40 uppercase">Closed</span>}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="p-8 bg-black/40 border-t border-white/5 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Enforcing 20m Min</span>
                    </div>
                    <p className="text-[10px] text-white/40 leading-tight">By clicking confirm you agree to our ad-placement standards and network terms.</p>
                  </div>
                  <button
                    disabled={!bookingStartTime || !bookingEndTime}
                    className="px-8 py-3.5 rounded-2xl bg-white text-black font-black text-xs hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale"
                  >
                    CONFIRM BOOKING
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-6 right-6 z-[1000] flex items-center justify-between pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          {["satellite", "infrastructure"].map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m as any)}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] font-bold border transition-all uppercase",
                viewMode === m ? "bg-primary text-primary-foreground border-primary" : "bg-black/60 backdrop-blur-md border-white/10 text-white hover:bg-black/80"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        
        <div className="glass-card px-5 py-3 rounded-2xl flex items-center gap-6 bg-black/60 backdrop-blur-md border-white/10 shadow-2xl">
          <div className="text-center">
            <p className="text-[8px] text-white/60 uppercase font-bold tracking-tighter mb-0.5">Active Network</p>
            <p className="text-sm font-bold text-white">452</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-[8px] text-white/60 uppercase font-bold tracking-tighter mb-0.5">Live Traffic</p>
            <p className="text-sm font-bold text-primary">HEAVY</p>
          </div>
        </div>
      </div>
    </div>
  )
}
