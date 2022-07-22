import Loader from '../Loader'
import Grid from '@mui/material/Grid'
import { IBookingShowProps } from '../../config/interfaces/IBookingShowProps.interface'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const ShowBookingComponent = ({ booking }: IBookingShowProps) => {
	return (
		<div className="createContainer">
			{booking ? (
				<Card>
					<CardContent>
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
									ID : {booking.id}
								</Grid>
								<Grid item xs={6}>
									Traveler Name : {booking.travelers.user.name}
								</Grid>
								<Grid item xs={6}>
									Program Name : {booking.cycle.name}
								</Grid>
								<Grid item xs={6}>
									Cycle Name : {booking.cycle.program?.name}
								</Grid>
								<Grid item xs={6}>
									Is_Paid : {booking.is_paid}
								</Grid>
                                <Grid item xs={6}>
									created_at : {booking.created_at}
								</Grid>
								<Grid item xs={6}>
									transaction_id : {booking.transaction?.id}
								</Grid>
								<Grid item xs={6}>
									transaction_token : {booking.transaction?.payment_id}
								</Grid>
							</Grid>
						</Typography>
					</CardContent>
				</Card>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowBookingComponent
