import ShowCompanyReviewsComponent from '../../components/companiesReviews/ShowCompanyReviews'
import { ICompanyReview } from '../../config/interfaces/ICompanyReview.interface'

interface ICompanyReviewProps {
	companyReviews: ICompanyReview[]
}

const ShowCompanyReviews = ({ companyReviews }: ICompanyReviewProps) => {
	return (
		<div>
			<h1>Company Reviews</h1>
			{companyReviews ? (
				companyReviews.map((companyReview, index) => (
					<ShowCompanyReviewsComponent
						companyReview={companyReview}
						key={index}
					/>
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ShowCompanyReviews
