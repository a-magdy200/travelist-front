// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import api from '../../config/api'
// import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IHotelReview } from '../../config/interfaces/IHotelReview.interface'
import ShowHotelReviewsComponent from '../../components/hotelsReviews/ShowHotelReviews'
interface IHotelReviewProps {
	hotelReviews: IHotelReview[]
}
const ShowHotelReviews = ({hotelReviews}: IHotelReviewProps) => {
	// const [hotelReviews, setHotelReviews] = useState<IHotelReview[]>()
	// const { id } = useParams()

	// const getHotelReviews = async () => {
	// 	try {
	// 		const response: IResponseInterface<IHotelReview[]> = await api<
	// 			IHotelReview[]
	// 		>({
	// 			url: `/api/hotel_reviews/show/${id}`,
	// 		})
	// 		if (response.success) {
	// 			if (response.data) {
	// 				setHotelReviews(response.data)
	// 			}
	// 		}
	// 	} catch (error: any) {
	// 		console.log(error)
	// 	}
	// }
	// useEffect(() => {
	// 	getHotelReviews()
	// }, [])

	return (
		<div>
			<h1>Hotel Reviews</h1>
			{hotelReviews ? (
				hotelReviews.map((hotelReview, index) => (
					<ShowHotelReviewsComponent hotelReview={hotelReview} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ShowHotelReviews
