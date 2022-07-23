import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ShowCycleReviewsComponent from '../../components/cyclesReviews/ShowCycleReviews'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'
import Loader from '../../components/Loader'
import api from '../../config/api'
import { ICycleReview } from '../../config/interfaces/ICycleReview.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

interface ICycleReviewProps {
	cycleId: number
}

const ShowCycleReviews = ({ cycleId }: ICycleReviewProps) => {
	const [cycleReviews, setCycleReviews] = useState<ICycleReview[]>()
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
				url: `/api/cycle_reviews/show/${cycleId}`,
			})

			if (response.success) {
				if (response.data) {
					setCycleReviews(response.data)
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
			<h1>Cycle Reviews</h1>
			{cycleReviews ? (
				cycleReviews.map((cycleReview, index) => (
					<ShowCycleReviewsComponent cycleReview={cycleReview} key={index} />
				))
			) : (
				<div><DisplayErrorsList errors={errors} /></div>
			)}
		</div>
	)
}
export default ShowCycleReviews
