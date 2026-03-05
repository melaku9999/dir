import Image from "next/image"

const footerLinks = [
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Platform",
    links: ["Campaign Manager", "Marketplace", "Analytics", "SDK"],
  },
  {
    title: "Developers",
    links: ["Documentation", "API Reference", "Integrations", "Status"],
  },
  {
    title: "Contact",
    links: ["Sales", "Support", "Partners", "Media"],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/20 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/dirweb-logo.png"
                alt="Dir Web logo"
                width={28}
                height={28}
                className="brightness-110 invert"
              />
              <span className="font-bold text-foreground">Dir Web</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground/70">
              National Advertising Infrastructure for the modern world.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-xs font-semibold tracking-widest text-foreground/80 uppercase">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground/60 transition-colors duration-200 hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/15 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground/50">
            {"© 2026 Dir Web. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-muted-foreground/50 transition-colors duration-200 hover:text-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground/50 transition-colors duration-200 hover:text-foreground"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
