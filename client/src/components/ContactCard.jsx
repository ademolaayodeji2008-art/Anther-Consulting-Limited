/**
 * ContactCard — displays a single contact detail (address, phone, email, etc.)
 * Props: label, value, icon (optional React node), href (optional, wraps value in anchor)
 */
export default function ContactCard({ label, value, icon, href }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      {icon && (
        <div className="text-primary text-2xl mt-0.5 flex-shrink-0">{icon}</div>
      )}
      <div>
        <p className="font-body text-xs text-body uppercase tracking-wider mb-1">{label}</p>
        {href ? (
          <a href={href} className="font-body text-navy font-medium hover:text-primary transition-colors">
            {value}
          </a>
        ) : (
          <p className="font-body text-navy font-medium">{value}</p>
        )}
      </div>
    </div>
  )
}
