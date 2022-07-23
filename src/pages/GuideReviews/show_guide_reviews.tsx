import ShowGuideReviewsComponent from '../../components/guidesReviews/ShowGuideReviews'
import { IGuideReview } from '../../config/interfaces/IGuideReview.interface'

interface IGuideReviewProps {
	guideReviews: IGuideReview[]
}

const ShowGuideReviews = ({ guideReviews }: IGuideReviewProps) => {
	
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
