export const setUser = (user) => {
	return {
		type: "SET_USER",
		payload: user,
	}
}

export const setUserToken = (user, token) => {
	return {
		type: "SET_USER_TOKEN",
		user: user,
		token: token,
	}
}

export const logout = () => {
	return {
		type: "LOGOUT",
	}
}

export const resetNYTimesContent = (articles) => {
	return {
		type: "NYTimes_Reset",
		articles: articles,
	}
}