import { ChevronDown } from 'lucide-react'
import ArchFrieze from './ArchFrieze'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 15%, #2a2a52 0%, #191524 42%, #17140f 78%, #3a2f28 100%)',
      }}
    >
      {/* ambient texture */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 80%, rgba(185,139,42,0.25), transparent 45%), radial-gradient(circle at 10% 90%, rgba(122,33,49,0.35), transparent 40%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center pt-24 pb-16">
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 mb-8 animate-[fadeIn_0.9s_ease-out]">
          <img src="/logo.png" alt="CITY Milliy taomlar logotipi" className="w-full h-full object-cover" />
        </div>

        <p className="font-script italic text-[var(--color-gold-light)] text-lg md:text-xl mb-3">
          Dasturxonimizga xush kelibsiz
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[var(--color-parchment)] leading-tight tracking-wide">
          O'ZBEK MILLIY TAOMLARINING
          <br className="hidden sm:block" /> ASL TA'MI
        </h1>
        <p className="mt-5 max-w-xl text-[var(--color-parchment-2)]/80 text-sm md:text-base leading-relaxed">
          Osh, shashlik, somsa va dasturxonimizning boshqa sara taomlari — har kuni yangi tayyorlangan, ota-bobolarimizning
          retseptlari asosida.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#menu"
            className="rounded-full bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-dark)] transition-colors text-parchment font-semibold text-sm px-7 py-3.5"
          >
            Menyuni ko'rish
          </a>
          <a
            href="tel:+998952604040"
            className="rounded-full border border-[var(--color-gold-light)]/40 hover:border-[var(--color-gold-light)] transition-colors text-[var(--color-gold-light)] font-semibold text-sm px-7 py-3.5"
          >
            +998 95 260 40 40
          </a>
        </div>

        <a href="#menu" aria-label="Pastga o'tish" className="mt-14 text-[var(--color-parchment-2)]/50 hover:text-[var(--color-gold-light)] transition-colors">
          <ChevronDown size={26} className="animate-bounce" />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <ArchFrieze color="var(--color-gold)" className="opacity-50" />
      </div>
    </section>
  )
}
