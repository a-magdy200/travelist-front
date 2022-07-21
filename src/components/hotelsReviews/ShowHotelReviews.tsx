import Loader from '../Loader'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import { IHotelReviewShowProps } from '../../config/interfaces/IHotelReviewShowProps.interface'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'

const ShowHotelReviewsComponent = ({ hotelReview }: IHotelReviewShowProps) => {
	return (
		<div>
			{hotelReview ? (
				<div>
					<Card sx={{ maxWidth: 500, minWidth: 345, mx: 30, my: 2 }}>
						<CardContent className="bottom">
							{/* <Typography gutterBottom variant="h5" component="div">
								{hotelReview}
							</Typography> */}

							<Typography gutterBottom variant="h6" component="div">
								{hotelReview.review}
							</Typography>

							<Rating name="read-only" value={hotelReview.rating} readOnly />
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
export default ShowHotelReviewsComponent
