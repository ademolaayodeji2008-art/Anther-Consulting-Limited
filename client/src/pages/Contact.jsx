import { useState } from 'react'
import SEO from '../components/SEO.jsx'
import useInView from '../hooks/useInView.js'
import { apiFetch } from '../lib/api.js'

// ─── Shared fade-up wrapper ───────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView({ threshold: 0.06 })
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconPin() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
function IconFacebook() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
}
function IconTwitterX() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
}
function IconLinkedIn() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
}
function IconInstagram() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
}

// ─── Office card ──────────────────────────────────────────────────────────────
const phones = ['+234 8034-982-305', '+234 7062-190-613', '+234 8135-621-997']

function OfficeCard({ title, address, delay }) {
  const [ref, visible] = useInView({ threshold: 0.1 })
  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Icon + title */}
      <div className="flex items-start gap-3">
        <div className="text-primary mt-0.5 flex-shrink-0"><IconPin /></div>
        <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
      </div>

      {/* Address */}
      <p className="font-body text-sm text-body leading-relaxed">{address}</p>

      {/* Phones */}
      <div className="flex flex-col gap-1">
        {phones.map((p) => (
          <a key={p} href={`tel:${p.replace(/\D/g, '')}`}
            className="flex items-center gap-2 font-body text-sm text-navy hover:text-primary transition-colors">
            <IconPhone />{p}
          </a>
        ))}
      </div>

      {/* Email */}
      <a href="mailto:info@antherconsulting.com.ng"
        className="flex items-center gap-2 font-body text-sm text-navy hover:text-primary transition-colors">
        <IconMail />info@antherconsulting.com.ng
      </a>
    </article>
  )
}

// ─── Contact form ─────────────────────────────────────────────────────────────
const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' }

function ContactForm() {
  const [form, setForm]     = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Full name is required.'
    if (!form.email.trim())   e.email   = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'Enter a valid email address.'
    if (!form.subject.trim()) e.subject = 'Subject is required.'
    if (!form.message.trim()) e.message = 'Message is required.'
    return e
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    // Clear error on change
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    try {
      const res = await apiFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setServerMsg(data.message)
        setForm(INITIAL)
      } else {
        setStatus('error')
        setServerMsg(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setServerMsg('Network error. Please check your connection and try again.')
    }
  }

  const field = (id, label, type = 'text', required = true) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-body text-sm font-medium text-navy">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id} name={id} type={type} value={form[id]}
        onChange={handleChange} autoComplete="off"
        className={`font-body text-sm px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-primary transition ${
          errors[id] ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'
        }`}
      />
      {errors[id] && <p className="font-body text-xs text-red-500">{errors[id]}</p>}
    </div>
  )

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-green-500 text-4xl mb-3">✓</div>
        <h3 className="font-heading text-xl font-semibold text-navy mb-2">Message Sent!</h3>
        <p className="font-body text-sm text-body">{serverMsg}</p>
        <button onClick={() => setStatus('idle')}
          className="mt-4 font-body text-sm text-primary hover:underline">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {field('name',    'Full Name')}
        {field('email',   'Email Address', 'email')}
        {field('phone',   'Phone Number',  'tel', false)}
        {field('subject', 'Subject')}
      </div>

      {/* Message textarea */}
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="font-body text-sm font-medium text-navy">
          Message<span className="text-red-500 ml-0.5">*</span>
        </label>
        <textarea
          id="message" name="message" rows={5} value={form.message}
          onChange={handleChange}
          className={`font-body text-sm px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-primary transition resize-y ${
            errors.message ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'
          }`}
        />
        {errors.message && <p className="font-body text-xs text-red-500">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-500 bg-red-50 border border-red-200 rounded px-4 py-3">
          {serverMsg}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="self-start inline-flex items-center gap-2 bg-primary text-white font-body font-semibold px-8 py-3.5 rounded hover:bg-primary/90 transition-colors duration-200 disabled:opacity-60">
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function Contact() {
  const offices = [
    { title: 'LAGOS OFFICE',  address: '139, Idimu-Ejigbo Road, Idimu, Lagos, Lagos State, Nigeria.' },
    { title: 'IBADAN OFFICE', address: 'Last floor, Anjola Oluwa house, Opposite Oando Filling station, Mokola Ibadan, Oyo State, Nigeria.' },
    { title: 'ABUJA OFFICE',  address: 'House 5, Second Avenue, Centage Estate, Apo, Abuja, F.C.T Nigeria.' },
  ]

  const socials = [
    { label: 'Facebook',  href: 'https://facebook.com',  Icon: IconFacebook  },
    { label: 'X',         href: 'https://x.com',         Icon: IconTwitterX  },
    { label: 'LinkedIn',  href: 'https://linkedin.com',  Icon: IconLinkedIn  },
    { label: 'Instagram', href: 'https://instagram.com', Icon: IconInstagram },
  ]

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Anther Consulting Limited. We have offices in Lagos, Ibadan, and Abuja. Call, email, or send us a message online."
        path="/contact-us"
      />

      {/* ── PAGE HERO ── */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
          <p className="font-body text-white/75 mt-2 text-sm">Home › Contact Us</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — Contact Detail Cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50" aria-label="Contact Details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeUp className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
              Contact Details
            </h2>
          </FadeUp>

          {/* Office cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {offices.map((o, i) => (
              <OfficeCard key={o.title} {...o} delay={i * 100} />
            ))}
          </div>

          {/* Social icons row */}
          <FadeUp delay={200} className="flex justify-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200">
                <Icon />
              </a>
            ))}
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — Contact Form
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" aria-label="Send Us a Message">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeUp className="mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">
              Send Us a Message
            </h2>
            <div className="mt-3 w-16 h-1 bg-primary rounded" />
          </FadeUp>

          <FadeUp delay={100}>
            <ContactForm />
          </FadeUp>

        </div>
      </section>
    </>
  )
}
