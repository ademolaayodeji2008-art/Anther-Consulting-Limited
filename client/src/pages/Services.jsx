import SEO from '../components/SEO.jsx'
import Accordion from '../components/Accordion.jsx'
import useInView from '../hooks/useInView.js'

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

// ─── Accordion items ──────────────────────────────────────────────────────────
// TODO: Replace these short placeholder descriptions with the full expanded
//       service copy once the client supplies the detailed text for each service.
const serviceItems = [
  {
    title: 'Tax Management & Revenue Generation',
    content:
      'We are experts in Revenue Generation for government at all level.',
  },
  {
    title: 'Accounting',
    content:
      'Bookkeeping and good accounting system is a must-have for every entity.',
  },
  {
    title: 'Audit, Investigation & Assurance',
    content:
      'Informed decision making is the function of reliable information.',
  },
  {
    title: 'Human Resources Management',
    content:
      'Proper Human Resources Management is a must for any organization that wants to thrive.',
  },
  {
    title: 'IT Consulting Services',
    content:
      'We simply save you the stress of keeping track of your accounting transactions through tech.',
  },
  {
    title: 'Excess Bank Charges',
    content:
      'We unveil unnecessary charges and taxes deducted illegally by banks.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
export default function Services() {
  return (
    <>
      <SEO
        title="Our Services"
        description="Anther Consulting provides tax management, accounting, audit & assurance, HR management, IT consulting, and excess bank charges recovery services in Nigeria."
        path="/services"
      />

      {/* ── PAGE HERO ── */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Our Services
          </h1>
          <p className="font-body text-white/75 mt-2 text-sm">Home › Services</p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 bg-white" aria-label="Services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* ── Left: heading + intro text ── */}
            <FadeUp>
              <div className="flex flex-col gap-6">
                {/* Heading with blue underline */}
                <div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight">
                    Our Services
                  </h2>
                  {/* Short blue underline accent */}
                  <div className="mt-3 w-16 h-1 bg-primary rounded" />
                </div>

                <p className="font-body text-body text-sm leading-relaxed">
                  The firm is engaged in certain lines of action; Corporate Law, Secretarial
                  Compliances, Tax Matters, Audit and Accountancy covering a wide range of
                  sub-activities related to the profession. The major and significant
                  activities and services taken care of by our firm are as follows:
                </p>

                {/* Service imagery grid — reuse existing images as visual support */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    { src: '/src/assets/service-tax.webp',        alt: 'Tax management' },
                    { src: '/src/assets/service-accounting.webp', alt: 'Accounting services' },
                    { src: '/src/assets/service-audit.webp',      alt: 'Audit services' },
                    { src: '/src/assets/service-it.webp',         alt: 'IT consulting' },
                  ].map((img) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-32 object-cover rounded-lg shadow-sm"
                    />
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* ── Right: accordion ── */}
            <FadeUp delay={150}>
              <Accordion items={serviceItems} defaultOpen={0} />
            </FadeUp>

          </div>
        </div>
      </section>
    </>
  )
}
