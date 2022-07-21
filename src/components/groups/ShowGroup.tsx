import Loader from '../Loader'
import { NavLink, Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { IGroupShowProps } from '../../config/interfaces/IGroupShowProps.interface'
import config from '../../config/app_config/config'
import ListPosts from '../../pages/post/list_posts'
import { useContext } from 'react'
import { useState } from 'react'
import { IUserInterface } from '../../config/interfaces/IUser.interface'
import AuthContext from '../../contexts/AuthContext'

import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardMedia from '@mui/material/CardMedia'

const ShowGroupComponent = ({ group }: IGroupShowProps) => {
	console.log('group', group)

	const photoPath = group
		? `${config.apiUrl}/uploads/${group.cover_picture}`
		: ''

	return (
		<div>
			{group ? (
				<div>
					<div>
						<h1>Group Details</h1>
					</div>
					<Card sx={{ maxWidth: 945, minWidth: 345, mx: 10, my: 2 }}>
						<CardMedia
							component="img"
							height="140"
							image={photoPath}
							alt="program Cover"
						/>
						<CardContent className="bottom">
							<Typography gutterBottom variant="h6" component="div">
								Country : {group.country.name}
							</Typography>

							<Typography gutterBottom variant="h6" component="div">
								Followers Count : {group.followers_count}
							</Typography>

							{/* <Grid>
							{group.followers?.map((follower, index) => (
								<Grid item xs={6} key={index}>
									Follower: {follower.name}
								</Grid>
							))}
							</Grid> */}
						</CardContent>
					</Card>

					<Grid container spacing={2} xs={6} lg={16} mb={3} mx={25}>
						<Grid item xs={6}>
							<Link to="/post/create" state={{ id: group.id }}>
								<Button className="createButton" variant="contained">
									Create post
								</Button>
							</Link>
							<div></div>
						</Grid>
						<Grid item xs={6}>
							<NavLink to={`/group/list`}>
								{' '}
								<Button className="createButton" variant="contained">
									Back
								</Button>
							</NavLink>
						</Grid>
						{/* if id of user not in followers array */}
						{/* const existedUser = group.followers?.find((obj) => {
			            return obj.id === userId
		               }) */}
						{/* {LoggedInUser.user == 'company' ? (console.log('hi'))
						:(console.log('hi'))} */}
					</Grid>

					<ListPosts />
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowGroupComponent
