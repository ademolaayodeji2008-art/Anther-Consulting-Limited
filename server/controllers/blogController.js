import Blog from '../models/Blog.js'
import slugify from '../utils/slugify.js'

// GET /api/blog
export async function listPosts(_req, res) {
  try {
    const posts = await Blog.find({ published: true })
      .sort({ date: -1 })
      .select('-content')
      .lean()
    return res.json({ posts })
  } catch (err) {
    console.error('[Blog] listPosts:', err)
    return res.status(500).json({ error: 'Could not fetch posts.' })
  }
}

// GET /api/blog/:slug
export async function getPost(req, res) {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, published: true }).lean()
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    // Increment view counter (fire-and-forget)
    Blog.updateOne({ _id: post._id }, { $inc: { views: 1 } }).catch(() => {})
    return res.json({ post })
  } catch (err) {
    console.error('[Blog] getPost:', err)
    return res.status(500).json({ error: 'Could not fetch post.' })
  }
}
