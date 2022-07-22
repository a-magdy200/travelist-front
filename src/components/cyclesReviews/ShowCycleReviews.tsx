import Loader from '../Loader'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { ICycleReviewShowProps } from '../../config/interfaces/ICycleReviewShowProps.interface'

const ShowCycleReviewsComponent = ({ cycleReview }: ICycleReviewShowProps) => {
	return (
		<div>
			{cycleReview ? (
				<div>
					<Card sx={{ maxWidth: 500, minWidth: 345, mx: 30, my: 2 }}>
						<CardContent className="bottom">
							<Typography gutterBottom variant="h6" component="div">
								{cycleReview.review}
							</Typography>

							<Rating name="read-only" value={cycleReview.rating} readOnly />
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
export default ShowCycleReviewsComponent
