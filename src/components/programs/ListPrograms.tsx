import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { IProgramShowProps } from '../../config/interfaces/IProgramShowProps.interface'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import CardMedia from '@mui/material/CardMedia'
import { NavLink } from 'react-router-dom'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import { ICountryInterface } from '../../config/interfaces/ICountry.interface'
import Typography from '@mui/material/Typography'

import * as React from 'react'

const ListProgramsComponent = ({ program }: IProgramShowProps) => {
	return (
		<div>
			{program ? (
				<Card>
					{/* <CardMedia
                             component="img"
                             height="140"
                             image={`http://localhost:4000/${program.cover_picture}`}
                             alt="cover photo"
        />*/}
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{program.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							<Grid
								id="1"
								container
								direction="column"
								spacing={2}
								xs={12}
								lg={8}
								m={3}
							>
								{/* <Grid item xs={6}>
                                         ID : {program.id}
        </Grid>*/}
								<Grid item xs={6}>
									Name : {program.name}
								</Grid>
								<Grid item xs={6}>
									Price : {program.price}
								</Grid>
								<Grid item xs={6}>
									Description : {program.description}
								</Grid>
								<Grid item xs={6}>
									is_Recurring : {program.is_Recurring}
								</Grid>
								<Grid item xs={6}>
									total_rate_value : {program.total_rate}
								</Grid>
								<Grid item xs={6}>
									average_rate : {program.average_rate}
								</Grid>
								{/*
                                     <Grid item xs={6}>
                                         Departure Country : {program.country?.name}
                                     </Grid>
 
                                     <Grid item xs={6}>
                                         Transportation : {program.transportation?.name}
                                     </Grid>
                                     
                                     <Grid item xs={6}>
                                         Hotels :{program.hotels.map((hotel:IHotelInterface)=>hotel.name )}
                                     </Grid>
                                     <Grid item xs={6}>
                                     Destinations :{program.destinations?.map((destination:ICountryInterface)=>destination.name )}
 
    </Grid>*/}
							</Grid>
						</Typography>
					</CardContent>
					<CardActions className="bottom">
						<NavLink to={`/program/details/${program.id}`}>
							{' '}
							<Button className="createButton" variant="contained">
								Show Details
							</Button>
						</NavLink>
					</CardActions>
				</Card>
			) : (
				<div>
					<Loader />{' '}
				</div>
			)}
		</div>
	)
}
export default ListProgramsComponent
