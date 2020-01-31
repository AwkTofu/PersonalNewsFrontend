const fakeData = [
	{
		id:1,
		title: "LOL",
		author: "Me",
		url: "https://www.google.com",
		content: "some really long but fake data in here for the future. Except this isn't long enough.",
	},
	{
		id:2,
		title: "LOL",
		author: "Me",
		url: "https://www.google.com",
		content: "some really long but fake data in here for the future. Except this isn't long enough.",
	},
	{
		id:3,
		title: "LOL",
		author: "Me",
		url: "https://www.google.com",
		content: "some really long but fake data in here for the future. Except this isn't long enough.",
	},
	{
		id:4,
		title: "LOL",
		author: "Me",
		url: "https://www.google.com",
		content: "some really long but fake data in here for the future. Except this isn't long enough.",
	},
	{
		id:5,
		title: "LOL",
		author: "Me",
		url: "https://www.google.com",
		content: "some really long but fake data in here for the future. Except this isn't long enough.",
	}
]

const initialState = {
	fakeTwitterInfo: [...fakeData]
}

const reducer = (existingState = initialState, action) => {
	switch(action.type){
		default:
			return existingState
	}
}

export default reducer