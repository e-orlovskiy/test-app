import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	refreshToken: String
})
export default mongoose.model('User', UserSchema)
