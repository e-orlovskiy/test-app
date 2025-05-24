import Post from '../models/Post.js'
export const getAll = async (req, res) => {
	try {
		const posts = await Post.find()
		res.status(200).json(posts)
	} catch (err) {
		res.status(500).json({ message: 'Что-то пошло не так при получении постов' })
	}
}

export const addPost = async (req, res) => {
	console.log(req.user)
	console.log(req.body)
	try {
		const { title, body } = req.body
		const post = await Post.create({ title, body, author: req.user.userId })
		res.status(201).json(post)
	} catch (err) {
		res.status(500).json({ message: 'Что-то пошло не так при добавлении поста' })
	}
}
