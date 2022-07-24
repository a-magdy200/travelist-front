import Loader from '../Loader'
import { ICycleShowProps } from '../../config/interfaces/ICycleShowProps.interface'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ShowCycleReviews from '../../pages/CycleReviews/show_cycle_reviews'
import CreateCycleReviews from '../../pages/CycleReviews/create_cycle_review'
import moment from 'moment'

const ShowCycleComponent = ({ cycle }: ICycleShowProps) => {
	return (
		<div className="createContainer">
			{cycle && cycle.id ? (
				<div>
					<div className="TopCycle">
						<h1 className="header">{cycle.name}</h1>
					</div>
					<div className="bottom">
						<h2 className="header">Cycle Details</h2>
						<Grid
							container
							direction="column"
							spacing={2}
							xs={10}
							lg={8}
							mb={3}
						>
							<Grid item xs={6}>
								Max Seats : {cycle.max_seats}
							</Grid>

							<Grid item xs={6}>
								current Seats : {cycle.current_seats}
							</Grid>

							<Grid item xs={6}>
								Departure Date : {moment(cycle.departure_date).format('MMM Do YY')}
							</Grid>
							<Grid item xs={6}>
								Arrival Date : {moment(cycle.arrival_date).format('MMM Do YY')}
							</Grid>

							<Grid item xs={6}>
								Return Date : {moment(cycle.return_date).format('MMM Do YY')}
							</Grid>

							<Grid item xs={6}>
								Return Arrival Date : {moment(cycle.return_arrival_date).format('MMM Do YY')}
							</Grid>

							<Grid item xs={6}>
								Departure Location : {cycle.departure_location}
							</Grid>

							<Grid item xs={6}>
								Arrival Location : {cycle.arrival_location}
							</Grid>

							<Grid item xs={6}>
								Return Location : {cycle.return_location}
							</Grid>

							<Grid item xs={6}>
								Return Arrival Location : {cycle.return_arrival_location}
							</Grid>
						</Grid>
					</div>

					<ShowCycleReviews cycleId={cycle.id} />

					<CreateCycleReviews cycleId={cycle.id} />
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowCycleComponent
