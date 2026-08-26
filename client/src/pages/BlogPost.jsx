import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { apiFetch } from '../lib/api.js'
import { resolveBlogImage } from '../lib/blogImages.js'

// ─── Render plain text with markdown-like **bold** and \n\n paragraphs ────────
function RichContent({ text }) {
  const paragraphs = text.split('\n\n').filter(Boolean)
  return (
    <div className="flex flex-col gap-5">
      {paragraphs.map((para, i) => {
        // Heading: lines starting with **text**
        if (para.startsWith('**') && para.endsWith('**')) {
          return (
            <h3 key={i} className="font-heading text-xl font-semibold text-navy mt-2">
              {para.replace(/\*\*/g, '')}
            </h3>
          )
        }
        // Inline bold within a paragraph
        const parts = para.split(/(\*\*[^*]+\*\*)/)
        return (
          <p key={i} className="font-body text-sm text-body leading-relaxed">
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="text-navy font-semibold">{part.replace(/\*\*/g, '')}</strong>
                : part
            )}
          </p>
        )
      })}
    </div>
  )
}

// ─── Category badge ───────────────────────────────────────────────────────────
function CategoryBadge({ label }) {
  return (
    <span className="inline-block font-body text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded uppercase tracking-wide">
      {label}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    apiFetch(`/api/blog/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error('Post not found')
        return r.json()
      })
      .then((data) => { setPost(data.post); setLoading(false) })
      .catch((e) => { setError(e.message); setLoading(false) })
  }, [slug])

  return (
    <>
      <SEO
        title={post ? post.title : error ? '404 — Post Not Found' : 'Loading…'}
        description={post ? post.excerpt : 'Read insights and articles from Anther Consulting Limited.'}
        path={`/blog/${slug}`}
      />

      {/* ── PAGE HERO ── */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-snug max-w-3xl">
            {loading ? 'Loading…' : error ? 'Article Not Found' : post?.title}
          </h1>
          <p className="font-body text-white/75 mt-2 text-sm">
            <Link to="/blog" className="hover:text-white transition-colors">Home › Blog</Link>
            {post && <span> › {post.title}</span>}
          </p>
        </div>
      </div>

      <div className="py-16 bg-white min-h-[50vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Loading spinner */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="font-body text-body mb-6">{error}</p>
              <Link to="/blog"
                className="inline-flex items-center gap-2 bg-primary text-white font-body font-semibold px-6 py-3 rounded hover:bg-primary/90 transition-colors">
                ← Back to Blog
              </Link>
            </div>
          )}

          {/* Post content */}
          {post && !loading && (
            <>
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <CategoryBadge label={post.category} />
                <time dateTime={post.date} className="font-body text-xs text-body">
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </time>
                <span className="font-body text-xs text-body">By {post.author}</span>
              </div>

              {/* Featured image */}
              <div className="rounded-xl overflow-hidden mb-10 shadow-sm">
                <img
                  src={resolveBlogImage(post.image)}
                  alt={post.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>

              {/* Body */}
              <article>
                <RichContent text={post.content} />
              </article>

              {/* Back link */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <Link to="/blog"
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:underline">
                  <span aria-hidden="true">←</span> Back to Blog
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  )
}
