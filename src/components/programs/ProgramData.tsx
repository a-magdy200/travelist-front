import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import { IProgramShowProps } from '../../config/interfaces/IProgramShowProps.interface'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import { ICountryInterface } from '../../config/interfaces/ICountry.interface'

import * as React from 'react'
import { Fragment } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
const ProgramDataComponent = ({ program }: IProgramShowProps) => {
	return (
		<div>
			{program ? (
				<Card variant={"outlined"}>
					<CardMedia
						component="img"
						height="140"
						image={`http://localhost:4000/${program.cover_picture}`}
						alt="green iguana"
					/>
					<CardContent>
						<Typography mb={3} variant="h5">
							{program.name}
						</Typography>
						<Typography variant="body2">
							<Grid
								container
								spacing={2}
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
									Is recurring : {program.is_Recurring ? <CheckOutlined /> : <CloseOutlined/>}
								</Grid>
								<Grid item xs={6}>
									Total rate : {program.total_rate}
								</Grid>
								<Grid item xs={6}>
									Average rate : {program.average_rate}
								</Grid>
								<Grid item xs={6}>
									Departure Country : {program.country?.name}
								</Grid>

								<Grid item xs={6}>
									Transportation : {program.transportation?.name}
								</Grid>

								<Grid item xs={12}>
									<Typography variant={"h6"}>
										Destinations
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										{program.hotels.map((hotel) => (
											<Fragment key={hotel.id}>
										<Grid item xs={6}>
											Country: {hotel?.country?.name}
										</Grid>
										<Grid item xs={6}>
											Hotel: {hotel.name}
										</Grid>
											</Fragment>
										))}
									</Grid>
								</Grid>
							</Grid>
						</Typography>
					</CardContent>
				</Card>
			) : (
				<div>Not Found </div>
			)}
		</div>
	)
}
export default ProgramDataComponent
