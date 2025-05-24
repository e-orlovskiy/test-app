import { Router } from 'express'
import { check, login, refresh, register } from '../controllers/authController.js'
const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', check)
router.get('/refresh', refresh)

export default router
