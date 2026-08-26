import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Blog from '../models/Blog.js'
import Contact from '../models/Contact.js'
import Subscriber from '../models/Subscriber.js'
import PageView from '../models/PageView.js'
import slugify from '../utils/slugify.js'

// ── Auth ──────────────────────────────────────────────────────────────────────

// POST /api/admin/login
export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' })

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' })

    const valid = await user.comparePassword(password)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials.' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )
    return res.json({ token, user })
  } catch (err) {
    console.error('[Admin] Login error:', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}

// GET /api/admin/me
export async function me(req, res) {
  return res.json({ user: req.user })
}

// POST /api/admin/change-password
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword)
      return res.status(400).json({ error: 'Both current and new password are required.' })
    if (newPassword.length < 8)
      return res.status(400).json({ error: 'New password must be at least 8 characters.' })

    const user = await User.findById(req.user._id)
    const valid = await user.comparePassword(currentPassword)
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect.' })

    user.password = newPassword
    await user.save()
    return res.json({ success: true, message: 'Password updated.' })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error.' })
  }
}

// ── Dashboard stats ───────────────────────────────────────────────────────────

// GET /api/admin/stats
export async function stats(req, res) {
  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo  = new Date(now - 7  * 24 * 60 * 60 * 1000)

    const [
      totalPosts, totalContacts, totalSubscribers,
      unreadContacts, recentContacts, recentSubscribers,
      totalViews, recentViews, topPages,
    ] = await Promise.all([
      Blog.countDocuments({ published: true }),
      Contact.countDocuments(),
      Subscriber.countDocuments({ active: true }),
      Contact.countDocuments({ read: false }),
      Contact.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Subscriber.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      PageView.countDocuments(),
      PageView.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      PageView.aggregate([
        { $group: { _id: '$path', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { path: '$_id', count: 1, _id: 0 } },
      ]),
    ])

    // Daily view counts for the last 30 days
    const dailyViews = await PageView.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      }},
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', count: 1, _id: 0 } },
    ])

    return res.json({
      totalPosts, totalContacts, totalSubscribers,
      unreadContacts, recentContacts, recentSubscribers,
      totalViews, recentViews, topPages, dailyViews,
    })
  } catch (err) {
    console.error('[Admin] stats error:', err)
    return res.status(500).json({ error: 'Could not fetch stats.' })
  }
}

// ── Blog CRUD ─────────────────────────────────────────────────────────────────

// GET /api/admin/blogs  — all posts (incl. unpublished)
export async function listAllPosts(_req, res) {
  try {
    const posts = await Blog.find().sort({ date: -1 }).select('-content').lean()
    return res.json({ posts })
  } catch (err) {
    return res.status(500).json({ error: 'Could not fetch posts.' })
  }
}

// GET /api/admin/blogs/:id
export async function getPostById(req, res) {
  try {
    const post = await Blog.findById(req.params.id).lean()
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    return res.json({ post })
  } catch (err) {
    return res.status(500).json({ error: 'Could not fetch post.' })
  }
}

// POST /api/admin/blogs
export async function createPost(req, res) {
  try {
    const { title, category, excerpt, content, image, author, date, published } = req.body
    if (!title || !category || !excerpt || !content)
      return res.status(400).json({ error: 'title, category, excerpt, and content are required.' })

    const slug = slugify(title)
    const existing = await Blog.findOne({ slug })
    if (existing) return res.status(409).json({ error: `A post with slug "${slug}" already exists.` })

    const post = await Blog.create({
      slug, title, category, excerpt, content,
      image: image ?? '/src/assets/service-tax.webp',
      author: author ?? 'Anther Consulting Team',
      date: date ? new Date(date) : new Date(),
      published: published ?? true,
    })
    return res.status(201).json({ post })
  } catch (err) {
    console.error('[Admin] createPost:', err)
    return res.status(500).json({ error: 'Could not create post.' })
  }
}

// PUT /api/admin/blogs/:id
export async function updatePost(req, res) {
  try {
    const { title, category, excerpt, content, image, author, date, published } = req.body
    const update = {}
    if (title     !== undefined) { update.title = title; update.slug = slugify(title) }
    if (category  !== undefined) update.category  = category
    if (excerpt   !== undefined) update.excerpt   = excerpt
    if (content   !== undefined) update.content   = content
    if (image     !== undefined) update.image     = image
    if (author    !== undefined) update.author    = author
    if (date      !== undefined) update.date      = new Date(date)
    if (published !== undefined) update.published = published

    const post = await Blog.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true })
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    return res.json({ post })
  } catch (err) {
    return res.status(500).json({ error: 'Could not update post.' })
  }
}

// DELETE /api/admin/blogs/:id
export async function deletePost(req, res) {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    return res.json({ success: true, message: 'Post deleted.' })
  } catch (err) {
    return res.status(500).json({ error: 'Could not delete post.' })
  }
}

// ── Contacts ──────────────────────────────────────────────────────────────────

// GET /api/admin/contacts
export async function listContacts(req, res) {
  try {
    const page  = Math.max(1, parseInt(req.query.page  ?? '1'))
    const limit = Math.min(50, parseInt(req.query.limit ?? '20'))
    const skip  = (page - 1) * limit
    const filter = req.query.unread === 'true' ? { read: false } : {}

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(filter),
    ])
    return res.json({ contacts, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    return res.status(500).json({ error: 'Could not fetch contacts.' })
  }
}

// PATCH /api/admin/contacts/:id/read
export async function markContactRead(req, res) {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, { read: true }, { new: true }
    )
    if (!contact) return res.status(404).json({ error: 'Contact not found.' })
    return res.json({ contact })
  } catch (err) {
    return res.status(500).json({ error: 'Could not update contact.' })
  }
}

// PATCH /api/admin/contacts/:id/replied
export async function markContactReplied(req, res) {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, { read: true, replied: true }, { new: true }
    )
    if (!contact) return res.status(404).json({ error: 'Contact not found.' })
    return res.json({ contact })
  } catch (err) {
    return res.status(500).json({ error: 'Could not update contact.' })
  }
}

// DELETE /api/admin/contacts/:id
export async function deleteContact(req, res) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) return res.status(404).json({ error: 'Contact not found.' })
    return res.json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'Could not delete contact.' })
  }
}

// ── Subscribers ───────────────────────────────────────────────────────────────

// GET /api/admin/subscribers
export async function listSubscribers(req, res) {
  try {
    const page  = Math.max(1, parseInt(req.query.page  ?? '1'))
    const limit = Math.min(100, parseInt(req.query.limit ?? '30'))
    const skip  = (page - 1) * limit

    const [subscribers, total] = await Promise.all([
      Subscriber.find({ active: true }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Subscriber.countDocuments({ active: true }),
    ])
    return res.json({ subscribers, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    return res.status(500).json({ error: 'Could not fetch subscribers.' })
  }
}

// DELETE /api/admin/subscribers/:id
export async function deleteSubscriber(req, res) {
  try {
    await Subscriber.findByIdAndUpdate(req.params.id, { active: false })
    return res.json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'Could not remove subscriber.' })
  }
}
