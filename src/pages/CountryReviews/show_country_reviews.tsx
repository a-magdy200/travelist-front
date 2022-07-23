import ShowCountryReviewsComponent from '../../components/countriesReviews/ShowCountryReviews'
import { ICountryReview } from '../../config/interfaces/ICountryReview.interface'

interface ICountryReviewProps {
	countryReviews: ICountryReview[]
}

const ShowCountryReviews = ({ countryReviews }: ICountryReviewProps) => {
	return (
		<div>
			<h1>Country Reviews</h1>
			{countryReviews ? (
				countryReviews.map((countryReview, index) => (
					<ShowCountryReviewsComponent
						countryReview={countryReview}
						key={index}
					/>
				))
			) : (
				<div>No Reviews yet</div>
			)}
		</div>
	)
}
export default ShowCountryReviews
