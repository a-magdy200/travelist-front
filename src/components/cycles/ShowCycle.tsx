import Loader from '../Loader'
import {ICycleShowProps} from "../../config/interfaces/ICycleShowProps.interface";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'


const ShowCycleComponent = ({cycle}: ICycleShowProps) => {
	
	return (
		<div className="createContainer">
			{cycle ?
				<div>
					<div className="TopCycle">
						<h1 className="header">{cycle.name}</h1>
					</div>
					<div className="bottom">
						<h2 className="header">Cycle Details</h2>
						<Grid container direction="column" spacing={2} xs={10} lg={8} mb={3}>
						<Grid item xs={6}>
						Max Seats : {cycle.max_seats}
			     	    </Grid>

						 <Grid item xs={6}>
						current Seats : {cycle.current_seats}
			     	    </Grid>

						 <Grid item xs={6}>
						Departure Date : {cycle.departure_date}
			     	    </Grid>

						 <Grid item xs={6}>
						Arrival Date : {cycle.arrival_date}
			     	    </Grid>

						 <Grid item xs={6}>
						Return Date : {cycle.return_date}
			     	    </Grid>

						 <Grid item xs={6}>
						Return Arrival Date : {cycle.return_arrival_date}
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
					<NavLink to={`/cycle/list`}>
								{' '}
								<Button
								className="createButton"
								variant="contained"
								>
							   Back
							</Button>
							</NavLink>	



				</div>
				:
				<Loader/>}
		</div>
	)
}
export default ShowCycleComponent
