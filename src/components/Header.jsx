import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const LINKS = [
  { href: '#menu', label: 'Menyu' },
  { href: '#about', label: 'Biz haqimizda' },
  { href: '#contact', label: "Bog'lanish" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-[var(--color-night)]/95 backdrop-blur shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 h-16 md:h-20">
        <a href="#top" className="flex items-center gap-2 text-parchment">
          <span className="font-display text-lg md:text-xl tracking-wide text-[var(--color-parchment)]">
            CITY
          </span>
          <span className="font-script italic text-base md:text-lg text-[var(--color-gold-light)] -ml-0.5">
            Milliy taomlar
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--color-parchment-2)] hover:text-[var(--color-gold-light)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+998952604040"
            className="flex items-center gap-2 rounded-full bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-dark)] transition-colors text-parchment text-sm font-semibold px-4 py-2"
          >
            <Phone size={15} strokeWidth={2.5} />
            +998 95 260 40 40
          </a>
        </nav>

        <button
          className="md:hidden text-[var(--color-parchment)]"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--color-night)] border-t border-white/10 px-5 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[var(--color-parchment-2)] text-base font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+998952604040"
            className="flex items-center justify-center gap-2 rounded-full bg-[var(--color-terracotta)] text-parchment text-sm font-semibold px-4 py-3"
          >
            <Phone size={16} />
            +998 95 260 40 40
          </a>
        </div>
      )}
    </header>
  )
}
