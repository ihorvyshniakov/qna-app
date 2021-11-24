import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css';

function getQuestions(page, questionsQuantity) {
	return axios.get(`https://api.stackexchange.com/2.3/questions?page=${page}&pagesize=${questionsQuantity}&order=desc&sort=activity&site=stackoverflow`)
		.then((response) => {
			console.log(response.data)
			var questionsList = response.data.items
			return questionsList
		});
}

function getComments(questionId) {
	return axios.get(`https://api.stackexchange.com/2.3/questions/${questionId}/comments?order=asc&sort=creation&site=stackoverflow&filter=!nKzQURB9EO`)
		.then((response) => {
			console.log(response.data)
			var commentsList = response.data.items
			return commentsList
		});
}

function convertTimestampToDateString(timestamp) {
	let date = new Date(timestamp * 1000)
	return String(date).slice(4,21)
}

const App = () => {
	const [isModalOpen, setModalOpen] = useState(false)
	const [actualComments, setActualComments] = useState([])
	const [questions, setQuestions] = useState([])
	console.log(questions)

	useEffect(() => {
		getQuestions(1, 20).then(questions => setQuestions(questions))
	}, [])

	const showQuestionComments = (questionId) => {
		getComments(questionId).then(comments => setActualComments(comments))
		setModalOpen(true)
	}

  return (
    <div className="App">
			{
				isModalOpen && (
					<div className="modal">
						<div className="list">
							<ul>
								<div className="wrap">
									{actualComments.map(comment => (
										<li>
											{comment.body}
											<div className="details">
												<p className="date">{convertTimestampToDateString(comment.creation_date)}</p>
												<p className='author'>{comment.owner.display_name}</p>
											</div>
										</li>
										))}
								</div>
								{actualComments.length == 0 && (<p className='info'>There's no comments to this question.</p>)}
							</ul>
							<p className="cross" onClick={()=>setModalOpen(false)}>X</p>
						</div>
					</div>
				)
			}
			<ul>
				{questions.map(question => (
					<li
						key={question.question_id}
						onClick={() => showQuestionComments(question.question_id)}
					>
						{question.title}
					</li>
				))}
			</ul>
    </div>
  );
}

export default App;
