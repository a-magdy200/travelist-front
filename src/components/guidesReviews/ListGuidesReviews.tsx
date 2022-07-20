import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'
import { IGuideReviewShowProps } from '../../config/interfaces/IGuideReviewShowProps.interface'

const ListGuidesReviewsComponent = ({ guideReview }: IGuideReviewShowProps) => {
	return (
		<div>
			{guideReview ? (
				<div>
					<Card>
						<CardContent className="bottom">
							{/* <h2 className="header">{companyReview.company.user.name}</h2> */}

							<Grid
								container
								direction="column"
								spacing={2}
								xs={10}
								lg={8}
								mb={3}
							>
								<Grid item xs={6}>
									Hotel Review : {guideReview.review}
								</Grid>

								<Grid item xs={6}>
									Review Rating : {guideReview.rating}
								</Grid>
							</Grid>
						</CardContent>

						<CardActions className="bottom">
							{/* <NavLink to={`/guideReview/show/${guideReview.traveler.user.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Show Guide Reviews
								</Button>
							</NavLink> */}
							<NavLink to={`/guideReview/delete/${guideReview.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Delete
								</Button>
							</NavLink>
						</CardActions>
					</Card>
					<div>
						<p></p>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ListGuidesReviewsComponent
