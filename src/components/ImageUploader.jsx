import { useRef, useState } from 'react'
import { Upload, Link2, ImageOff, Loader2 } from 'lucide-react'
import { fileToSquareBlob } from '../lib/cropImage'

// Ikki usulda rasm qo'shish mumkin:
// 1) Fayldan tanlash — avtomatik markazdan kvadrat (1:1) shaklga kesiladi va Supabase Storage'ga yuklanadi
// 2) Havola (URL) orqali — boshqa joyda joylashgan rasm havolasi to'g'ridan-to'g'ri saqlanadi (kesilmaydi)
export default function ImageUploader({ previewUrl, onFileReady, onUrlReady, uploading }) {
  const inputRef = useRef(null)
  const [mode, setMode] = useState('file')
  const [localPreview, setLocalPreview] = useState(null)
  const [urlValue, setUrlValue] = useState('')
  const [urlPreview, setUrlPreview] = useState(null)
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

  function handleUrlChange(e) {
    const value = e.target.value
    setUrlValue(value)
    setError('')
    if (!value.trim()) {
      setUrlPreview(null)
      onUrlReady(null)
      return
    }
    setUrlPreview(value.trim())
    onUrlReady(value.trim())
  }

  function switchMode(next) {
    setMode(next)
    setError('')
    if (next === 'file') {
      onUrlReady(null)
    } else {
      onFileReady(null)
    }
  }

  const shown = mode === 'file' ? localPreview || previewUrl : urlPreview || previewUrl

  return (
    <div>
      <div className="flex gap-1.5 mb-3">
        <button
          type="button"
          onClick={() => switchMode('file')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
            mode === 'file'
              ? 'bg-[var(--color-terracotta)] text-parchment'
              : 'bg-black/5 text-[var(--color-ink)]/60 hover:bg-black/10'
          }`}
        >
          <Upload size={12} />
          Fayldan
        </button>
        <button
          type="button"
          onClick={() => switchMode('url')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
            mode === 'url'
              ? 'bg-[var(--color-terracotta)] text-parchment'
              : 'bg-black/5 text-[var(--color-ink)]/60 hover:bg-black/10'
          }`}
        >
          <Link2 size={12} />
          Havola (URL)
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-[var(--color-parchment-2)] flex items-center justify-center shrink-0 ring-1 ring-black/5">
          {processing || uploading ? (
            <Loader2 size={22} className="animate-spin text-[var(--color-terracotta)]" />
          ) : shown ? (
            <img
              src={shown}
              alt="Rasm ko'rinishi"
              className="w-full h-full object-cover"
              onError={() => setError("Havoladagi rasmni ko'rsatib bo'lmadi. Havolani tekshiring.")}
            />
          ) : (
            <ImageOff size={22} className="text-[var(--color-terracotta)]/40" />
          )}
        </div>

        {mode === 'file' ? (
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
          </div>
        ) : (
          <div className="flex-1">
            <input
              type="url"
              value={urlValue}
              onChange={handleUrlChange}
              placeholder="https://misol.com/rasm.jpg"
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-xs outline-none focus:border-[var(--color-terracotta)]"
            />
            <p className="text-[11px] text-[var(--color-ink)]/45 mt-1.5">
              Rasm boshqa saytda joylashgan bo'lishi kerak (avtomatik kesilmaydi, kvadrat shaklda rasm tanlang).
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-[11px] text-[var(--color-pomegranate)] mt-2">{error}</p>}

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
