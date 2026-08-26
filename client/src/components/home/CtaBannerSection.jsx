import { Link } from 'react-router-dom'
import useInView from '../../hooks/useInView.js'

export default function CtaBannerSection() {
  const [ref, visible] = useInView({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      className={`py-20 bg-white border-t border-gray-100 transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Call to action"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Text block */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight">
              We offer{' '}
              <span className="text-primary">real solutions</span>
              {' '}and{' '}
              <span className="text-primary">real value</span>
            </h2>
            <p className="font-body text-body text-base leading-relaxed">
              We offer real solutions and real value, based on practical adaptation of
              proven experience and professionalism.
            </p>
          </div>

          {/* CTA button */}
          <div className="flex-shrink-0">
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 bg-primary text-white font-body font-semibold px-8 py-4 rounded hover:bg-primary/90 transition-colors duration-200 shadow-md text-base whitespace-nowrap"
            >
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
