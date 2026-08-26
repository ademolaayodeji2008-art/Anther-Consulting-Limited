import SEO from '../components/SEO.jsx'
import useInView from '../hooks/useInView.js'
import whoWeAreImg from '../assets/who-we-are.webp'
import auditImg    from '../assets/service-audit.webp'

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

// ─── Detail item ─────────────────────────────────────────────────────────────
function DetailItem({ label, value }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
      <p className="font-body text-sm text-body leading-relaxed">
        <span className="font-semibold text-navy">{label}:</span>{' '}
        {value}
      </p>
    </div>
  )
}

// ─── Mission card ─────────────────────────────────────────────────────────────
function MissionCard({ Icon, title, text, highlight = false, delay = 0 }) {
  const [ref, visible] = useInView({ threshold: 0.1 })
  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`flex flex-col items-center text-center gap-4 p-8 rounded-lg border-2 transition-all duration-700 ease-out ${
        highlight ? 'border-primary shadow-md' : 'border-gray-200'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        <Icon />
      </div>
      <h3 className="font-heading text-xl font-semibold text-navy">{title}</h3>
      <p className="font-body text-sm text-body leading-relaxed">{text}</p>
    </article>
  )
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
function IconEye() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function IconBeliefs() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function IconScales() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="M6 6l-4 6h8L6 6z" />
      <path d="M18 6l-4 6h8l-4-6z" />
      <path d="M5 20h14" />
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Anther Consulting Limited — established 2013, providing accounting, tax, finance, audit, and HR consulting services across Nigeria."
        path="/about-us"
      />

      {/* ── PAGE HERO ── */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">About Us</h1>
          <p className="font-body text-white/75 mt-2 text-sm">Home › About Us</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — Intro (blue background, two-column)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-primary" aria-label="About introduction">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Left — boardroom/professional image */}
            <FadeUp>
              <img
                src={auditImg}
                alt="Professional finance team reviewing documents"
                className="w-full h-80 lg:h-full object-cover rounded-lg shadow-lg"
              />
            </FadeUp>

            {/* Right — person writing image + body text */}
            <FadeUp delay={120}>
              <div className="flex flex-col gap-6">
                <img
                  src={whoWeAreImg}
                  alt="Anther Consulting professional making notes"
                  className="w-full h-56 object-cover object-top rounded-lg shadow-lg"
                />
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Anther Consulting was established in the year 2013, with the name Anther
                  Consultancy Services, with the utmost aim of providing Accounting Services,
                  Tax Services, Finance services, Recovery, Financial modelling, I.T Services
                  and Human Resources management (Training and Retraining). We have served
                  several businesses in Nigeria in different capacity since inception and we
                  have thus acquired extensive knowledge and full understanding of these
                  varieties of services with our formidable and professional team. We are
                  fully blessed with young, vibrant, and experienced professional accountants,
                  Financial analysts and Tax Practitioners. We are the team of young and
                  energetic partners having positive approach to providing expert and
                  professional services with due care of professional ethics.
                </p>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Having based ourselves on features demanded by both small/medium-sized
                  companies and public entities, we have been able to draw commendable
                  solution for the going concern existence of entities through the adoption
                  of Standard Accounting, Applicable Frameworks, Tax law and Finance practices.
                </p>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — Company Overview
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" aria-label="Company Overview">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeUp className="text-center mb-10">
            <span className="font-body text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Core Values
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-2 uppercase tracking-wide">
              Company Overview
            </h2>
          </FadeUp>

          <FadeUp delay={100} className="mb-12">
            <p className="font-body text-body text-sm leading-relaxed text-center">
              Anther Consulting Limited (ACL) is more than just a consulting firm. We
              offer services as business consultants, helping businesses to restructure
              their financial reporting, analyze fiscal data in conformity with extant
              regulations and practices. ACL is one stop shop for all forms of business
              entities, Government ministries, agencies &amp; Parastatals. We offer real
              solutions and real value, based on practical adaptation of proven experience
              and professionalism. Drawing upon the resources and experiences, we are able
              to incorporate actual operating experiences into reports or advisory
              services. Anther Consulting Limited has become a leader in providing
              consulting or advisory services with respect to Accounting, Tax, Finance,
              Human Resources Management, and Account Automation.
            </p>
          </FadeUp>

          {/* Firm details — two columns */}
          <FadeUp delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-gray-50 rounded-xl p-8 border border-gray-100">
              {/* Left */}
              <div className="flex flex-col gap-4">
                <DetailItem label="NAME OF THE FIRM" value="Anther Consulting Limited (ACL)" />
                <DetailItem label="CAC REG. NO" value="Rc1739232" />
                <DetailItem label="Tax Identification Number" value="23758305-0001" />
                <DetailItem
                  label="Associates & Corporate Partners"
                  value="Ademola & Co (Chartered Accountants), Betterfield Treasure Services, Zarat Ranti & Co (Chartered Accountants)"
                />
              </div>
              {/* Right */}
              <div className="flex flex-col gap-4">
                <DetailItem label="Constitution" value="Partnership Firm" />
                <DetailItem label="No. of Partners" value="7 (seven)" />
                <DetailItem
                  label="Awards and Conferment"
                  value="Award of recognition by The Tax Club, University of Ibadan (UI), Ibadan, Oyo State"
                />
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — Mission Statement
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50" aria-label="Mission Statement">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeUp className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">
              Mission Statement
            </h2>
          </FadeUp>

          <FadeUp delay={80} className="mb-14">
            <p className="font-body text-body text-sm leading-relaxed text-center">
              Our purpose is to continually provide effective, affordable and flexible
              Accounting Services, Finance services, Assurance &amp; Investigation services,
              Tax advisory services &amp; management to help companies and Government agencies
              and parastatals achieve a competitive advantage, effectiveness, and
              efficiency through an engaged and motivated workforce. Our strength is the
              successful delivery of those services professionally, efficiently and with
              integrity. We believe in steady approach towards offering high quality
              professional services.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MissionCard
              Icon={IconEye}
              title="Vision"
              text="To be the best and leading Accounting and Tax consulting firm in Nigeria and the world at large."
              delay={0}
            />
            <MissionCard
              Icon={IconBeliefs}
              title="Our Beliefs"
              text="We belief in moral values and accept that there is no shortcut to quality professional services."
              delay={120}
            />
            <MissionCard
              Icon={IconScales}
              title="Our Ethics"
              text="We never compromise with the professional code of conduct; we abide by the professional ethics and would like to restrain ourselves from any conduct that might discredit to the profession."
              highlight
              delay={240}
            />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — Responsibility
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" aria-label="Our Responsibility">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <FadeUp className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">
              Our Responsibility Towards Nation
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <p className="font-body text-body text-sm leading-relaxed">
              We offer fast and reliable services in the area of Revenue Generation, Tax
              Consultancy, Auditing, Accountant certification, Business Formation
              Consultancy Services, Chartered Accounting Services, NGO/Trust etc. As a
              responsible professionals and a responsible citizen of Nigeria, we operate
              with due care and restrain ourselves from any act/conduct which may
              disrespect to our national values or Nigeria image.
            </p>
          </FadeUp>

        </div>
      </section>
    </>
  )
}
