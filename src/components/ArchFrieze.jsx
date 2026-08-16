// Ravoq (Temuriy me'morchiligidagi noktali gumbaz) motividan ilhomlangan
// takrorlanuvchi bezak chiziq — saytning "imzo" grafik elementi.
export default function ArchFrieze({ color = 'var(--color-terracotta)', className = '' }) {
  const arches = Array.from({ length: 14 })
  return (
    <svg
      viewBox="0 0 560 28"
      preserveAspectRatio="none"
      className={`w-full h-6 ${className}`}
      aria-hidden="true"
    >
      <line x1="0" y1="27" x2="560" y2="27" stroke={color} strokeWidth="1" opacity="0.35" />
      {arches.map((_, i) => {
        const x = i * 40
        return (
          <path
            key={i}
            d={`M ${x} 27 L ${x} 14 Q ${x} 2 ${x + 20} 2 Q ${x + 40} 2 ${x + 40} 14 L ${x + 40} 27`}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
        )
      })}
    </svg>
  )
}
