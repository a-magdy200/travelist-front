import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListCompaniesReviewsComponent from '../../components/companiesReviews/ListCountriesReviews'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'
import Loader from '../../components/Loader'
import api from '../../config/api'
import { ICompanyReview } from '../../config/interfaces/ICompanyReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListCompaniesReviews = () => {
	const [companiesReviews, setCompaniesReviews] = useState<ICompanyReview[]>()
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const getCompaniesReviews = async () => {
		toast.info("Getting Reviews......");
		setErrors([]);
		setIsLoading(true);
		try {
			const response: IResponseInterface<ICompanyReview[]> = await api<
				ICompanyReview[]
			>({
				url: '/api/company_reviews/all',
			})

			if (response.success) {
				if (response.data) {
					setCompaniesReviews(response.data)
					toast.success("Get Reviews Successfully");
				}
			}

		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
			toast.error("An error has occurred");
		}
		setIsLoading(false);
	}

	useEffect(() => {
		getCompaniesReviews()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
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
				<DisplayErrorsList errors={errors} />
				)}
		</div>
	)
}
export default ListCompaniesReviews
