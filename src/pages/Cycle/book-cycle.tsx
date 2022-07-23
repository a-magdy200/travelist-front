import BookingFormComponent from '../../components/Booking/BookingForm'
import { ReactComponent as PaymentImage } from '../../assets/images/payment.svg'
import Grid from '@mui/material/Grid'

const BookCycle = () => {
	return (
		<Grid container spacing={4} alignItems={'center'}>
			<Grid item md={6} xs={12}>
				<BookingFormComponent  />
			</Grid>
			<Grid item md={6} xs={12}>
				<PaymentImage width={'100%'} />
			</Grid>
		</Grid>
	)
}
export default BookCycle
