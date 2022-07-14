import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import { IProgramShowProps } from "../../config/interfaces/IProgramShowProps.interface";
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import { ICountryInterface } from '../../config/interfaces/ICountry.interface'

import * as React from 'react';
const ProgramDataComponent=({program}:IProgramShowProps)=>{
    return(
      <div>
       { program?
        <Card sx={{ maxWidth: 645 }}>
						<CardMedia
							component="img"
							height="140"
							image={`http://localhost:4000/${program.cover_picture}`}
							alt="green iguana"
						/>
						<CardContent >
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
									<Grid item xs={6}>
										ID : {program.id}
									</Grid>
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

									</Grid>
									
								</Grid>
							</Typography>
						</CardContent>
					
					</Card>
        :
        <div>Not Found </div>
       }
        </div>

)
}
export default ProgramDataComponent