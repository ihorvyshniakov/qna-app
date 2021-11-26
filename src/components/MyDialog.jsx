import { Fragment } from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Box } from '@mui/system'

import { convertTimestampToDateString } from '../helpers'

const MyDialog = ({ isModalOpen, setModalOpen, actualAnswers }) => {
	return (
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
				<DialogContentText
					component='div'
				>
					<List>
						{actualAnswers.map(answer => (
							<Fragment key={answer.answer_id}>
								<ListItem
									component='div'
									sx={{display: 'flex', flexDirection: 'column'}}
								>
									<ListItemText
										primary={answer.body}
										sx={{maxWidth: '100%', wordBreak: 'break-word'}}
									/>
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
							</Fragment>
						))}
						{actualAnswers.length === 0 && (
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
	)
}

export default MyDialog
