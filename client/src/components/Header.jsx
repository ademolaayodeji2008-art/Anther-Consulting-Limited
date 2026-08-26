import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

const navLinks = [
  { label: 'Home',         to: '/' },
  { label: 'About Us',     to: '/about-us' },
  { label: 'Services',     to: '/services' },
  { label: 'Blog',         to: '/blog' },
  { label: 'Our Clients',  to: '/our-clients' },
  { label: 'Our Partners', to: '/partners-and-team' },
  { label: 'Contact Us',   to: '/contact-us' },
]


// Nav link class helper — active = blue text + blue border box
function navClass({ isActive }) {
  if (isActive) {
    return 'font-body text-sm font-medium text-primary border border-primary rounded px-3 py-1 transition-colors duration-200'
  }
  return 'font-body text-sm font-medium text-navy hover:text-primary transition-colors duration-200 px-3 py-1'
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add subtle shadow when page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <NavLink
            to="/"
            className="flex items-center flex-shrink-0"
            aria-label="Anther Consulting Limited — home"
          >
            <img
              src={logo}
              alt="Anther Consulting Limited"
              className="h-12 w-auto object-contain"
            />
          </NavLink>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={navClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Hamburger (mobile) ── */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-6 h-0.5 bg-navy transition-transform duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-navy transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-navy transition-transform duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-body text-sm font-medium py-2.5 px-3 rounded transition-colors duration-200 ${
                  isActive
                    ? 'text-primary border border-primary'
                    : 'text-navy hover:text-primary hover:bg-gray-50'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
