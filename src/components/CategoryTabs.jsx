export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
      {categories.map((cat) => {
        const isActive = active === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors border ${
              isActive
                ? 'bg-[var(--color-terracotta)] border-[var(--color-terracotta)] text-parchment'
                : 'bg-transparent border-[var(--color-ink)]/15 text-[var(--color-ink)]/70 hover:border-[var(--color-terracotta)]/50 hover:text-[var(--color-terracotta-dark)]'
            }`}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
