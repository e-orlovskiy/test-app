import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { authenticate } from './middleware/auth.js'
import postRoutes from './routes/postRoutes.js'
import authRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()

app.use(
	cors({
		origin: 'http://localhost:5173',
		exposedHeaders: ['access-token', 'refresh-token']
	})
)
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api', authenticate, postRoutes)

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => app.listen(process.env.PORT, () => console.log(`Server on ${process.env.PORT}`)))
	.catch(console.error)
