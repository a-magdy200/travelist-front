import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'
import { ICycleReviewShowProps } from '../../config/interfaces/ICycleReviewShowProps.interface'

const ListCyclesReviewsComponent = ({ cycleReview }: ICycleReviewShowProps) => {
	return (
		<div>
			{cycleReview ? (
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
									Hotel Review : {cycleReview.review}
								</Grid>

								<Grid item xs={6}>
									Review Rating : {cycleReview.rating}
								</Grid>
							</Grid>
						</CardContent>

						<CardActions className="bottom">
							{/* <NavLink to={`/cycleReview/show/${cycleReview.cycle.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Show Cycle Reviews
								</Button>
							</NavLink> */}
							<NavLink to={`/cycleReview/delete/${cycleReview.id}`}>
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
export default ListCyclesReviewsComponent
