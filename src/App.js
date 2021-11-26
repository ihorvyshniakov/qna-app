import { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { connect } from 'react-redux'

import './App.css'

import MyDialog from './components/MyDialog';
import MyTable from './components/MyTable';
import Header from './components/Header';
import { getQuestions, getAnswers } from './requests'

const App = ({
	storeRowsPerPage,
	storeQuestionsList,
	storeAnswersList,
	onAddQuestions,
	onClearQuestions,
	onAddRowsQty,
	onAddAnswers
}) => {
	const [isModalOpen, setModalOpen] = useState(false)
	const [isLoading, setLoading] = useState(false)

	const [actualAnswers, setActualAnswers] = useState([])
	const [questions, setQuestions] = useState([])

	const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

	const changePage = (event, newPage) => {
    setPage(newPage);
  };

  const changeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(page);
  };

	const showQuestionAnswers = (questionId) => {
		let isQuestionInStore = storeAnswersList.some(item=>item.question_id == questionId)

		if (isQuestionInStore){
			// show from store
			let neededAnswersFromStore = storeAnswersList.filter(item=>item.question_id == questionId)[0].answersList
			setActualAnswers(neededAnswersFromStore)
			setModalOpen(true)
		} else {
			// write to store and show
			setLoading(true)
			getAnswers(questionId)
				.then(answers => {
					setActualAnswers(answers)
					return answers
				})
				.then(answers => {
					onAddAnswers(answers, questionId)
					setLoading(false)
				})
				.then(() => setModalOpen(true))
		}
	}

	useEffect(() => {
		let isRowsPerPageSame = storeRowsPerPage == rowsPerPage

		if (isRowsPerPageSame){
			let isNeededPageInStore = storeQuestionsList.some(item=>item.pageNum == page)

			if (isNeededPageInStore){
				let filteredList = storeQuestionsList.filter(item=>item.pageNum == page)[0].questionsList
				setQuestions(filteredList)
			} else {
				onAddRowsQty(rowsPerPage)
				setLoading(true)
				getQuestions(page + 1, rowsPerPage).then(questions => {
					setQuestions(questions)
					onAddQuestions(questions, page)
					setLoading(false)
				})
			}
		} else {
			onAddRowsQty(rowsPerPage)
			onClearQuestions()
			setLoading(true)
			getQuestions(page + 1, rowsPerPage).then(questions => {
				setQuestions(questions)
				onAddQuestions(questions, page)
				setLoading(false)
			})
		}
	}, [page, rowsPerPage])

  return (
    <div className="App">
			{
				isLoading && (
					<div className="loading">
						<AutorenewIcon sx={{fontSize: 70}} />
					</div>
				)
			}
			<Header/>
			<Container sx={{width: '100%', p: '40px 20px 80px'}}>
				<Typography variant="h5" align='center' sx={{mb: '10px'}}>
					Questions
				</Typography>
				<MyTable
					questions={questions}
					showQuestionAnswers={showQuestionAnswers}
					page={page}
					changePage={changePage}
					rowsPerPage={rowsPerPage}
					changeRowsPerPage={changeRowsPerPage}
				/>
				<MyDialog
					isModalOpen={isModalOpen}
					setModalOpen={setModalOpen}
					actualAnswers={actualAnswers}
				/>
			</Container>
    </div>
  );
}

export default connect(
	state => ({
		storeRowsPerPage: state.rowsPerPage,
		storeQuestionsList: state.questions,
		storeAnswersList: state.answers
	}),
	dispatch => ({
		onAddQuestions: (questionsList, pageNum) => {
			const payload = {
				pageNum: pageNum,
				questionsList: questionsList
			}
			dispatch({ type: 'ADD_QUESTIONS', payload: payload })
		},
		onAddRowsQty: (rowsPerPage) => {
			dispatch({ type: 'ADD_ROWS_QUANTITY', payload: rowsPerPage })
		},
		onClearQuestions: () => {
			dispatch({ type: 'CLEAR_QUESTIONS' })
		},
		onAddAnswers: (answersList, question_id) => {
			const payload = {
				question_id,
				answersList
			}
			dispatch({ type: 'ADD_ANSWER', payload: payload })
		},
	})
)(App);
