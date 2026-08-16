import { ImageOff } from 'lucide-react'

function formatPrice(price) {
  if (price === null || price === undefined || price === '') return null
  const n = Number(price)
  if (Number.isNaN(n)) return null
  return n.toLocaleString('uz-UZ').replace(/,/g, ' ') + " so'm"
}

export default function MenuCard({ item }) {
  const price = formatPrice(item.price)

  return (
    <div className="group flex gap-4 items-start bg-white/60 hover:bg-white transition-colors rounded-2xl p-3 md:p-4 border border-black/5 hover:shadow-lg hover:shadow-black/5">
      <div className="relative shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-[var(--color-parchment-2)]">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-terracotta)]/40">
            <ImageOff size={28} strokeWidth={1.5} />
          </div>
        )}
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <span className="text-[10px] tracking-wide font-semibold text-parchment uppercase">
              Tugadi
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[13px] md:text-sm tracking-wide text-[var(--color-ink)] leading-snug">
            {item.name}
          </h3>
          {price && (
            <span className="shrink-0 font-semibold text-sm text-[var(--color-terracotta-dark)] whitespace-nowrap">
              {price}
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-ink)]/60 line-clamp-3">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}
