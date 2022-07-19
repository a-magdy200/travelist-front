import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import image from '../../assets/avatar.png'
import ProfilePictureChanger from './ProfilePictureChanger'
import Loader from '../Loader'
import { IUserAuthenticationResponse } from '../../config/interfaces/IUserAuthenticationResponse.interface'
import { IUserShowProps } from '../../config/interfaces/IUserShowProps.interface'

const Profile = ({ user }: IUserShowProps) => {
	return (
		<div>
			{user ? (
				<Stack
					direction="column"
					spacing={2}
					display="flex"
					alignItems="center"
				>
					<Typography variant="h5" component="div" gutterBottom>
						Profile
					</Typography>
					<ProfilePictureChanger />
					<Grid container spacing={2} xs={10} lg={8} mb={3}>
						<Grid item xs={6}>
							Name:
						</Grid>
						<Grid item xs={6}>
							{user.name}
						</Grid>
						<Grid item xs={6}>
							Email:
						</Grid>
						<Grid item xs={6}>
							{user.email}
						</Grid>
						<Grid item xs={6}>
							Type:
						</Grid>
						<Grid item xs={6}>
							{user.type}
						</Grid>
						<Grid item xs={6}>
							Location:
						</Grid>
						<Grid item xs={6}>
							{user.address}
						</Grid>
					</Grid>
				</Stack>
			) : (
				<Loader />
			)}
		</div>
	)
}

export default Profile
