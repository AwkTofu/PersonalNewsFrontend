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
		title: "Kled",
		author: "FZ",
		url: "https://leagueoflegends.fandom.com/wiki/Kled",
		content: "A warrior as fearless as he is ornery, the yordle Kled embodies the furious bravado of Noxus. He is an icon beloved by the empire's soldiers, distrusted by its officers, and loathed by the nobility. Many claim Kled has fought in every campaign the legions have waged, has “acquired” every military title, and has never once backed down from a fight. Though the truth of the matter is often questionable, one part of his legend is undeniable: Charging into battle on his un-trusty steed, Skaarl, Kled fights to protect what's his… and to take whatever he can get.",
	},
	{
		id:3,
		title: "Kog'Maw",
		author: "Frank",
		url: "https://leagueoflegends.fandom.com/wiki/Kog'Maw",
		content: "Belched forth from a rotting Void incursion deep in the wastelands of Icathia, Kog'Maw is an inquisitive yet putrid creature with a caustic, gaping mouth. This particular Void-spawn needs to gnaw and drool on anything within reach to truly understand it. Though not inherently evil, Kog'Maw's beguiling naiveté is dangerous, as it often precedes a feeding frenzy—not for sustenance, but to satisfy its unending curiosity.",
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
	user: null,
	token: null,
	fakeTwitterInfo: [...fakeData]
}

const reducer = (existingState = initialState, action) => {
	switch(action.type){
		case "SET_USER":
			return {
				...existingState,
				user: action.payload
			}
		case "LOGOUT":
			return {
				...existingState,
				user: null
			}
		default:
			return existingState
	}
}

export default reducer