import { useEffect, useState } from 'react'
import ListHotelsReviewsComponent from '../../components/hotelsReviews/ListHotelsReviews'
import api from '../../config/api'
import { IHotelReview } from '../../config/interfaces/IHotelReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListHotelsReviews = () => {
	const [hotelsReviews, setHotelsReviews] = useState<IHotelReview[]>()

	const getHotelsReviews = async () => {
		try {
			const response: IResponseInterface<IHotelReview[]> = await api<
				IHotelReview[]
			>({
				url: '/api/hotel_reviews/all',
			})

			if (response.success) {
				if (response.data) {
					setHotelsReviews(response.data)
					// console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getHotelsReviews()
	}, [])
	return (
		<div>
			<h1>Hotels Reviews Page</h1>
			{hotelsReviews ? (
				hotelsReviews.map((hotelReview, index) => (
					<ListHotelsReviewsComponent hotelReview={hotelReview} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ListHotelsReviews
