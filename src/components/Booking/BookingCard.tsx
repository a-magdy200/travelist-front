import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { IBookingShowProps } from '../../config/interfaces/IBookingShowProps.interface'
import Box from "@mui/material/Box";
import { MonetizationOnOutlined } from "@mui/icons-material";

const BookingCard = ({ booking }: IBookingShowProps) => {
	return (
		<Box mb={2}>
			<Card variant={"outlined"}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{booking.cycle.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{booking.cycle.program?.name}
					</Typography>
					<Typography variant="h5">
						<Box display={"flex"} alignItems={"center"}>
							<span>Amount: </span>
							<span>{booking.cycle.program?.price}</span>
							<MonetizationOnOutlined/>
						</Box>
					</Typography>
				</CardContent>
			</Card>
		</Box>
	)
}
export default BookingCard
