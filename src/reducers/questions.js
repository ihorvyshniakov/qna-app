export default function questions(state = [], action) {
	switch (action.type) {
		case 'ADD_QUESTIONS':
			return [
				...state,
				{
					pageNum: action.payload.pageNum,
					questionsList: action.payload.questionsList
				}
			]
		case 'CLEAR_QUESTIONS':
			return []
		default:
			return state
	}
}