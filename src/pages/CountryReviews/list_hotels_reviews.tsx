import { useEffect, useState } from 'react'
import ListCountriesReviewsComponent from '../../components/countriesReviews/ListCountriesReviews'
import api from '../../config/api'
import { ICountryReview } from '../../config/interfaces/ICountryReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListCountriesReviews = () => {
	const [countriesReviews, setCountriesReviews] = useState<ICountryReview[]>()

	const getCountriesReviews = async () => {
		try {
			const response: IResponseInterface<ICountryReview[]> = await api<
			ICountryReview[]
			>({
				url: '/api/country_reviews/all',
			})

			if (response.success) {
				if (response.data) {
					setCountriesReviews(response.data)
					// console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCountriesReviews()
	}, [])
	return (
		<div>
			<h1>Hotels Reviews Page</h1>
			{countriesReviews ? (
				countriesReviews.map((countryReview, index) => (
					<ListCountriesReviewsComponent countryReview={countryReview} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ListCountriesReviews
