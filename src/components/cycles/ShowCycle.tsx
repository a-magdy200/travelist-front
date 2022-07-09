import Loader from '../Loader'
import {ICycleShowProps} from "../../config/interfaces/ICycleShowProps.interface";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import Grid from '@mui/material/Grid'


const ShowCycleComponent = ({cycle}: ICycleShowProps) => {
	console.log(cycle)
	
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
						Departure Location : {cycle.departure_location.name}
			     	    </Grid>

						 <Grid item xs={6}>
						Arrival Location : {cycle.arrival_location.name}
			     	    </Grid>

						 <Grid item xs={6}>
						Return Location : {cycle.return_location.name}
			     	    </Grid>

						 <Grid item xs={6}>
						Return Arrival Location : {cycle.return_arrival_location.name}
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
