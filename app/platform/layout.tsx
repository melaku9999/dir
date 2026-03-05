import { Navbar } from "@/components/navbar"
import { PlatformSidebar } from "@/components/platform-sidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Platform | Dir Web",
  description: "Unified command center for every channel.",
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <PlatformSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
