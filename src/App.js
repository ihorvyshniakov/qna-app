import { useEffect, useState } from 'react'
import axios from 'axios'
import { AppBar, Button, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography, List, ListItem, ListItemText, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import './App.css';
import { Box } from '@mui/system';

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

	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

	console.log(questions)

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
		getQuestions(page + 1, rowsPerPage).then(questions => setQuestions(questions))
	}, [page, rowsPerPage])

  return (
    <div className="App">
			<AppBar position="static">
				<Typography
					variant="h6"
					component="h1"
					align='center'
					sx={{height: '40px', lineHeight: '40px'}}
				>
					Stack overflow QnA App
				</Typography>
			</AppBar>
			<Container sx={{width: '100%', p: '40px 20px 80px'}}>
				<Typography variant="h5" align='center' sx={{mb: '10px'}}>
					Questions
				</Typography>
				<TableContainer component={Paper}>
					<Table>
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
									count={120}
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
				<Dialog
					scroll='paper'
					open={isModalOpen}
					onClose={()=>setModalOpen(false)}
				>
					<DialogTitle
						variant="h5"
						component="div"
						sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
					>
						Answers
						<Button onClick={()=>setModalOpen(false)}>
							<CloseIcon/>
						</Button>
					</DialogTitle>
					<DialogContent dividers={true}>
						<DialogContentText>
							<List>
								{actualAnswers.map(answer => (
									<>
										<ListItem
											component='div'
											sx={{display: 'flex', flexDirection: 'column'}}
										>
											<ListItemText primary={answer.body} />
											<Box
												sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
											>
												<Typography
													component='div'
													variant='subtitle2'
													sx={{color: 'red'}}
												>
													{convertTimestampToDateString(answer.creation_date)}
												</Typography>
												<Typography
													component='div'
													variant='h6'
													sx={{color: 'blue'}}
												>
													{answer.owner.display_name}
												</Typography>
											</Box>
										</ListItem>
										<Divider/>
									</>
								))}
								{actualAnswers.length == 0 && (
									<>
										<ListItem>
											<ListItemText primary="There's no answers to this question."/>
										</ListItem>
										<Divider/>
									</>
								)}
							</List>
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</Container>
    </div>
  );
}

export default App;
