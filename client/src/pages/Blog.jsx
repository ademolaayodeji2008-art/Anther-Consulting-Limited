import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import useInView from '../hooks/useInView.js'
import { apiFetch } from '../lib/api.js'

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-6 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="h-5 w-20 bg-gray-200 rounded" />
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-full  bg-gray-200 rounded" />
        <div className="h-4 w-5/6  bg-gray-200 rounded" />
        <div className="h-4 w-16   bg-gray-200 rounded mt-2" />
      </div>
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

// ─── Post card ────────────────────────────────────────────────────────────────
function PostCard({ post, delay }) {
  const [ref, visible] = useInView({ threshold: 0.08 })
  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-700 ease-out hover:shadow-md ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-3 p-6 flex-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CategoryBadge label={post.category} />
          <time dateTime={post.date} className="font-body text-xs text-body">
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric',
            })}
          </time>
        </div>
        <h2 className="font-heading text-lg font-semibold text-navy leading-snug">
          {post.title}
        </h2>
        <p className="font-body text-sm text-body leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 font-body text-sm font-semibold text-primary hover:underline mt-auto"
        >
          Read More <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function Blog() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    apiFetch('/api/blog')
      .then((r) => r.json())
      .then((data) => { setPosts(data.posts ?? []); setLoading(false) })
      .catch(() => { setError('Could not load posts. Please try again later.'); setLoading(false) })
  }, [])

  return (
    <>
      <SEO
        title="Insights & Updates"
        description="Read the latest articles, tax tips, accounting advice, and business insights from the Anther Consulting Limited team."
        path="/blog"
      />

      {/* ── PAGE HERO ── */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Insights &amp; Updates
          </h1>
          <p className="font-body text-white/80 mt-2 text-base max-w-xl">
            News, articles, and expert commentary from the Anther Consulting team
          </p>
        </div>
      </div>

      {/* ── POST GRID ── */}
      <section className="py-20 bg-gray-50 min-h-[50vh]" aria-label="Blog posts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Skeleton loaders */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
            </div>
          )}

          {error && (
            <p className="text-center font-body text-body py-20">{error}</p>
          )}

          {!loading && !error && posts.length === 0 && (
            <p className="text-center font-body text-body py-20">No posts yet. Check back soon.</p>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} delay={i * 100} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  )
}
