/**
 * TeamCard — partner / team member card.
 *
 * Props:
 *   name       string   — full name
 *   role       string   — position / title
 *   image      string?  — optional photo src; shows avatar initials if omitted
 *   highlight  bool?    — blue border accent (reference design: Ajulo B. Olajide)
 *   linkedin   string?  — optional LinkedIn profile URL
 */

// LinkedIn icon
function IconLinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

// Profile / contact icon
function IconProfile() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export default function TeamCard({ name, role, image, highlight = false, linkedin }) {
  // Derive initials from name for the avatar fallback
  const initials = name
    ?.split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() ?? '?'

  return (
    <div
      className={`bg-white rounded-xl shadow-sm flex flex-col items-center text-center p-6 gap-4 transition-shadow duration-200 hover:shadow-md border-2 ${
        highlight ? 'border-primary' : 'border-transparent'
      }`}
    >
      {/* Avatar */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center flex-shrink-0">
          {/* Silhouette SVG person icon */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1414F0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
      )}

      {/* Name + role */}
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-base font-semibold text-navy leading-snug">
          {name}
        </h3>
        <p className="font-body text-xs text-body leading-relaxed">{role}</p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-auto">
        <a
          href={linkedin ?? '#'}
          target={linkedin ? '_blank' : undefined}
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200"
        >
          <IconLinkedIn />
        </a>
        <button
          type="button"
          aria-label={`View ${name}'s profile`}
          className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200"
        >
          <IconProfile />
        </button>
      </div>
    </div>
  )
}
