import Loader from '../Loader'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { ICountryReviewShowProps } from '../../config/interfaces/ICountryReviewShowProps.interface'

const ShowCountryReviewsComponent = ({
	countryReview,
}: ICountryReviewShowProps) => {
	return (
		<div>
			{countryReview ? (
				<div>
					<Card sx={{ maxWidth: 500, minWidth: 345, mx: 30, my: 2 }}>
						<CardContent className="bottom">
							<Rating
								name="read-only"
								value={countryReview.rating}
								precision={0.5}
								readOnly
							/>

							<Typography gutterBottom variant="h6" component="div">
								{countryReview.review}
							</Typography>
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
export default ShowCountryReviewsComponent
