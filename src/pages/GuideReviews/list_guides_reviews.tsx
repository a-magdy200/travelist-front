import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListGuidesReviewsComponent from '../../components/guidesReviews/ListGuidesReviews'
import Loader from '../../components/Loader'
import api from '../../config/api'
import { IGuideReview } from '../../config/interfaces/IGuideReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListGuidesReviews = () => {
	const [guidesReviews, setGuidesReviews] = useState<IGuideReview[]>()
	const [isLoading, setIsLoading] = useState(false);

	const getGuidesReviews = async () => {
		toast.info("Getting Reviews....");
		setIsLoading(true);
		try {
			const response: IResponseInterface<IGuideReview[]> = await api<
				IGuideReview[]
			>({
				url: '/api/guide_reviews/all',
			})

			if (response.success) {
				if (response.data) {
					setGuidesReviews(response.data)
					// console.log(response.data)
				}
			}
			toast.success("Get Reviews Successfully");
		} catch (error: any) {
			toast.error("An error has occurred");
			console.log(error)
		}
		setIsLoading(false);
	}

	useEffect(() => {
		getGuidesReviews()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<div>
			<h1>Guides Reviews Page</h1>
			{guidesReviews ? (
				guidesReviews.map((guideReview, index) => (
					<ListGuidesReviewsComponent guideReview={guideReview} key={index} />
				))
			) : (
				<div>No Reviews yet</div>
			)}
		</div>
	)
}
export default ListGuidesReviews
