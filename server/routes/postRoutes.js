import { Router } from 'express'
import { addPost, getAll } from '../controllers/postController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.get('/posts', getAll)
router.post('/posts', authenticate, addPost)

export default router
