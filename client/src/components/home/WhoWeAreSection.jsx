import { Link } from 'react-router-dom'
import whoWeAreImg from '../../assets/who-we-are.webp'
import useInView from '../../hooks/useInView.js'

export default function WhoWeAreSection() {
  const [ref, visible] = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className={`py-20 bg-white transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Who We Are"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy leading-tight">
              Who We Are
            </h2>

            <p className="font-body text-body text-base leading-relaxed">
              Anther Consulting was established in the year 2013, with the utmost aim of
              providing Accounting Services, Tax Services, Finance services, Financial
              modelling, and Human Resources management (Training and Retraining). We have
              served several businesses in Nigeria in different capacity since inception
              and we have thus acquired extensive knowledge and full understanding of these
              varieties of services with formidable and professional team.
            </p>

            <div>
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 bg-primary text-white font-body font-semibold px-7 py-3 rounded hover:bg-primary/90 transition-colors duration-200"
              >
                Know More about Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Right — image: pb-4 pr-4 makes room for the border that sits behind */}
          <div className="relative pb-4 pr-4">
            <img
              src={whoWeAreImg}
              alt="Anther Consulting professional reviewing documents"
              loading="lazy"
              decoding="async"
              className="w-full h-[420px] object-cover object-center rounded-lg shadow-xl relative z-10"
            />
            {/* Decorative blue accent border — behind image, offset bottom-right */}
            <div className="absolute bottom-0 right-0 w-full h-full border-4 border-primary rounded-lg z-0" />
          </div>

        </div>
      </div>
    </section>
  )
}
