import { Link } from 'react-router-dom'
import useInView from '../../hooks/useInView.js'

import taxImg       from '../../assets/service-tax.webp'
import accountingImg from '../../assets/service-accounting.webp'
import auditImg     from '../../assets/service-audit.webp'

const services = [
  {
    img:   taxImg,
    alt:   'Calculator and magnifying glass over budget sheet',
    title: 'Tax Management',
    titleBlue: false,
    text:  'We are experts in Revenue Generation for government at all level.',
  },
  {
    img:   accountingImg,
    alt:   'Coins stacked next to a calculator representing accounting',
    title: 'Accounting',
    titleBlue: true,
    text:  'Bookkeeping and good accounting system is a must-have for every entity.',
  },
  {
    img:   auditImg,
    alt:   'Spreadsheet with calculator and pen representing audit work',
    title: 'Audit, Investigation & Assurance',
    titleBlue: false,
    text:  'Informed decision making is the function of reliable information.',
  },
]

function ServiceCard({ img, alt, title, titleBlue, text, delay }) {
  const [ref, visible] = useInView({ threshold: 0.1 })

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Card image */}
      <div className="h-52 overflow-hidden">
        <img
          src={img}
          alt={alt}
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <h3 className={`font-heading text-xl font-semibold ${titleBlue ? 'text-primary' : 'text-navy'}`}>
          {title}
        </h3>
        <p className="font-body text-body text-sm leading-relaxed flex-1">{text}</p>
        <Link
          to="/services"
          className="font-body text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1 mt-auto"
        >
          Read More<span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default function OurServicesSection() {
  const [headingRef, headingVisible] = useInView({ threshold: 0.2 })

  return (
    <section className="py-20 bg-gray-50" aria-label="Our Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading block */}
        <div
          ref={headingRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-body text-sm font-semibold text-primary uppercase tracking-widest">
            What we do
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy mt-2">
            Our Services
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} {...svc} delay={i * 120} />
          ))}
        </div>

      </div>
    </section>
  )
}
