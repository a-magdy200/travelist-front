import { useEffect, useState } from 'react'
import ShowCycleReviewsComponent from '../../components/cyclesReviews/ShowCycleReviews'
import api from '../../config/api'
import { ICycleReview } from '../../config/interfaces/ICycleReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

interface ICycleReviewProps {
	cycleId: number
}

const ShowCycleReviews = ({ cycleId }: ICycleReviewProps) => {
	const [cycleReviews, setCycleReviews] = useState<ICycleReview[]>()

	const getCyclesReviews = async () => {
		try {
			const response: IResponseInterface<ICycleReview[]> = await api<
				ICycleReview[]
			>({
				url: `/api/cycle_reviews/show/${cycleId}`,
			})

			if (response.success) {
				if (response.data) {
					setCycleReviews(response.data)
					// console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCyclesReviews()
	}, [])

	return (
		<div>
			<h1>Cycle Reviews</h1>
			{cycleReviews ? (
				cycleReviews.map((cycleReview, index) => (
					<ShowCycleReviewsComponent cycleReview={cycleReview} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ShowCycleReviews
