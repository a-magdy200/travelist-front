import { useEffect, useState } from 'react'
import ListGuidesReviewsComponent from '../../components/guidesReviews/ListGuidesReviews'
import api from '../../config/api'
import { IGuideReview } from '../../config/interfaces/IGuideReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListGuidesReviews = () => {
	const [guidesReviews, setGuidesReviews] = useState<IGuideReview[]>()

	const getGuidesReviews = async () => {
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
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getGuidesReviews()
	}, [])
	return (
		<div>
			<h1>Guides Reviews Page</h1>
			{guidesReviews ? (
				guidesReviews.map((guideReview, index) => (
					<ListGuidesReviewsComponent guideReview={guideReview} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ListGuidesReviews
