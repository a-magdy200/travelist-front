import Loader from '../Loader'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import moment from 'moment'
import { IPostShowProps } from '../../config/interfaces/IPostShowProps.interface'
const ShowPostComponent = ({ post }: IPostShowProps) => {
	console.log('new post', post)
	return (
		<div>
			{post ? (
				<div>
					<div>
						<h1>Post Details</h1>
					</div>

					<div className="bottom">
						<Grid item xs={6}>
							post creator :{post.traveler.user.name}
						</Grid>
						<Grid item xs={6}>
							created at: {moment(post.created_at).format('MMM Do YY')}
						</Grid>
						<Grid item xs={6}>
							status : {post.status}
						</Grid>
						<Grid
							container
							direction="column"
							spacing={2}
							xs={10}
							lg={8}
							mb={3}
						>
							<Grid item xs={6}>
								<h2 className="header">{post.content}</h2>
							</Grid>
						</Grid>
					</div>

					<NavLink to={`/posts`}>
						{' '}
						<Button className="createButton" variant="contained">
							Back
						</Button>
					</NavLink>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowPostComponent
