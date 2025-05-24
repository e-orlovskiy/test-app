import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export function authenticate(req, res, next) {
	console.log(`TESTING:\n ${req.headers['authorization']} \n ${req.body}`)
	const token = req.headers['authorization']?.split(' ')[1]
	if (!token) return res.status(401).json({ msg: 'No token' })
	try {
		const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
		req.user = user
		next()
	} catch {
		return res.status(401).json({ msg: 'Invalid token' })
	}
}
