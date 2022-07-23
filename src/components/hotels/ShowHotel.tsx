import Loader from '../Loader'
import { Link, NavLink } from "react-router-dom";
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
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";

const ShowHotelComponent = ({ hotel }: IHotelShowProps) => {
	const {user} = useAuth();
	const canUserReview = user.type === 'traveler' && ((hotel?.reviews && !hotel.reviews.find((review) => review?.traveler?.userId === user.id)) || hotel?.reviews?.length === 0);
	const photoPath = hotel
		? `${config.apiUrl}/uploads/hotels/${hotel.cover_picture}`
		: ''

	return (
		<div>
			{hotel ? (
				<div>
					<Box mb={2} display={"flex"} alignItems={"center"}>
						<Box mr={2}>
							<Link to={`/hotel/list`}>
								<Button className="createButton" variant="contained">
									Back
								</Button>
							</Link>
						</Box>
						<Typography variant={"h5"}>{hotel.name}</Typography>
					</Box>
					<Box mb={2}>
						<Card variant={"outlined"}>
							{/*<CardMedia*/}
							{/*	component="img"*/}
							{/*	height="140"*/}
							{/*	image={photoPath}*/}
							{/*	alt="program Cover"*/}
							{/*/>*/}

							<CardContent>
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
					</Box>
					{/* <div propName={"myValue"} /> */}

					<ShowHotelReviews hotelReviews={hotel?.reviews || []} />
					{canUserReview ? (

					<CreateHotelReviews hotelId={hotel.id} />
					) : null}


				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowHotelComponent
