import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ProfilePictureChanger from '../../components/Profile/ProfilePictureChanger'
import TextField from '@mui/material/TextField'

const EditUser = () => {
	return (
		<Stack
			direction="column"
			spacing={2}
			display="flex"
			// justifyContent="center"
			alignItems="center"

		>
			<Typography variant="h3" component="div" gutterBottom>
				Edit Account
			</Typography>

			<ProfilePictureChanger />
			<Grid container spacing={2} xs={10} lg={8} mb={3}>
				<Grid item xs={6}>
					Name:
				</Grid>
				<Grid item xs={6}>
					<TextField
						required
						id="outlined-required"
						label="Required"
						defaultValue=""
					/>
				</Grid>
				<Grid item xs={6}>
					Email:
				</Grid>
				<Grid item xs={6}>
					<TextField
						required
						id="outlined-required"
						label="Required"
						defaultValue=""
					/>
				</Grid>
				<Grid item xs={6}>
					Location:
				</Grid>
				<Grid item xs={6}>
					<TextField
						required
						id="outlined-required"
						label="Required"
						defaultValue=""
					/>
				</Grid>

			</Grid>
			<Button variant="contained" size="large">Save Changes</Button>
		</Stack>
	)
}

export default EditUser
