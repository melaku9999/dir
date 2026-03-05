import { ParticleBackground } from "@/components/particle-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TrustSection } from "@/components/trust-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { FeaturesSection } from "@/components/features-section"
import { DashboardSection } from "@/components/dashboard-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FutureSection } from "@/components/future-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <DashboardSection />
        <HowItWorksSection />
        <FutureSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
