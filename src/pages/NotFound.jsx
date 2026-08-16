export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-night)] text-center px-6">
      <p className="font-display text-5xl text-[var(--color-gold-light)] mb-4">404</p>
      <h1 className="font-display text-lg text-[var(--color-parchment)] tracking-wide mb-2">
        SAHIFA TOPILMADI
      </h1>
      <p className="text-sm text-[var(--color-parchment-2)]/60 mb-8">
        Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
      </p>
      <a
        href="/"
        className="rounded-full bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-dark)] transition-colors text-parchment font-semibold text-sm px-6 py-3"
      >
        Bosh sahifaga qaytish
      </a>
    </div>
  )
}
