import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import * as React from 'react'
import { IBookingShowProps } from '../../config/interfaces/IBookingShowProps.interface'

const BookingCard = ({ booking }: IBookingShowProps) => {
	return (
		<Card sx={{ maxWidth: 945, m: 2 }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{booking.cycle.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{booking.cycle.program?.name}
				</Typography>
			</CardContent>
		</Card>
	)
}
export default BookingCard
