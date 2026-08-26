/**
 * ServiceCard — displays a single service offering
 * Props: title, description, icon (optional React node)
 */
export default function ServiceCard({ title, description, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      {icon && (
        <div className="text-primary text-3xl">{icon}</div>
      )}
      <h3 className="font-heading text-lg font-semibold text-navy">{title}</h3>
      <p className="font-body text-sm text-body leading-relaxed">{description}</p>
    </div>
  )
}
