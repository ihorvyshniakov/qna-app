import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"


const MyTable = ({
	questions,
	showQuestionAnswers,
	page,
	changePage,
	rowsPerPage,
	changeRowsPerPage
}) => {
	return (
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
	)
}

export default MyTable
