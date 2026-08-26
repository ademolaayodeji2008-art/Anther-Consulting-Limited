import { Link } from 'react-router-dom'
import heroBg from '../../assets/hero-building.webp'

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchpriority="high"
      />

      {/* Dark navy + blue gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(10,26,60,0.82) 0%, rgba(20,20,240,0.55) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
          Expert Consulting, Real Solutions, Lasting Value
        </h1>

        <p className="font-body text-lg sm:text-xl text-white/85 max-w-2xl">
          we provide actionable solutions that drive growth and efficiency
        </p>

        <Link
          to="/contact-us"
          className="mt-2 inline-flex items-center gap-2 bg-primary text-white font-body font-semibold px-8 py-3.5 rounded hover:bg-primary/90 transition-colors duration-200 shadow-lg text-base"
        >
          Contact Us <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
