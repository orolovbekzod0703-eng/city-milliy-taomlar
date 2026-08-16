import { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, ImageOff } from 'lucide-react'
import { supabase, MENU_IMAGES_BUCKET } from '../../lib/supabase'
import MenuItemForm from './MenuItemForm'

function formatPrice(price) {
  if (price === null || price === undefined || price === '') return '—'
  const n = Number(price)
  if (Number.isNaN(n)) return '—'
  return n.toLocaleString('uz-UZ').replace(/,/g, ' ') + " so'm"
}

export default function MenuItemManager({ categories, items, onChange }) {
  const [filterCat, setFilterCat] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const categoryMap = useMemo(() => {
    const m = new Map()
    categories.forEach((c) => m.set(c.id, c.name))
    return m
  }, [categories])

  const visible = useMemo(
    () => (filterCat === 'all' ? items : items.filter((it) => it.category_id === filterCat)),
    [items, filterCat]
  )

  function openNew() {
    setEditingItem(null)
    setFormOpen(true)
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormOpen(true)
  }

  async function toggleAvailable(item) {
    await supabase.from('menu_items').update({ is_available: !item.is_available }).eq('id', item.id)
    onChange()
  }

  async function removeItem(item) {
    if (!confirm(`"${item.name}" taomini o'chirishni tasdiqlaysizmi?`)) return
    await supabase.from('menu_items').delete().eq('id', item.id)
    if (item.image_url && item.image_url.includes(`/${MENU_IMAGES_BUCKET}/`)) {
      const fileName = item.image_url.split('/').pop()
      if (fileName) await supabase.storage.from(MENU_IMAGES_BUCKET).remove([fileName])
    }
    onChange()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-lg border border-black/10 px-3.5 py-2.5 text-sm bg-white outline-none focus:border-[var(--color-terracotta)]"
        >
          <option value="all">Barcha kategoriyalar</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={openNew}
          disabled={categories.length === 0}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-dark)] disabled:opacity-50 text-parchment text-sm font-semibold px-4 py-2.5"
        >
          <Plus size={16} />
          Yangi taom
        </button>
      </div>

      {categories.length === 0 && (
        <p className="text-sm text-[var(--color-ink)]/50 mb-6">
          Taom qo'shishdan oldin "Kategoriyalar" bo'limida kamida bitta kategoriya yarating.
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {visible.map((item) => (
          <div key={item.id} className="flex gap-3 bg-white rounded-xl border border-black/5 p-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--color-parchment-2)] shrink-0">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-terracotta)]/30">
                  <ImageOff size={18} />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-[var(--color-ink)] truncate">{item.name}</p>
              </div>
              <p className="text-xs text-[var(--color-ink)]/45 mt-0.5">{categoryMap.get(item.category_id) || '—'}</p>
              <p className="text-xs font-medium text-[var(--color-terracotta-dark)] mt-1">{formatPrice(item.price)}</p>

              <div className="flex items-center gap-3 mt-2">
                <label className="flex items-center gap-1.5 text-[11px] text-[var(--color-ink)]/60">
                  <input
                    type="checkbox"
                    checked={item.is_available}
                    onChange={() => toggleAvailable(item)}
                    className="w-3.5 h-3.5 accent-[var(--color-terracotta)]"
                  />
                  Mavjud
                </label>
                <button onClick={() => openEdit(item)} className="text-[var(--color-ink)]/40 hover:text-[var(--color-terracotta)]" aria-label="Tahrirlash">
                  <Pencil size={14} />
                </button>
                <button onClick={() => removeItem(item)} className="text-[var(--color-ink)]/40 hover:text-[var(--color-pomegranate)]" aria-label="O'chirish">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!items.length ? null : visible.length === 0 && (
        <p className="text-sm text-[var(--color-ink)]/50 mt-6">Bu kategoriyada taom yo'q.</p>
      )}

      {formOpen && (
        <MenuItemForm
          categories={categories}
          item={editingItem}
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false)
            onChange()
          }}
        />
      )}
    </div>
  )
}
