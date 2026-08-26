/**
 * blogImages.js — maps image keys to their Vite-bundled asset URLs.
 *
 * Blog posts in MongoDB store a short key (e.g. "service-tax") instead of
 * a full path. This module resolves those keys to the correct hashed URLs
 * that Vite generates at build time, so images work in production.
 */
import serviceTax        from '../assets/service-tax.webp'
import serviceAccounting from '../assets/service-accounting.webp'
import serviceAudit      from '../assets/service-audit.webp'
import serviceIT         from '../assets/service-it.webp'
import heroBuild         from '../assets/hero-building.webp'

const imageMap = {
  // Short keys (new format stored in MongoDB going forward)
  'service-tax':        serviceTax,
  'service-accounting': serviceAccounting,
  'service-audit':      serviceAudit,
  'service-it':         serviceIT,
  'hero-building':      heroBuild,

  // Legacy full paths (seeded posts in MongoDB still have these)
  '/src/assets/service-tax.webp':        serviceTax,
  '/src/assets/service-accounting.webp': serviceAccounting,
  '/src/assets/service-audit.webp':      serviceAudit,
  '/src/assets/service-it.webp':         serviceIT,
  '/src/assets/hero-building.webp':      heroBuild,
}

/**
 * Resolves a blog post image field to a usable URL.
 * Falls back to the tax image if the key is unknown.
 */
export function resolveBlogImage(imageField) {
  if (!imageField) return serviceTax
  return imageMap[imageField] ?? serviceTax
}
