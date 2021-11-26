import axios from "axios"

export function getQuestions(page, questionsQuantity) {
	return axios.get(`https://api.stackexchange.com/2.3/questions?page=${page}&pagesize=${questionsQuantity}&fromdate=1635724800&todate=1637798400&order=desc&sort=activity&site=stackoverflow`)
		.then((response) => {
			console.log(response.data)
			var questionsList = response.data.items
			return questionsList
		})
		.catch(err => {
			console.error(err)
			return []
		})
}

export function getAnswers(questionId) {
	return axios.get(`https://api.stackexchange.com/2.3/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=!nKzQURF6Y5`)
		.then((response) => {
			console.log(response.data)
			var commentsList = response.data.items
			return commentsList
		})
		.catch(err => {
			console.error(err)
			return []
		})
}