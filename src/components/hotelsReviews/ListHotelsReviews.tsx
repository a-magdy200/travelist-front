import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'
import { IHotelReviewShowProps } from '../../config/interfaces/IHotelReviewShowProps.interface'

const ListHotelsReviewsComponent = ({ hotelReview }: IHotelReviewShowProps) => {
	return (
		<div>
			{hotelReview ? (
				<div>
					<Card>
						<CardContent className="bottom">
							<h2 className="header">{hotelReview.hotel.name}</h2>

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

						<CardActions className="bottom">
							{/* <NavLink to={`/hotelReview/show/${hotelReview.hotel.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Show Hotel Reviews
								</Button>
							</NavLink> */}
							<NavLink to={`/hotelReview/delete/${hotelReview.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Delete
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
export default ListHotelsReviewsComponent
