export default function rowsPerPage(state = '10', action) {
	if (action.type === 'ADD_ROWS_QUANTITY'){
		return String(action.payload)
	}
	return state
}