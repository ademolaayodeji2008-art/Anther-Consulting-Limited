import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for does not exist."
        path="/404"
      />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center gap-6">
        {/* Large 404 */}
        <p
          className="font-heading font-bold text-primary select-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', lineHeight: 1 }}
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy">
          Page Not Found
        </h1>

        <p className="font-body text-body text-base max-w-md">
          The page you are looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white font-body font-semibold px-7 py-3 rounded hover:bg-primary/90 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-body font-semibold px-7 py-3 rounded hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  )
}
