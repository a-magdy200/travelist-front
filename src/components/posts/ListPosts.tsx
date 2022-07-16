import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import { IPostShowProps } from '../../config/interfaces/IPostShowProps.interface'

const ListPostsComponent = ({ post }: IPostShowProps) => {
	return (
		<div>
			{post ? (
				<div>
					<Card >

						<CardContent className="bottom" >

							<h2 className="header">{post.status}</h2>

							<Grid
							container
							direction="column"
							spacing={2}
							xs={10}
							lg={8}
							mb={3}
							>
								<Grid item xs={6}>
									Content : {post.content}
								</Grid>

								<Grid item xs={6}>
									post creator : {post.travelerId}
								</Grid>
							</Grid>

						</CardContent>

						<CardActions className="bottom">
							<NavLink to={`/post/show/${post.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Show Details
								</Button>
							</NavLink>
						</CardActions>

					</Card>
					<div>
						<p></p>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ListPostsComponent
