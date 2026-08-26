import SEO from '../components/SEO.jsx'
import TeamCard from '../components/TeamCard.jsx'
import useInView from '../hooks/useInView.js'
import { partners, managementStaff, trainees } from '../data/partners.js'

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

// ─── Simple staff list item ───────────────────────────────────────────────────
function StaffItem({ name, qualifications }) {
  return (
    <li className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
      <span className="font-body text-sm text-navy">
        {name}
        {qualifications && (
          <span className="text-body ml-1">({qualifications})</span>
        )}
      </span>
    </li>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function OurPartners() {
  return (
    <>
      <SEO
        title="Our Partners & Team"
        description="Meet the Anther Consulting Limited team — 7 expert partners and a dedicated management staff delivering professional accounting and tax services across Nigeria."
        path="/partners-and-team"
      />

      {/* ── PAGE HERO ── */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Our Partners &amp; Team
          </h1>
          <p className="font-body text-white/75 mt-2 text-sm">Home › Partners &amp; Team</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — Partner cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" aria-label="Our Team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <FadeUp className="text-center mb-12">
            <span className="font-body text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Meet
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2">
              Our Team
            </h2>
          </FadeUp>

          {/* Partner grid — 3 cols desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, i) => (
              <FadeUp key={partner.id} delay={i * 80}>
                <TeamCard
                  name={partner.name}
                  role={partner.role}
                  highlight={partner.highlight}
                />
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — Management Staff & Trainees
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50" aria-label="Management Staff and Trainees">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ── Left: Management Staff ── */}
            <FadeUp>
              <div>
                <span className="font-body text-xs uppercase tracking-widest text-gray-400 font-semibold">
                  Meet
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-2 mb-6">
                  Management Staff
                </h2>
                <ul className="divide-y divide-gray-100">
                  {managementStaff.map((s) => (
                    <StaffItem key={s.id} name={s.name} qualifications={s.qualifications} />
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* ── Right: Trainees ── */}
            <FadeUp delay={150}>
              <div>
                <span className="font-body text-xs uppercase tracking-widest text-gray-400 font-semibold">
                  Meet
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-2 mb-6">
                  Trainee
                </h2>
                <ul className="divide-y divide-gray-100">
                  {trainees.map((t) => (
                    <StaffItem key={t.id} name={t.name} qualifications={t.qualifications} />
                  ))}
                </ul>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>
    </>
  )
}
