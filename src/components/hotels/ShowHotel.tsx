import Loader from '../Loader'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import config from '../../config/app_config/config'
import { IHotelShowProps } from '../../config/interfaces/IHotelShowProps.interface'
import ShowHotelReviews from '../../pages/HotelReviews/show_hotel_reviews'
import CreateHotelReviews from '../../pages/HotelReviews/create_hotel_review'

const ShowHotelComponent = ({ hotel }: IHotelShowProps) => {
	const photoPath = hotel
		? `${config.apiUrl}` + '/uploads/hotels/' + `${hotel.cover_picture}`
		: ''

	return (
		<div>
			{hotel ? (
				<div>
					<div>
						<h1>Hotel Details</h1>
					</div>

					<div className="bottom">
						<h2 className="header">{hotel.name}</h2>

						<Avatar
							className="header"
							alt=""
							src={photoPath}
							sx={{ width: 112, height: 112 }}
						/>

						<Grid
							container
							direction="column"
							spacing={2}
							xs={10}
							lg={8}
							mb={3}
						>
							<Grid item xs={6}>
								Hotel located in Country : {hotel.country?.name}
							</Grid>

							<Grid item xs={6}>
								Hotel Address : {hotel.address}
							</Grid>

							<Grid item xs={6}>
								Hotel Stars : {hotel.stars}
							</Grid>

							<Grid item xs={6}>
								Hotel Average Rating : {hotel.average_rate}
							</Grid>

							{/* <Grid item xs={6}>
								{hotel.reviews?.map((review, index) => (
									<div>
										<div>Review: {review.review}</div>
										<div>Review Rating: {review.rating}</div>
									</div>
								))}
							</Grid> */}
						</Grid>
					</div>
					{/* <div propName={"myValue"} /> */}
					<ShowHotelReviews hotelReviews={hotel?.reviews || []} />
					<CreateHotelReviews hotelId={hotel.id} />

					<NavLink to={`/hotel/list`}>
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
export default ShowHotelComponent
