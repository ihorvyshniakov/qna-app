import { useEffect, useState } from 'react'
import axios from 'axios'
import { AppBar, Container, Divider, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'

import './App.css';

function getQuestions(page, questionsQuantity) {
	return axios.get(`https://api.stackexchange.com/2.3/questions?page=${page}&pagesize=${questionsQuantity}&order=desc&sort=activity&site=stackoverflow`)
		.then((response) => {
			console.log(response.data)
			var questionsList = response.data.items
			return questionsList
		});
}

function getAnswers(questionId) {
	return axios.get(`https://api.stackexchange.com/2.3/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=!nKzQURF6Y5`)
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
	const [actualAnswers, setActualAnswers] = useState([])
	const [questions, setQuestions] = useState([])
	console.log(questions)

	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

	const changePage = (event, newPage) => {
    setPage(newPage);
  };

  const changeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(page);
  };

	const showQuestionAnswers = (questionId) => {
		getAnswers(questionId).then(answers => setActualAnswers(answers))
		setModalOpen(true)
	}

	useEffect(() => {
		console.log('page', page)
		getQuestions(page + 1, rowsPerPage).then(questions => setQuestions(questions))
	}, [page, rowsPerPage])

  return (
    <div className="App">
			<AppBar position="static">
				<Typography variant="h6" component="h1" align='center' sx={{height: '40px', lineHeight: '40px'}}>
					Stack overflow QnA App
				</Typography>
			</AppBar>
			<Container sx={{width: '100%', p: '40px 20px 80px'}}>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<Typography variant="h5" align='center'>
									Questions
								</Typography>
							</TableRow>
						</TableHead>
						<TableBody>
							{questions.map(question => (
								<TableRow
									hover={true}
									sx={{cursor: 'pointer'}}
									key={question.question_id}
									onClick={() => showQuestionAnswers(question.question_id)}
								>
									<TableCell>{question.title}</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TablePagination
									count={100}
									page={page}
									onPageChange={changePage}
									rowsPerPage={rowsPerPage}
									rowsPerPageOptions={[10, 20, 30]}
									onRowsPerPageChange={changeRowsPerPage}
									showFirstButton
									showLastButton
								/>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				{
					isModalOpen && (
						<div className="modal">
							<div className="list">
								<ul>
									<div className="wrap">
										{actualAnswers.map(answer => (
											<li>
												{answer.body}
												<div className="details">
													<p className="date">{convertTimestampToDateString(answer.creation_date)}</p>
													<p className='author'>{answer.owner.display_name}</p>
												</div>
											</li>
											))}
									</div>
									{actualAnswers.length == 0 && (<p className='info'>There's no answers to this question.</p>)}
								</ul>
								<p className="cross" onClick={()=>setModalOpen(false)}>X</p>
							</div>
						</div>
					)
				}
			</Container>
    </div>
  );
}

export default App;
