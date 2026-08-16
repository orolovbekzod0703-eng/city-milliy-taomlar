import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { session, loading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error: signInError } = await signIn(email.trim(), password)
    setSubmitting(false)
    if (signInError) {
      setError("Email yoki parol noto'g'ri.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-night)] px-5">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[var(--color-terracotta)]/15 flex items-center justify-center mb-4">
            <Lock size={22} className="text-[var(--color-gold-light)]" />
          </div>
          <h1 className="font-display text-lg text-[var(--color-parchment)] tracking-wide">ADMIN PANEL</h1>
          <p className="text-sm text-[var(--color-parchment-2)]/60 mt-1">CITY Milliy taomlar</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--color-parchment-2)]/70 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-white/10 border border-white/10 px-3.5 py-2.5 text-sm text-[var(--color-parchment)] placeholder:text-[var(--color-parchment-2)]/30 focus:border-[var(--color-gold)] outline-none"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-parchment-2)]/70 mb-1.5">Parol</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-white/10 border border-white/10 px-3.5 py-2.5 text-sm text-[var(--color-parchment)] placeholder:text-[var(--color-parchment-2)]/30 focus:border-[var(--color-gold)] outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-[var(--color-terracotta)]">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-dark)] disabled:opacity-60 transition-colors text-parchment text-sm font-semibold py-2.5"
          >
            {submitting ? 'Kirilmoqda…' : 'Kirish'}
          </button>
        </form>

        <a href="/" className="block text-center mt-6 text-xs text-[var(--color-parchment-2)]/40 hover:text-[var(--color-gold-light)]">
          &larr; Saytga qaytish
        </a>
      </div>
    </div>
  )
}
