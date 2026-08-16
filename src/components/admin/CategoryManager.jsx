import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function CategoryManager({ categories, onChange }) {
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [error, setError] = useState('')

  async function addCategory(e) {
    e.preventDefault()
    if (!newName.trim()) return
    setAdding(true)
    setError('')
    const maxOrder = categories.reduce((m, c) => Math.max(m, c.sort_order ?? 0), 0)
    const { error: insertError } = await supabase
      .from('categories')
      .insert({ name: newName.trim(), sort_order: maxOrder + 1 })
    setAdding(false)
    if (insertError) {
      setError("Kategoriya qo'shishda xatolik yuz berdi")
      return
    }
    setNewName('')
    onChange()
  }

  function startEdit(cat) {
    setEditingId(cat.id)
    setEditName(cat.name)
  }

  async function saveEdit(id) {
    if (!editName.trim()) return
    const { error: updateError } = await supabase
      .from('categories')
      .update({ name: editName.trim() })
      .eq('id', id)
    if (updateError) {
      setError('Yangilashda xatolik yuz berdi')
      return
    }
    setEditingId(null)
    onChange()
  }

  async function removeCategory(id) {
    if (!confirm("DIQQAT: bu kategoriyani o'chirsangiz, ichidagi BARCHA taomlar ham butunlay o'chib ketadi. Davom etasizmi?")) return
    const { error: deleteError } = await supabase.from('categories').delete().eq('id', id)
    if (deleteError) {
      setError("Kategoriyani o'chirib bo'lmadi. Qayta urinib ko'ring.")
      return
    }
    onChange()
  }

  async function move(cat, direction) {
    const sorted = [...categories].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    const idx = sorted.findIndex((c) => c.id === cat.id)
    const swapWith = direction === 'up' ? idx - 1 : idx + 1
    if (swapWith < 0 || swapWith >= sorted.length) return
    const a = sorted[idx]
    const b = sorted[swapWith]
    await Promise.all([
      supabase.from('categories').update({ sort_order: b.sort_order }).eq('id', a.id),
      supabase.from('categories').update({ sort_order: a.sort_order }).eq('id', b.id),
    ])
    onChange()
  }

  const sorted = [...categories].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  return (
    <div>
      <form onSubmit={addCategory} className="flex gap-2 mb-6 max-w-md">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Yangi kategoriya nomi (masalan: Osh)"
          className="flex-1 rounded-lg border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-terracotta)]"
        />
        <button
          type="submit"
          disabled={adding}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-dark)] text-parchment text-sm font-semibold px-4 py-2.5 disabled:opacity-60"
        >
          <Plus size={16} />
          Qo'shish
        </button>
      </form>

      {error && <p className="text-xs text-[var(--color-pomegranate)] mb-4">{error}</p>}

      <div className="max-w-md space-y-2">
        {sorted.map((cat, i) => (
          <div
            key={cat.id}
            className="flex items-center gap-2 bg-white rounded-lg border border-black/5 px-3 py-2.5"
          >
            <div className="flex flex-col text-[var(--color-ink)]/30">
              <button
                type="button"
                onClick={() => move(cat, 'up')}
                disabled={i === 0}
                className="disabled:opacity-20 hover:text-[var(--color-terracotta)]"
                aria-label="Yuqoriga"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => move(cat, 'down')}
                disabled={i === sorted.length - 1}
                className="disabled:opacity-20 hover:text-[var(--color-terracotta)]"
                aria-label="Pastga"
              >
                ▼
              </button>
            </div>

            {editingId === cat.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 rounded-md border border-black/10 px-2.5 py-1.5 text-sm outline-none focus:border-[var(--color-terracotta)]"
                  autoFocus
                />
                <button onClick={() => saveEdit(cat.id)} className="text-[var(--color-terracotta-dark)]" aria-label="Saqlash">
                  <Check size={17} />
                </button>
                <button onClick={() => setEditingId(null)} className="text-[var(--color-ink)]/40" aria-label="Bekor qilish">
                  <X size={17} />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm font-medium text-[var(--color-ink)]">{cat.name}</span>
                <button onClick={() => startEdit(cat)} className="text-[var(--color-ink)]/40 hover:text-[var(--color-terracotta)]" aria-label="Tahrirlash">
                  <Pencil size={15} />
                </button>
                <button onClick={() => removeCategory(cat.id)} className="text-[var(--color-ink)]/40 hover:text-[var(--color-pomegranate)]" aria-label="O'chirish">
                  <Trash2 size={15} />
                </button>
              </>
            )}
          </div>
        ))}
        {sorted.length === 0 && (
          <p className="text-sm text-[var(--color-ink)]/50">Hozircha kategoriya yo'q. Yuqoridan birinchisini qo'shing.</p>
        )}
      </div>
    </div>
  )
}
