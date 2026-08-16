import { Phone, MapPin } from 'lucide-react'
import ArchFrieze from './ArchFrieze'

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-[var(--color-night)] text-[var(--color-parchment-2)] pt-14 pb-8">
      <ArchFrieze color="var(--color-gold)" className="opacity-70 mb-10" />
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-display text-xl text-[var(--color-parchment)]">CITY</span>
            <span className="font-script italic text-lg text-[var(--color-gold-light)]">Milliy taomlar</span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--color-parchment-2)]/80 max-w-xs">
            Ota-bobolarimizdan qolgan retseptlar asosida tayyorlangan haqiqiy o'zbek milliy taomlari — har bir
            luqmada an'ana va mehmondo'stlik.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-wide text-[var(--color-gold-light)] mb-4">
            BOG'LANISH
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+998952604040" className="flex items-center gap-3 hover:text-[var(--color-gold-light)] transition-colors">
                <Phone size={16} className="shrink-0 text-[var(--color-terracotta)]" />
                +998 95 260 40 40
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/city_milliy_taomlari?igsh=dXlqbGF4dTNqZXZr&igsi=dXlqbGF4dTNqZXZr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[var(--color-gold-light)] transition-colors"
              >
                <InstagramIcon size={16} className="shrink-0 text-[var(--color-terracotta)]" />
                @city_milliy_taomlari
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="shrink-0 text-[var(--color-terracotta)] mt-0.5" />
              <span>O'zbekiston, Toshkent</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-wide text-[var(--color-gold-light)] mb-4">
            ISH VAQTI
          </h3>
          <ul className="space-y-2 text-sm text-[var(--color-parchment-2)]/85">
            <li className="flex justify-between max-w-[220px]">
              <span>Har kuni</span>
              <span>09:00 – 23:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--color-parchment-2)]/60">
        <p>&copy; {new Date().getFullYear()} CITY Milliy taomlar. Barcha huquqlar himoyalangan.</p>
        <a href="/admin/login" className="hover:text-[var(--color-gold-light)] transition-colors">
          Admin panel
        </a>
      </div>
    </footer>
  )
}
