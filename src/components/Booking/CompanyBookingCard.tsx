import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { IBookingShowProps } from '../../config/interfaces/IBookingShowProps.interface'
import Box from "@mui/material/Box";
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
const CompanyBookingCard = ({ booking }: IBookingShowProps) => {
	return (
		<Box mb={2}>
		<Card variant={"outlined"}>
			<CardContent>
				<Typography variant="h5" component="div">
					User: {booking?.travelers?.user?.name}
				</Typography>
				<Typography variant="h6" component="div">
					Cycle:  {booking.cycle.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{booking.cycle.program?.name}
				</Typography>
			</CardContent>
		</Card>
		</Box>
	)
}
export default CompanyBookingCard
