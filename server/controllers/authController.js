import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
dotenv.config()

// создаём токены
function signTokens(userId) {
	const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
		expiresIn: '15m'
	})
	const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: '7d'
	})
	return { accessToken, refreshToken }
}

// регистрация
export const register = async (req, res) => {
	const { username, password } = req.body
	const hash = await bcrypt.hash(password, 10)
	if (await User.findOne({ username }))
		return res.status(400).json({ msg: 'User already exists' })
	const user = await User.create({ username, password: hash })
	const { _, refreshToken } = signTokens(user._id)
	user.refreshToken = refreshToken
	await user.save()
	res.status(201).json({ msg: 'Registered' })
}
// авторизация
export const login = async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username })
	if (!user) return res.status(400).json({ msg: 'No such user' })
	const valid = await bcrypt.compare(password, user.password)
	if (!valid) return res.status(400).json({ msg: 'Wrong password' })

	const { accessToken, refreshToken } = signTokens(user._id)
	res.setHeader('access-token', accessToken)
	res.setHeader('refresh-token', refreshToken)
	res.json({ status: 200, msg: 'Logged in' })
}
// проверка токена
export const check = async (req, res) => {
	const token = req.headers['authorization']?.split(' ')[1]
	if (!token) return res.status(401).json({ authenticated: false })
	try {
		jwt.verify(token, process.env.JWT_ACCESS_SECRET)
		res.status(200).json({ authenticated: true })
	} catch {
		res.status(401).json({ authenticated: false })
	}
}
// обновление токенов
export const refresh = async (req, res) => {
	const token = req.headers['refresh-token']
	if (!token) return res.status(401).json({ msg: 'No refresh token' })
	try {
		const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
		const { accessToken, refreshToken } = signTokens(user.userId)
		res.setHeader('access-token', accessToken)
		res.setHeader('refresh-token', refreshToken)
		res.json({ status: 200, msg: 'Tokens refreshed' })
	} catch {
		res.status(401).json({ msg: 'Invalid refresh token' })
	}
}
