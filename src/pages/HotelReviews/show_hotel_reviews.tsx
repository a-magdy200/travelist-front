import { IHotelReview } from '../../config/interfaces/IHotelReview.interface'
import ShowHotelReviewsComponent from '../../components/hotelsReviews/ShowHotelReviews'
interface IHotelReviewProps {
	hotelReviews: IHotelReview[]
}
const ShowHotelReviews = ({ hotelReviews }: IHotelReviewProps) => {
	return (
		<div>
			<h1>Hotel Reviews</h1>
			{hotelReviews ? (
				hotelReviews.map((hotelReview, index) => (
					<ShowHotelReviewsComponent hotelReview={hotelReview} key={index} />
				))
			) : (
				<div>No Reviews yet</div>
			)}
		</div>
	)
}
export default ShowHotelReviews
