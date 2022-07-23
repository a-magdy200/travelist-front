import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListCyclesReviewsComponent from '../../components/cyclesReviews/ListCountriesReviews'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'
import Loader from '../../components/Loader'
import api from '../../config/api'
import { ICycleReview } from '../../config/interfaces/ICycleReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListCyclesReviews = () => {
	const [cyclesReviews, setCyclesReviews] = useState<ICycleReview[]>()
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const getCyclesReviews = async () => {
		toast.info("Getting Reviews....");
		setErrors([]);
		setIsLoading(true);
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
			toast.success("Getting Reviews Successfully");

		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
			toast.error("An error has occurred");
	   }
	   setIsLoading(false);
	}

	useEffect(() => {
		getCyclesReviews()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<div>
			<h1>Cycles Reviews Page</h1>
			{cyclesReviews ? (
				cyclesReviews.map((cycleReview, index) => (
					<ListCyclesReviewsComponent cycleReview={cycleReview} key={index} />
				))
			) : (
				<DisplayErrorsList errors={errors} />
				)}
		</div>
	)
}
export default ListCyclesReviews
