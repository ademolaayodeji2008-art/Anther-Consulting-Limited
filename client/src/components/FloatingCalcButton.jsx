import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function IconCalc() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Calculator body */}
      <rect x="4" y="2" width="16" height="20" rx="2" />
      {/* Display bar */}
      <line x1="8" y1="6" x2="16" y2="6" />
      {/* Keypad buttons — 3 columns × 4 rows */}
      <line x1="8"  y1="11" x2="8"  y2="11" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="11" x2="12" y2="11" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="11" x2="16" y2="11" strokeWidth="3" strokeLinecap="round" />
      <line x1="8"  y1="14" x2="8"  y2="14" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="14" x2="12" y2="14" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="14" x2="16" y2="14" strokeWidth="3" strokeLinecap="round" />
      <line x1="8"  y1="17" x2="8"  y2="17" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="17" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="17" x2="16" y2="17" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function FloatingCalcButton() {
  const [visible,   setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [tooltip,   setTooltip]   = useState(true)

  // Show button after a short delay, hide tooltip after 6 s
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1200)
    const t2 = setTimeout(() => setTooltip(false), 6000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      role="region"
      aria-label="Tax calculator shortcut"
    >
      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss calculator button"
        className="w-5 h-5 rounded-full bg-gray-400 hover:bg-gray-500 text-white text-xs flex items-center justify-center transition-colors leading-none"
      >
        ×
      </button>

      {/* Tooltip */}
      {tooltip && (
        <div className="bg-white text-navy font-body text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-gray-100 max-w-[180px] text-right animate-fade-in">
          Free Tax Calculators
        </div>
      )}

      {/* Main button */}
      <Link
        to="/tax-calculators"
        aria-label="Go to free tax calculators"
        className="relative w-14 h-14 rounded-full bg-[#1414F0] text-white flex items-center justify-center shadow-lg hover:bg-[#1010c8] transition-colors duration-200"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#1414F0] animate-ping opacity-30" />
        <span className="absolute inset-0 rounded-full bg-[#1414F0] animate-ping opacity-20 animation-delay-300" />
        <IconCalc />
      </Link>
    </div>
  )
}
