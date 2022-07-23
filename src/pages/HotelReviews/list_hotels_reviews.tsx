import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListHotelsReviewsComponent from '../../components/hotelsReviews/ListHotelsReviews'
import Loader from '../../components/Loader'
import api from '../../config/api'
import { IHotelReview } from '../../config/interfaces/IHotelReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListHotelsReviews = () => {
	const [hotelsReviews, setHotelsReviews] = useState<IHotelReview[]>()
	const [isLoading, setIsLoading] = useState(false);

	const getHotelsReviews = async () => {
		toast.info("Getting Reviews....");
		setIsLoading(true);
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
			toast.success("Get Successfully");

		} catch (error: any) {
			console.log(error)
			toast.error("An error has occurred");
		}
		setIsLoading(false);
	}

	useEffect(() => {
		getHotelsReviews()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<div>
			<h1>Hotels Reviews Page</h1>
			{hotelsReviews ? (
				hotelsReviews.map((hotelReview, index) => (
					<ListHotelsReviewsComponent hotelReview={hotelReview} key={index} />
				))
			) : (
				<div>No Reviews yet</div>
			)}
		</div>
	)
}
export default ListHotelsReviews
