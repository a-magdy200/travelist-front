import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import moment from 'moment'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink ,Link} from 'react-router-dom'
import { IPostShowProps } from '../../config/interfaces/IPostShowProps.interface'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
const ListPostsComponent = ({ post }: IPostShowProps) => {
	// console.log('post ', post)
	return (
		<div>
			{post ? (
				<div>
					<Card>
						<CardContent className="bottom">
							<Grid
								container
								direction="column"
								spacing={2}
								xs={6}
								lg={8}
								mb={3}
							>
								<Grid item xs={6} lg={8}>
									<NavLink to={`/post/edit/${post.id}`}>
										<EditIcon />
									</NavLink>
									{/* <NavLink to={`/post/delete/${post.id}`}> */}
									<Link to={'/post/delete/' +post.id} state={{ groupId: post.groupId}}>
									<DeleteIcon />
									</Link>
									{/* </NavLink> */}
								</Grid>

								<Grid item xs={12}>
									post creator : {post.traveler.user.name}
								</Grid>
								<Grid item xs={6}>
									created at : {moment(post.created_at).format('MMM Do YY')}
								</Grid>
								<h2 className="header">{post.content}</h2>
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
