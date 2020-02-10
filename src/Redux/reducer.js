const noInfo = (API_Name = "noName") => { 
	return [{
		id: 0, 
		title: "No Info", 
		author:"DNE", 
		url:"",
		content:`Error, ${API_Name} API not loaded`,
		publishDate: "NONE",
	}]
}

const initialState = {
	user: null,
	token: null,
	currentInterest: "New York Times",
	NYTimesContent: noInfo("New York Times"),
	NYTimesPageCount: 0,
	twitterContent: noInfo("Twitter"),
	twitterPageCount: 0,
	login: false,
}

const reducer = (existingState = initialState, action) => {
	switch(action.type){
		case "SET_USER":
			return {
				...existingState,
				user: action.payload,
				login: true,
			}
		case "SET_USER_TOKEN":
			return {
				...existingState,
				user: action.user,
				token: action.token,
				login: true,
			}
		case "LOGOUT":
			return {
				...existingState,
				user: null,
				login: false,
				token: null,
			}
		case "NYTimes_Reset":
			return {
				...existingState,
				NYTimesContent: [...action.articles],
				NYTimesPageCount: existingState.NYTimesPageCount + 1,
			}
		case "NYTimes_Next":
			return {
				...existingState,
				NYTimesContent: [ ...existingState.NYTimesContent , ...action.articles],
				NYTimesPageCount: existingState.NYTimesPageCount + 1,
			}
		default:
			return existingState
	}
}

export default reducer