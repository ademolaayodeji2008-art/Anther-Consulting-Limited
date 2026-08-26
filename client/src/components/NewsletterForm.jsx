/**
 * NewsletterForm — used inside the Footer.
 * POSTs to /api/newsletter. Shows inline success / error feedback.
 */
import { useState } from 'react'
import { apiFetch } from '../lib/api.js'

function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

export default function NewsletterForm({ placeholder = 'Your mail here' }) {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [msg,    setMsg]    = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await apiFetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMsg(data.message ?? "Thanks for subscribing! We'll be in touch.")
        setEmail('')
      } else {
        setStatus('error')
        setMsg(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMsg('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return <p className="font-body text-sm text-white/90 py-1">{msg}</p>
  }

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex items-stretch gap-0 max-w-xs">
        <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
        <input
          id="footer-newsletter-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
          placeholder={placeholder}
          required
          className="flex-1 min-w-0 px-3 py-2.5 text-sm font-body text-navy bg-white rounded-l focus:outline-none focus:ring-2 focus:ring-white/60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label="Subscribe to newsletter"
          className="bg-navy text-white px-3 py-2.5 rounded-r hover:bg-navy/80 transition-colors duration-200 flex items-center justify-center flex-shrink-0 disabled:opacity-60"
        >
          {status === 'loading'
            ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <IconSend />}
        </button>
      </form>
      {status === 'error' && (
        <p className="font-body text-xs text-white/70">{msg}</p>
      )}
    </div>
  )
}
