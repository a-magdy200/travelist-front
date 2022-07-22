import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'
import { IFeedPost } from '../../config/interfaces/IFeedPost.interface'
import Typography from '@mui/material/Typography'


interface IFeedPostProps {
	feedPost: IFeedPost
}

const FeedPageComponent = ({ feedPost }: IFeedPostProps) => {
	return (
		<div>
			{feedPost? (
				<div>
					<Card sx={{ maxWidth: 500, minWidth: 345, mx: 30, my: 2 }}>
						<CardContent className="bottom">
							<Typography gutterBottom variant="h6" component="div">
								{feedPost.content}
							</Typography>

							{/* <Typography gutterBottom variant="h6" component="div">
								{feedPost.travelerName}
							</Typography> */}
						</CardContent>
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
export default FeedPageComponent
