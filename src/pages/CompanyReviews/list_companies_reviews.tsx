import { useEffect, useState } from 'react'
import ListCompaniesReviewsComponent from '../../components/companiesReviews/ListCountriesReviews'
import api from '../../config/api'
import { ICompanyReview } from '../../config/interfaces/ICompanyReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListCompaniesReviews = () => {
	const [companiesReviews, setCompaniesReviews] = useState<ICompanyReview[]>()

	const getCompaniesReviews = async () => {
		try {
			const response: IResponseInterface<ICompanyReview[]> = await api<
				ICompanyReview[]
			>({
				url: '/api/company_reviews/all',
			})

			if (response.success) {
				if (response.data) {
					setCompaniesReviews(response.data)
					// console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCompaniesReviews()
	}, [])
	return (
		<div>
			<h1>Companies Reviews Page</h1>
			{companiesReviews ? (
				companiesReviews.map((companyReview, index) => (
					<ListCompaniesReviewsComponent
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
export default ListCompaniesReviews
