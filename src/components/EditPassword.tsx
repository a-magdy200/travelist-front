import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const EditPassword = () => {
	return (
		<Stack
			direction="column"
			spacing={2}
			display="flex"
			// justifyContent="center"
			alignItems="center"
			
		>
			<Typography variant="h4" component="div" gutterBottom>
				Change Password
			</Typography>

			<TextField
				id="outlined-password-input"
				label="Current Password"
				type="password"
				autoComplete="current-password"
			/>

			<TextField
				id="outlined-password-input"
				label="New Password"
				type="password"
				autoComplete="current-password"
			/>

			<TextField
				id="outlined-password-input"
				label="Confirm Password"
				type="password"
				autoComplete="current-password"
			/>
			<Button variant="contained" size="large">
				Update Password
			</Button>
			<Button variant="outlined" size="large">
				Cancel
			</Button>
		</Stack>
	)
}
export default EditPassword
