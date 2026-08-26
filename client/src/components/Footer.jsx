import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── SVG icon primitives ───────────────────────────────────────────────────────

function IconLocation() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-0.5">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconEmail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-0.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-0.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

// Social icons
function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconTwitterX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

// ── Newsletter form ───────────────────────────────────────────────────────────

function NewsletterSignup() {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <h3 className="font-body font-bold text-white text-base uppercase tracking-wider mb-4">
        Sign up to Our Newsletter
      </h3>

      {status === 'success' ? (
        <p className="font-body text-sm text-white/80">
          Thanks for subscribing! We'll be in touch.
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex items-stretch gap-0 max-w-xs">
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your mail here"
              required
              className="flex-1 min-w-0 px-3 py-2.5 text-sm font-body text-navy bg-white rounded-l focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-label="Subscribe to newsletter"
              className="bg-navy text-white px-3 py-2.5 rounded-r hover:bg-navy/80 transition-colors duration-200 flex items-center justify-center flex-shrink-0 disabled:opacity-60"
            >
              <IconSend />
            </button>
          </form>
          {status === 'error' && (
            <p className="font-body text-xs text-white/70 mt-2">
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  )
}

// ── Main Footer ───────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#1400EB] text-white">

      {/* ── Three-column body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ── Column 1: Say Hello ── */}
        <div>
          <h3 className="font-body font-bold text-white text-base uppercase tracking-wider mb-5">
            Say Hello
          </h3>

          {/* Address */}
          <div className="flex gap-3 mb-4">
            <IconLocation />
            <address className="font-body text-sm text-white/85 not-italic leading-relaxed space-y-3">
              <div>
                <p className="font-semibold text-white uppercase text-xs tracking-wide mb-0.5">
                  LAGOS OFICE
                </p>
                <p>139, Idimu-Ejigbo Road, Idimu, Lagos, Lagos State, Nigeria</p>
              </div>
              <div>
                <p className="font-semibold text-white uppercase text-xs tracking-wide mb-0.5">
                  IBADAN OFICE
                </p>
                <p>Last floor, Anjola Oluwa house, Opposite Oando Filling station, Mokola Ibadan, Oyo State, Nigeria</p>
              </div>
              <div>
                <p className="font-semibold text-white uppercase text-xs tracking-wide mb-0.5">
                  ABUJA OFICE
                </p>
                <p>House 5, Second Avenue, Centage Estate, Apo, Abuja, F.C.T Nigeria</p>
              </div>
            </address>
          </div>

          {/* Email */}
          <a
            href="mailto:info@antherconsulting.com.ng"
            className="flex gap-3 items-start mb-3 group"
          >
            <IconEmail />
            <span className="font-body text-sm text-white/85 group-hover:text-white transition-colors">
              info@antherconsulting.com.ng
            </span>
          </a>

          {/* Phone */}
          <div className="flex gap-3 items-start mb-5">
            <IconPhone />
            <div className="font-body text-sm text-white/85 space-y-0.5">
              <a href="tel:+2348034982305" className="block hover:text-white transition-colors">+234 8034-982-305</a>
              <a href="tel:+2347062190613" className="block hover:text-white transition-colors">+234 7062-190-613</a>
              <a href="tel:+2348135621997" className="block hover:text-white transition-colors">+234 8135-621-997</a>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex gap-2" role="list" aria-label="Social media links">
            {[
              { label: 'Facebook',  href: 'https://facebook.com',  Icon: IconFacebook  },
              { label: 'X',         href: 'https://x.com',         Icon: IconTwitterX  },
              { label: 'LinkedIn',  href: 'https://linkedin.com',  Icon: IconLinkedIn  },
              { label: 'Instagram', href: 'https://instagram.com', Icon: IconInstagram },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                role="listitem"
                className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#1400EB] transition-colors duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* ── Column 2: Quick Links ── */}
        <div>
          <h3 className="font-body font-bold text-white text-base uppercase tracking-wider mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3 font-body text-sm text-white/85">
            {[
              { label: 'About Us',      to: '/about-us'           },
              { label: 'Our Services',  to: '/services'           },
              { label: 'Blog',          to: '/blog'               },
              { label: 'Contact. Us',   to: '/contact-us'         },
            ].map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-white/40 group-hover:text-white transition-colors">›</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 3: Newsletter ── */}
        <div>
          <NewsletterSignup />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-[#1000d4] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="font-body text-sm text-white/80 text-center">
            © Copyright 2025 | Anther Consulting | All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}
