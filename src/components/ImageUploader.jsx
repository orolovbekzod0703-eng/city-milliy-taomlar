import { useRef, useState } from 'react'
import { Upload, ImageOff, Loader2 } from 'lucide-react'
import { fileToSquareBlob } from '../lib/cropImage'

// Har qanday rasm yuklansa ham, avtomatik ravishda markazdan kvadrat (1:1)
// shaklga kesib, oldindan ko'rsatadi. Yuqoriga upload qilish tashqarida (parentda) amalga oshiriladi.
export default function ImageUploader({ previewUrl, onFileReady, uploading }) {
  const inputRef = useRef(null)
  const [localPreview, setLocalPreview] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  async function handleChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')

    if (!file.type.startsWith('image/')) {
      setError('Faqat rasm fayl tanlang')
      return
    }

    setProcessing(true)
    try {
      const squareBlob = await fileToSquareBlob(file, 900)
      const url = URL.createObjectURL(squareBlob)
      setLocalPreview(url)
      onFileReady(squareBlob)
    } catch {
      setError("Rasmni qayta ishlab bo'lmadi, boshqa fayl tanlang")
    } finally {
      setProcessing(false)
    }
  }

  const shown = localPreview || previewUrl

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-[var(--color-parchment-2)] flex items-center justify-center shrink-0 ring-1 ring-black/5">
          {processing || uploading ? (
            <Loader2 size={22} className="animate-spin text-[var(--color-terracotta)]" />
          ) : shown ? (
            <img src={shown} alt="Rasm ko'rinishi" className="w-full h-full object-cover" />
          ) : (
            <ImageOff size={22} className="text-[var(--color-terracotta)]/40" />
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 rounded-lg border border-[var(--color-terracotta)]/40 hover:border-[var(--color-terracotta)] text-[var(--color-terracotta-dark)] text-xs font-semibold px-3.5 py-2 transition-colors"
          >
            <Upload size={14} />
            Rasm tanlash
          </button>
          <p className="text-[11px] text-[var(--color-ink)]/45 mt-1.5 max-w-[220px]">
            Har qanday o'lchamdagi rasm avtomatik kvadrat shaklga keltiriladi.
          </p>
          {error && <p className="text-[11px] text-[var(--color-pomegranate)] mt-1">{error}</p>}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
