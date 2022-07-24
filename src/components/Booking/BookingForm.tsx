import Grid from '@mui/material/Grid'
import { useState } from 'react'
import CustomInputField from '../Form/CustomInputField'
import StripeCheckout from 'react-stripe-checkout'
import { IBookCycleRequestBody } from '../../config/interfaces/IBookCycleRequestBody.interface'
import { IResponseInterface } from '../../config/interfaces/responses/IResponse.interface'
import { ICycleInterface } from '../../config/interfaces/entities/ICycle.interface'
import api from '../../config/api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../Loader'
import DisplayErrorsList from '../DisplayErrors/DisplayErrorsList'

const BookingFormComponent = () => {
	const [bookingSeats, setBookingSeats] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const { id } = useParams()
	const navigate = useNavigate()

	const confirmPayment = async (token: any) => {
		toast.info('Loading....')
		setErrors([])
		setIsLoading(true)
		try {
			if (id) {
				const requestBody: IBookCycleRequestBody = {
					cycleId: Number(id),
					token,
					bookingSeats: Number(bookingSeats),
				}

				const response: IResponseInterface<ICycleInterface> =
					await api<ICycleInterface>({
						url: '/api/cycles/book',
						method: 'POST',
						body: JSON.stringify(requestBody),
					})
				if (response.success) {
					if(response.data)
					{
					toast.success('Booking Successfully')
					console.log(response.data)
					navigate(`/program/all`)
				   }

				}
			}
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
			console.log(error)
		}
		setIsLoading(false)
	}
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			<Grid container direction="column" spacing={2}>
			<DisplayErrorsList errors={errors} />
				<CustomInputField
					type={'number'}
					label={'Number Of Booking Seats '}
					value={bookingSeats}
					setValue={setBookingSeats}
				/>
				<Grid item md={4} xs={12}>
					<StripeCheckout
						stripeKey="pk_test_51LNL5KAolBbZGsicA33sip9053jvrTpZvK6nzMAts5ZwJPvYJZlAD0yPBptJdrAACPVpMIMQ2QxYTXh9HAz0Vnpf0062y97oQ2"
						token={confirmPayment}
						name="book"
					/>
				</Grid>
			</Grid>
		</div>
	)
}
export default BookingFormComponent
