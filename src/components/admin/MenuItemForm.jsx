import { useState } from 'react'
import { X } from 'lucide-react'
import { supabase, MENU_IMAGES_BUCKET } from '../../lib/supabase'
import ImageUploader from '../ImageUploader'

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category_id: '',
  is_available: true,
}

export default function MenuItemForm({ categories, item, onClose, onSaved }) {
  const isEdit = Boolean(item)
  const [form, setForm] = useState(
    item
      ? {
          name: item.name || '',
          description: item.description || '',
          price: item.price ?? '',
          category_id: item.category_id || '',
          is_available: item.is_available,
        }
      : { ...emptyForm, category_id: categories[0]?.id || '' }
  )
  const [imageBlob, setImageBlob] = useState(null)
  const [imageUrlInput, setImageUrlInput] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.category_id) {
      setError('Nomi va kategoriyasini kiriting')
      return
    }
    setSaving(true)
    setError('')

    let image_url = item?.image_url || null
    const oldImageUrl = item?.image_url || null

    try {
      if (imageBlob) {
        const fileName = `${crypto.randomUUID()}.jpg`
        const { error: uploadError } = await supabase.storage
          .from(MENU_IMAGES_BUCKET)
          .upload(fileName, imageBlob, { contentType: 'image/jpeg', upsert: false })
        if (uploadError) throw uploadError
        const { data: publicUrlData } = supabase.storage.from(MENU_IMAGES_BUCKET).getPublicUrl(fileName)
        image_url = publicUrlData.publicUrl
      } else if (imageUrlInput) {
        image_url = imageUrlInput
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: form.price === '' ? null : Number(form.price),
        category_id: form.category_id,
        is_available: form.is_available,
        image_url,
      }

      if (isEdit) {
        const { error: updateError } = await supabase.from('menu_items').update(payload).eq('id', item.id)
        if (updateError) throw updateError
      } else {
        const maxOrderRes = await supabase
          .from('menu_items')
          .select('sort_order')
          .eq('category_id', form.category_id)
          .order('sort_order', { ascending: false })
          .limit(1)
        const nextOrder = (maxOrderRes.data?.[0]?.sort_order ?? 0) + 1
        const { error: insertError } = await supabase
          .from('menu_items')
          .insert({ ...payload, sort_order: nextOrder })
        if (insertError) throw insertError
      }

      if (oldImageUrl && oldImageUrl !== image_url && oldImageUrl.includes(`/${MENU_IMAGES_BUCKET}/`)) {
        const oldFileName = oldImageUrl.split('/').pop()
        if (oldFileName) await supabase.storage.from(MENU_IMAGES_BUCKET).remove([oldFileName])
      }

      onSaved()
    } catch {
      setError("Saqlashda xatolik yuz berdi. Qayta urinib ko'ring.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-5">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 sticky top-0 bg-white z-10">
          <h2 className="font-display text-sm tracking-wide text-[var(--color-ink)]">
            {isEdit ? "TAOMNI TAHRIRLASH" : "YANGI TAOM QO'SHISH"}
          </h2>
          <button onClick={onClose} className="text-[var(--color-ink)]/40 hover:text-[var(--color-ink)]" aria-label="Yopish">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--color-ink)]/60 mb-1.5">Taom rasmi</label>
            <ImageUploader previewUrl={item?.image_url} onFileReady={setImageBlob} onUrlReady={setImageUrlInput} />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-ink)]/60 mb-1.5">Taom nomi *</label>
            <input
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Masalan: Toshkent oshi"
              className="w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-terracotta)]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-ink)]/60 mb-1.5">Tavsif</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Taom haqida qisqacha (ixtiyoriy)"
              className="w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-terracotta)] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--color-ink)]/60 mb-1.5">Narxi (so'm)</label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                placeholder="35000"
                className="w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-terracotta)]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-ink)]/60 mb-1.5">Kategoriya *</label>
              <select
                required
                value={form.category_id}
                onChange={(e) => update('category_id', e.target.value)}
                className="w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-terracotta)] bg-white"
              >
                <option value="" disabled>
                  Tanlang
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-sm text-[var(--color-ink)]/80">
            <input
              type="checkbox"
              checked={form.is_available}
              onChange={(e) => update('is_available', e.target.checked)}
              className="w-4 h-4 accent-[var(--color-terracotta)]"
            />
            Hozirda mavjud (menyuda ko'rinadi)
          </label>

          {error && <p className="text-xs text-[var(--color-pomegranate)]">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-black/10 text-sm font-semibold text-[var(--color-ink)]/70 py-2.5"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-dark)] disabled:opacity-60 text-parchment text-sm font-semibold py-2.5"
            >
              {saving ? 'Saqlanmoqda…' : 'Saqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
