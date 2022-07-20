import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import EditTravelerMenu from './EditTravelerMenu'
// import { ITravelerShowProps } from '../../config/interfaces/ITravelerShowProps.interface'
import { ITravelerReviewShowProps } from '../../config/interfaces/ITravelerReviewShowProps.interface'

import ShowGuideReviews from '../../pages/GuideReviews/show_guide_reviews'
import CreateGuideReviews from '../../pages/GuideReviews/create_guide_review'

const Traveler = ({ traveler }: ITravelerReviewShowProps) => {
	return (
		<Stack direction="column" spacing={2} display="flex" alignItems="center">
			<Grid container spacing={2} xs={10} lg={8} mb={3}>
				<Grid item xs={6}>
					Gender:
				</Grid>
				<Grid item xs={6}>
					{traveler.gender}
				</Grid>
				<Grid item xs={6}>
					Date of Birth:
				</Grid>
				<Grid item xs={6}>
					{traveler.date_of_birth}
				</Grid>
				<Grid item xs={6}>
					National Id:
				</Grid>
				<Grid item xs={6}>
					{traveler.national_id}
				</Grid>
				<Grid item xs={6}>
					Guide:
				</Grid>
				<Grid item xs={6}>
					{traveler.is_guide}
				</Grid>
			</Grid>
			<EditTravelerMenu traveler={traveler} />

			<ShowGuideReviews guideReviews={traveler.reviews || []} />

			<CreateGuideReviews guideId={traveler.id} />
		</Stack>
	)
}

export default Traveler
