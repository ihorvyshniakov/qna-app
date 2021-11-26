import { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import { connect } from 'react-redux'

import MyDialog from './components/MyDialog';
import MyTable from './components/MyTable';
import Header from './components/Header';
import { getQuestions, getAnswers } from './requests'

const App = ({ store, onAddQuestions }) => {
	const [isModalOpen, setModalOpen] = useState(false)
	const [actualAnswers, setActualAnswers] = useState([])
	const [questions, setQuestions] = useState([])

	const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

	// console.log(store)
	console.log(questions)

	const changePage = (event, newPage) => {
    setPage(newPage);
  };

  const changeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(page);
  };

	const showQuestionAnswers = (questionId) => {
		getAnswers(questionId)
			.then(answers => setActualAnswers(answers))
			.then(() => setModalOpen(true))
	}

	useEffect(() => {
		getQuestions(page + 1, rowsPerPage).then(questions => {
			setQuestions(questions)
			onAddQuestions(questions)
		})
	}, [page, rowsPerPage])

  return (
    <div className="App">
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
		store: state
	}),
	dispatch => ({
		onAddQuestions: (questionsList) => {
			dispatch({ type: 'ADD_QUESTIONS', payload: questionsList })
		}
	})
)(App);
