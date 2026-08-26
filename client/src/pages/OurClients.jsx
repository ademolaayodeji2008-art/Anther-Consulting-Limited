import SEO from '../components/SEO.jsx'
import Accordion from '../components/Accordion.jsx'
import useInView from '../hooks/useInView.js'
import heroBg from '../assets/hero-building.webp'

// ─── Shared fade-up wrapper ───────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView({ threshold: 0.08 })
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

const sectorItems = [
  {
    title: 'Sectors We Serve',
    content: (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-body">
        {[
          'Government Ministries, Departments & Agencies',
          'Manufacturing & Production',
          'Banking & Financial Services',
          'Oil & Gas / Energy',
          'Real Estate & Construction',
          'Education & Non-Governmental Organisations (NGOs)',
          'Healthcare & Pharmaceuticals',
          'Retail & Fast-Moving Consumer Goods (FMCG)',
          'Technology & Telecommunications',
          'Agriculture & Agro-processing',
          'Hospitality & Tourism',
          'Professional Services & Consulting',
        ].map((sector) => (
          <li key={sector} className="flex items-start gap-2">
            <span className="text-primary mt-0.5 flex-shrink-0">›</span>
            {sector}
          </li>
        ))}
      </ul>
    ),
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
export default function OurClients() {
  return (
    <>
      <SEO
        title="Our Clients"
        description="Anther Consulting serves ministries, agencies, and businesses across Nigeria. Learn about our client approach and the sectors we work in."
        path="/our-clients"
      />

      {/* ── PAGE HERO ── */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Our Clients
          </h1>
          <p className="font-body text-white/75 mt-2 text-sm">Home › Our Clients</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — "We as an Experts" with watermark text
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-white overflow-hidden" aria-label="We as an Experts">

        {/* Large watermark "Clients" text */}
        <span
          className="absolute inset-0 flex items-center justify-center font-heading font-bold text-gray-100 select-none pointer-events-none"
          aria-hidden="true"
          style={{ fontSize: 'clamp(6rem, 20vw, 16rem)', lineHeight: 1 }}
        >
          Clients
        </span>

        {/* Foreground content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp className="mb-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">
              We as an Experts
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <p className="font-body text-body text-sm leading-relaxed">
              Anther Consulting Limited (ACL) regularly present their views and opinion
              through various article or media. Invited many times by National Radio
              Broadcast Channel in Nigeria for expert opinion for shows on Budget, Tax
              Matters, Road side awareness on Tax, Live discussions Accounting, Auditing
              &amp; Assurance.
            </p>
          </FadeUp>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — Clients and Our Attention (gray bg, two-col + accordion)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50" aria-label="Clients and Our Attention">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Two-column: heading left, text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">

            <FadeUp>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight">
                Clients and Our Attention
              </h2>
            </FadeUp>

            <FadeUp delay={120}>
              <p className="font-body text-body text-sm leading-relaxed">
                Our clients and potential clients includes Ministries, Agencies, domestic
                and international entities of various sizes from different industries. The
                young and dynamic partners of Anther Consulting have incredible foresight,
                financial acumen and enterprising spirit. To ensure confidentiality and
                professional ethics, names and nature of business of clients cannot be
                disclosed. However, our firm has rich experience in the field of Audit,
                Taxation, Consultancy, Human Resource Trainings, Certification, Legal
                opinion, Excess Bank Recovery, Revenue Generation etc.
              </p>
            </FadeUp>

          </div>

          {/* Centered sectors accordion */}
          <FadeUp delay={200}>
            <div className="max-w-2xl mx-auto">
              <Accordion items={sectorItems} />
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — CTA Banner with dark image overlay
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" aria-label="Contact CTA">

        {/* Background image */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark gradient overlay — navy left, deep blue right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(10,26,60,0.90) 0%, rgba(20,0,235,0.80) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Left text */}
            <FadeUp className="max-w-xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
                Need any help with projects?
              </h2>
            </FadeUp>

            {/* Right CTA button */}
            <FadeUp delay={150} className="flex-shrink-0">
              <a
                href="mailto:info@antherconsulting.com.ng"
                className="inline-flex items-center gap-2 bg-white text-navy font-body font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors duration-200 shadow-lg text-base"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Send Email
              </a>
            </FadeUp>

          </div>
        </div>

      </section>
    </>
  )
}
