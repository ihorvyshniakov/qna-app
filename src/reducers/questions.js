export default function questions(state = [], action) {
	if (action.type === 'ADD_QUESTIONS'){
		return [
			...state,
			action.payload
		]
	}
	return state
}