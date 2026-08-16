import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import CategoryTabs from './CategoryTabs'
import MenuCard from './MenuCard'
import { UtensilsCrossed } from 'lucide-react'

export default function MenuSection() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [activeCat, setActiveCat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      const [{ data: cats, error: catErr }, { data: menuItems, error: itemErr }] = await Promise.all([
        supabase.from('categories').select('*').order('sort_order', { ascending: true }),
        supabase
          .from('menu_items')
          .select('*')
          .order('sort_order', { ascending: true }),
      ])

      if (cancelled) return

      if (catErr || itemErr) {
        setError(catErr?.message || itemErr?.message || "Ma'lumotlarni yuklab bo'lmadi")
        setLoading(false)
        return
      }

      setCategories(cats || [])
      setItems(menuItems || [])
      setActiveCat((cats && cats[0]?.id) || null)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const visibleItems = useMemo(
    () => items.filter((it) => it.category_id === activeCat),
    [items, activeCat]
  )

  return (
    <section id="menu" className="bg-[var(--color-parchment-2)] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <p className="font-script italic text-[var(--color-terracotta-dark)] text-lg mb-2">Dasturxonimiz</p>
          <h2 className="font-display text-2xl md:text-3xl text-[var(--color-ink)] tracking-wide">TO'LIQ MENYU</h2>
        </div>

        {loading && (
          <div className="flex flex-col items-center gap-3 py-16 text-[var(--color-ink)]/50">
            <UtensilsCrossed size={28} className="animate-pulse" />
            <p className="text-sm">Menyu yuklanmoqda…</p>
          </div>
        )}

        {!loading && error && (
          <div className="max-w-md mx-auto text-center py-16 text-sm text-[var(--color-pomegranate)]">
            Menyuni yuklashda xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring.
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <div className="max-w-md mx-auto text-center py-16">
            <UtensilsCrossed size={30} className="mx-auto mb-4 text-[var(--color-terracotta)]/50" />
            <p className="text-sm text-[var(--color-ink)]/60">
              Hozircha menyu bo'sh. Admin panelga kirib, kategoriya va taomlarni qo'shing.
            </p>
          </div>
        )}

        {!loading && !error && categories.length > 0 && (
          <>
            <div className="mb-10">
              <CategoryTabs categories={categories} active={activeCat} onChange={setActiveCat} />
            </div>

            {visibleItems.length === 0 ? (
              <p className="text-center text-sm text-[var(--color-ink)]/50 py-10">
                Bu bo'limda hozircha taom yo'q.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {visibleItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
