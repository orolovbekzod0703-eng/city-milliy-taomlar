import { useCallback, useEffect, useState } from 'react'
import { LogOut, UtensilsCrossed, Tag, ExternalLink } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import CategoryManager from '../../components/admin/CategoryManager'
import MenuItemManager from '../../components/admin/MenuItemManager'

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const [tab, setTab] = useState('items')
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const [{ data: cats }, { data: menuItems }] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('menu_items').select('*').order('sort_order', { ascending: true }),
    ])
    setCategories(cats || [])
    setItems(menuItems || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <header className="bg-[var(--color-night)] text-[var(--color-parchment)]">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-base tracking-wide">CITY</span>
            <span className="font-script italic text-sm text-[var(--color-gold-light)]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--color-parchment-2)]/70 hover:text-[var(--color-gold-light)]"
            >
              Saytni ko'rish
              <ExternalLink size={13} />
            </a>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-parchment-2)]/80 hover:text-[var(--color-terracotta)]"
            >
              <LogOut size={14} />
              Chiqish
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab('items')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === 'items'
                ? 'bg-[var(--color-terracotta)] text-parchment'
                : 'bg-white text-[var(--color-ink)]/60 border border-black/5'
            }`}
          >
            <UtensilsCrossed size={15} />
            Taomlar
          </button>
          <button
            onClick={() => setTab('categories')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === 'categories'
                ? 'bg-[var(--color-terracotta)] text-parchment'
                : 'bg-white text-[var(--color-ink)]/60 border border-black/5'
            }`}
          >
            <Tag size={15} />
            Kategoriyalar
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-[var(--color-ink)]/50">Yuklanmoqda…</p>
        ) : tab === 'items' ? (
          <MenuItemManager categories={categories} items={items} onChange={load} />
        ) : (
          <CategoryManager categories={categories} onChange={load} />
        )}
      </div>
    </div>
  )
}
