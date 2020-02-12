const defaultCurrentInterest = "New York Times";

const noInfo = (API_Name = "noName") => { 
	return [{
		id: 0, 
		title: "No Info", 
		author:"DNE", 
		url:"",
		content:`Now loading from ${API_Name} API...`,
		publishDate: "NONE",
	}]
}

const initialState = {
	user: null,
	interests: [],
	token: null,
	afterDefaultFetch: false,
	currentInterest: defaultCurrentInterest,
	NYTimesContent: noInfo(defaultCurrentInterest),
	NYTimesPageCount: 0,
	twitterContent: noInfo("Twitter"),
	twitterPageCount: 0,
	login: false,
	changeDefaultDiv: false,
}

const reducer = (existingState = initialState, action) => {
	//Default interest is the default current interest from initial state in case of no interest
	let firstInterest = existingState.currentInterest;

	switch(action.type){
		case "SET_USER":
			//Setting the default interest to the first object of interest
			if (action.interest[0])
				firstInterest = action.interest[0].interest;

			return {
				...existingState,
				user: action.user,
				interests: [...action.interest],
				login: true,
				currentInterest: firstInterest,
				changeDefaultDiv: true,
			}
		case "SET_USER_TOKEN":
			//Setting the default interest to the first object of interest
			if (action.interest[0])
				firstInterest = action.interest[0].interest;

			return {
				...existingState,
				user: action.user,
				interests: [...action.interest],
				token: action.token,
				login: true,
				currentInterest: firstInterest,
				changeDefaultDiv: true,
			}
		case "LOGOUT":
			return {
				...existingState,
				user: null,
				login: false,
				token: null,
				changeDefaultDiv: true,
				NYTimesContent: noInfo("New York Times"),
				currentInterest: defaultCurrentInterest,
				interests: [],
			}
		case "NYTimes_Reset":
			return {
				...existingState,
				NYTimesContent: [...action.articles],
				NYTimesPageCount: 1,
				afterDefaultFetch: true,
				currentInterest: action.interest,
				changeDefaultDiv: false,
			}
		case "NYTimes_Next":
			return {
				...existingState,
				NYTimesContent: [ ...existingState.NYTimesContent , ...action.articles],
				NYTimesPageCount: existingState.NYTimesPageCount + 1,
			}
		case "Add_Interest":
			return {
				...existingState,
				interests: [...existingState.interests, action.interest]
			}
		case "Delete_Interest":
			//Create a copy of the interest
			let temp_interest =  [...existingState.interests]
			//Find the Index of the item we want to remove
			const delete_interest_index = temp_interest.findIndex((interest) => interest.id == action.interest_id);
			//Remove the item given the index
			temp_interest.splice(delete_interest_index, 1);

			return {
				...existingState,
				interests: temp_interest,
			}
		default:
			return existingState
	}
}

export default reducer