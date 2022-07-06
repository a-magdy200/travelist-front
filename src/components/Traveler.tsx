import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ProfilePictureChanger from './ProfilePictureChanger'
import EditMenu from './EditMenu'
import Profile from './Profile'

const Traveler = () => {
	return (
		<Stack
			direction="column"
			spacing={2}
			display="flex"
			// justifyContent="center"
			alignItems="center"
			minHeight="100vh"
		>
			<Grid container spacing={2} xs={10} lg={8} mb={3}>
				<Grid item xs={6}>
					Gender:
				</Grid>
				<Grid item xs={6}>
					Female
				</Grid>
				<Grid item xs={6}>
					Date of Bith:
				</Grid>
				<Grid item xs={6}>
					24-11-1996
				</Grid>
				<Grid item xs={6}>
					Natioal Id:
				</Grid>
				<Grid item xs={6}>
					12345678912345
				</Grid>
				<Grid item xs={6}>
					Guide:
				</Grid>
				<Grid item xs={6}>
					No
				</Grid>
			</Grid>

			<EditMenu />
		</Stack>
	)
}

export default Traveler
