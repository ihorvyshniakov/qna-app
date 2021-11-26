import { AppBar, Typography } from '@mui/material'

const Header = () => {
	return (
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
	)
}

export default Header
