export const getUsers = async url => {
	try {
		const res = await fetch(url)
		if (!res.ok) throw new Error(`http error! status ${res.status}`)
		const data = await res.json()
		return data.map(user => ({
			username: user.username,
			email: user.email
		}))
	} catch (error) {
		console.error(`error fetching data: ${error.message}`)
	}
}
