export const setUser = (user, interest = []) => {
	return {
		type: "SET_USER",
		user: user,
		interest: interest,
	}
}

export const setUserToken = (user, token, interest = []) => {
	return {
		type: "SET_USER_TOKEN",
		user: user,
		token: token,
		interest: interest,
	}
}

export const logout = () => {
	return {
		type: "LOGOUT",
	}
}

export const resetNYTimesContent = (articles, interest = "New York Times") => {
	return {
		type: "NYTimes_Reset",
		articles: articles,
		interest: interest,
	}
}

export const nextNYTimesContent = (articles) => {
	return {
		type: "NYTimes_Next",
		articles: articles,
	}
}