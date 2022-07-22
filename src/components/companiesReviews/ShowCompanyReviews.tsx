import Loader from '../Loader'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { ICompanyReviewShowProps } from '../../config/interfaces/ICompanyReviewShowProps.interface'

const ShowCompanyReviewsComponent = ({
	companyReview,
}: ICompanyReviewShowProps) => {
	return (
		<div>
			{companyReview ? (
				<div>
					<Card sx={{ maxWidth: 500, minWidth: 345, mx: 30, my: 2 }}>
						<CardContent className="bottom">
							<Typography gutterBottom variant="h6" component="div">
								{companyReview.review}
							</Typography>

							<Rating name="read-only" value={companyReview.rating} readOnly />
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
export default ShowCompanyReviewsComponent
