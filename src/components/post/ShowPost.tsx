import Loader from '../Loader'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import moment from 'moment'
import { IPostShowProps } from '../../config/interfaces/IPostShowProps.interface'
import Typography from "@mui/material/Typography";
const ShowPostComponent = ({ post }: IPostShowProps) => {
	return (
		<div>
			{post ? (
				<div>
					<div>
						<Typography variant={"h5"}>Post Details</Typography>
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
							spacing={2}
						>
							<Grid item xs={6}>
								<Typography variant={"body1"}>{post.content}</Typography>
							</Grid>
						</Grid>
					</div>
					<Link to={`/posts`}>
						<Button className="createButton" variant="contained">
							Back
						</Button>
					</Link>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowPostComponent
