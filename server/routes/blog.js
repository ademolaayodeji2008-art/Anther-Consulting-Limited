import { Router } from 'express'
import { listPosts, getPost } from '../controllers/blogController.js'

const router = Router()

// GET /api/blog
router.get('/', listPosts)

// GET /api/blog/:slug
router.get('/:slug', getPost)

export default router
