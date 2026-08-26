import useInView from '../../hooks/useInView.js'
import itImg from '../../assets/service-it.webp'

// ── White SVG icons ───────────────────────────────────────────────────────────

function IconHR() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconIT() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  )
}

function IconBank() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 22h18" />
      <path d="M3 10h18" />
      <path d="M5 10V6l7-4 7 4v4" />
      <path d="M5 22v-4" />
      <path d="M19 22v-4" />
      <path d="M9 22v-8" />
      <path d="M15 22v-8" />
    </svg>
  )
}

// ── Individual card ───────────────────────────────────────────────────────────

function OtherServiceCard({ Icon, title, text, delay, bgImage }) {
  const [ref, visible] = useInView({ threshold: 0.1 })

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`relative bg-primary rounded-lg overflow-hidden flex flex-col items-start p-8 gap-4 transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Optional subtle background image overlay for IT card */}
      {bgImage && (
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 flex flex-col gap-4">
        <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
          <Icon />
        </div>
        <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
        <p className="font-body text-sm text-white/85 leading-relaxed">{text}</p>
      </div>
    </article>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function OtherServicesSection() {
  const [headingRef, headingVisible] = useInView({ threshold: 0.2 })

  const cards = [
    {
      Icon: IconHR,
      title: 'HR Management',
      text: 'Proper Human Resources Management is a must for any organization that wants to thrive.',
    },
    {
      Icon: IconIT,
      title: 'IT Consulting Services',
      text: 'We simply save you the stress of keeping track of your accounting transactions through tech.',
      bgImage: itImg,
    },
    {
      Icon: IconBank,
      title: 'Excess Bank Charges',
      text: 'We unveil unnecessary charges and taxes deducted illegally by banks.',
    },
  ]

  return (
    <section className="py-20 bg-white" aria-label="Other Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={headingRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy">
            Other Services
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <OtherServiceCard key={card.title} {...card} delay={i * 120} />
          ))}
        </div>

      </div>
    </section>
  )
}
