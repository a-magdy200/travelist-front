import Loader from '../Loader'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import { IHotelReviewShowProps } from '../../config/interfaces/IHotelReviewShowProps.interface'

const ShowHotelReviewsComponent= ({ hotelReview }: IHotelReviewShowProps) => {
	return (
		<div>
			{hotelReview ? (
				<div>
					<Card>
						<CardContent className="bottom">

							<Grid
								container
								direction="column"
								spacing={2}
								xs={10}
								lg={8}
								mb={3}
							>
								<Grid item xs={6}>
									Hotel Review : {hotelReview.review}
								</Grid>

								<Grid item xs={6}>
									Review Rating : {hotelReview.rating}
								</Grid>

							</Grid>
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
