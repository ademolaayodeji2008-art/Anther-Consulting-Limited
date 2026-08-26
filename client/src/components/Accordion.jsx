/**
 * Accordion — reusable collapsible list component.
 *
 * Props:
 *   items      — array of { title: string, content: string | ReactNode }
 *   defaultOpen — index of item open by default (optional)
 *
 * Style: solid primary-blue header bar, white chevron rotates 180° when open,
 * smooth max-height transition on the panel.
 */
import { useState } from 'react'

function ChevronDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Accordion({ items = [], defaultOpen = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="rounded overflow-hidden shadow-sm">
            {/* ── Header bar ── */}
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-5 py-4 bg-primary text-white text-left transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            >
              <span className="font-body font-semibold text-sm sm:text-base pr-4">
                {item.title}
              </span>
              <span
                className="flex-shrink-0 transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <ChevronDown />
              </span>
            </button>

            {/* ── Panel — smooth height transition via max-height ── */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out bg-white border border-t-0 border-gray-200"
              style={{ maxHeight: isOpen ? '600px' : '0px' }}
              aria-hidden={!isOpen}
            >
              <div className="px-5 py-4 font-body text-body text-sm leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
