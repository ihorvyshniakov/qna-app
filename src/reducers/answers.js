export default function answers(state = [], action) {
	if (action.type === 'ADD_ANSWER'){
		return [
			...state,
			{
				question_id: action.payload.question_id,
				answersList: action.payload.answersList
			}
		]
	}
	return state
}