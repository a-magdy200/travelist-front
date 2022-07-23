import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListCountriesReviewsComponent from '../../components/countriesReviews/ListCountriesReviews'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'
import Loader from '../../components/Loader'
import api from '../../config/api'
import { ICountryReview } from '../../config/interfaces/ICountryReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListCountriesReviews = () => {
	const [countriesReviews, setCountriesReviews] = useState<ICountryReview[]>()
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
  
	const getCountriesReviews = async () => {
		toast.info("Getting Reviews....");
		setErrors([]);
		setIsLoading(true);
		try {
			const response: IResponseInterface<ICountryReview[]> = await api<
				ICountryReview[]
			>({
				url: '/api/country_reviews/all',
			})

			if (response.success) {
				if (response.data) {
					setCountriesReviews(response.data)
					toast.success("Getting Successfully");
				}
			}
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
      toast.error("An error has occurred");
 
		}
		setIsLoading(false);
	}

	useEffect(() => {
		getCountriesReviews()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<div>
			<h1>Hotels Reviews Page</h1>
			{countriesReviews ? (
				countriesReviews.map((countryReview, index) => (
					<ListCountriesReviewsComponent
						countryReview={countryReview}
						key={index}
					/>
				))
			) : (
				<DisplayErrorsList errors={errors} />
				)}
		</div>
	)
}
export default ListCountriesReviews
