import { combineReducers } from "redux"
import questions from './questions'
import rowsPerPage from './rowsPerPage'

export default combineReducers({
	questions,
	rowsPerPage
})