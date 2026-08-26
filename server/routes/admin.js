import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import {
  login, me, changePassword,
  stats,
  listAllPosts, getPostById, createPost, updatePost, deletePost,
  listContacts, markContactRead, markContactReplied, deleteContact,
  listSubscribers, deleteSubscriber,
} from '../controllers/adminController.js'

const router = Router()

// ── Auth (public) ─────────────────────────────────────────────────────────────
router.post('/login', login)

// ── Protected ─────────────────────────────────────────────────────────────────
router.use(requireAuth)

router.get('/me',              me)
router.post('/change-password', changePassword)

// Dashboard stats
router.get('/stats', stats)

// Blog CRUD
router.get   ('/blogs',      listAllPosts)
router.get   ('/blogs/:id',  getPostById)
router.post  ('/blogs',      createPost)
router.put   ('/blogs/:id',  updatePost)
router.delete('/blogs/:id',  deletePost)

// Contacts
router.get   ('/contacts',            listContacts)
router.patch ('/contacts/:id/read',   markContactRead)
router.patch ('/contacts/:id/replied',markContactReplied)
router.delete('/contacts/:id',        deleteContact)

// Subscribers
router.get   ('/subscribers',     listSubscribers)
router.delete('/subscribers/:id', deleteSubscriber)

export default router
