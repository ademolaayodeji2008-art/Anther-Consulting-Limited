/**
 * Button — reusable branded button component
 * Props:
 *   variant: 'primary' | 'outline'  (default: 'primary')
 *   as: 'button' | 'a' | 'link'     (default: 'button')
 *   href: string                     (when as='a')
 *   to: string                       (when as='link', uses React Router)
 *   children, className, ...rest
 */
import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-primary text-white hover:opacity-90',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
}

export default function Button({
  variant = 'primary',
  as = 'button',
  href,
  to,
  children,
  className = '',
  ...rest
}) {
  const base =
    'font-body font-semibold px-6 py-3 rounded transition-all duration-200 inline-block'
  const classes = `${base} ${variants[variant]} ${className}`

  if (as === 'a') {
    return <a href={href} className={classes} {...rest}>{children}</a>
  }
  if (as === 'link') {
    return <Link to={to} className={classes} {...rest}>{children}</Link>
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
