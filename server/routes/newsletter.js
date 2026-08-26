import { Router } from 'express'
import { subscribe } from '../controllers/newsletterController.js'

const router = Router()

// POST /api/newsletter
router.post('/', subscribe)

export default router
