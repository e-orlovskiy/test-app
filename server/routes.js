import express from 'express'
import { checkAuth, login, register } from './controllers/authController.js'
import requireAuth from './middleware/auth.js'

const router = express.Router()

router.get('/check-auth', checkAuth)
router.post('/login', login)
router.post('/register', register)
// protected route
router.get('/protected', requireAuth, (req, res) => {
	res.json({ userId: req.userId })
})

export default router
