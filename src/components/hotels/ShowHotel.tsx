import Loader from '../Loader'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import config from '../../config/app_config/config'
import { IHotelShowProps } from '../../config/interfaces/IHotelShowProps.interface'
import ShowHotelReviews from '../../pages/HotelReviews/show_hotel_reviews'
import CreateHotelReviews from '../../pages/HotelReviews/create_hotel_review'
import Rating from '@mui/material/Rating'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const ShowHotelComponent = ({ hotel }: IHotelShowProps) => {
	const photoPath = hotel
		? `${config.apiUrl}/uploads/hotels/${hotel.cover_picture}`
		: ''

	return (
		<div>
			{hotel ? (
				<div>
					<div>
						<h1>{hotel.name} Hotel Details</h1>
					</div>
					<div className="bottom">
						<Card sx={{ maxWidth: 945, minWidth: 345, m: 2 }}>
							<CardMedia
								component="img"
								height="140"
								image={photoPath}
								alt="program Cover"
							/>

							<CardContent className="bottom">
								<Typography gutterBottom variant="h6" component="div">
									Hotel located in Country : {hotel.country?.name}
								</Typography>

								<Typography gutterBottom variant="h6" component="div">
									Hotel Address : {hotel.address}
								</Typography>

								<Typography gutterBottom variant="h6" component="div">
									Hotel Stars : {hotel.stars}
								</Typography>

								<Typography gutterBottom variant="h6" component="div">
									Hotel Average Rating :
									<Rating
										name="read-only"
										value={hotel.average_rate}
										readOnly
									/>
								</Typography>
							</CardContent>
						</Card>
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
