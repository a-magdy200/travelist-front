import ShowGuideReviewsComponent from '../../components/guidesReviews/ShowGuideReviews'
import { IGuideReview } from '../../config/interfaces/IGuideReview.interface'

interface IGuideReviewProps {
	guideReviews: IGuideReview[]
}

const ShowGuideReviews = ({ guideReviews }: IGuideReviewProps) => {
	// const [cycleReviews, setCycleReviews] = useState<ICycleReview[]>()

	// const getCyclesReviews = async () => {
	// 	try {
	// 		const response: IResponseInterface<ICycleReview[]> = await api<
	// 			ICycleReview[]
	// 		>({
	// 			url: `/api/cycle_reviews/show/${cycleId}`,
	// 		})

	// 		if (response.success) {
	// 			if (response.data) {
	// 				setCycleReviews(response.data)
	// 				// console.log(response.data)
	// 			}
	// 		}
	// 	} catch (error: any) {
	// 		console.log(error)
	// 	}
	// }

	// useEffect(() => {
	// 	getCyclesReviews()
	// }, [])

	return (
		<div>
			<h1>Guide Reviews</h1>
			{guideReviews ? (
				guideReviews.map((guideReview, index) => (
					<ShowGuideReviewsComponent guideReview={guideReview} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ShowGuideReviews
