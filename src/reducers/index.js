import { combineReducers } from "redux"
import questions from './questions'
import rowsPerPage from './rowsPerPage'
import answers from './answers'

export default combineReducers({
	rowsPerPage,
	questions,
	answers
})