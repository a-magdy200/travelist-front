import { useEffect, useState } from 'react'
import ListCyclesReviewsComponent from '../../components/cyclesReviews/ListCountriesReviews'
import api from '../../config/api'
import { ICycleReview } from '../../config/interfaces/ICycleReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListCyclesReviews = () => {
	const [cyclesReviews, setCyclesReviews] = useState<ICycleReview[]>()

	const getCyclesReviews = async () => {
		try {
			const response: IResponseInterface<ICycleReview[]> = await api<
			ICycleReview[]
			>({
				url: '/api/cycle_reviews/all',
			})

			if (response.success) {
				if (response.data) {
					setCyclesReviews(response.data)
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
			<h1>Cycles Reviews Page</h1>
			{cyclesReviews ? (
				cyclesReviews.map((cycleReview, index) => (
					<ListCyclesReviewsComponent cycleReview={cycleReview} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ListCyclesReviews
