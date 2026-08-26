/**
 * SEO — per-page head management via react-helmet-async.
 * Wrap any page with <SEO title="..." description="..." /> to set
 * the document title, meta description, and Open Graph tags.
 */
import { Helmet } from 'react-helmet-async'

const SITE_NAME  = 'Anther Consulting Limited'
const BASE_URL   = import.meta.env.VITE_SITE_URL ?? 'https://antherconsulting.com.ng'
const OG_IMAGE   = `${BASE_URL}/og-image.png`

export default function SEO({
  title,
  description,
  path = '',
  image = OG_IMAGE,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Expert Accounting, Tax & Business Consulting in Nigeria`

  const canonicalUrl = `${BASE_URL}${path}`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
    </Helmet>
  )
}
