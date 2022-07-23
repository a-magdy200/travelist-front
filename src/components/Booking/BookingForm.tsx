import Grid from '@mui/material/Grid'
import {useState } from 'react'
import CustomInputField from '../Form/CustomInputField'
import StripeCheckout from 'react-stripe-checkout'
import { IBookCycleRequestBody } from '../../config/interfaces/IBookCycleRequestBody.interface'
import { IResponseInterface } from '../../config/interfaces/responses/IResponse.interface'
import { ICycleInterface } from '../../config/interfaces/entities/ICycle.interface'
import api from '../../config/api'
import { useParams } from 'react-router-dom'

const BookingFormComponent = () => {
    const [bookingSeats,setBookingSeats]=useState('')
    const { id } = useParams()

    const confirmPayment=async (token: any) => {
        try {
			if(id){	
            const requestBody: IBookCycleRequestBody = {
					cycleId: Number(id),
					token,
                   bookingSeats:Number(bookingSeats)

				}

				const response: IResponseInterface<ICycleInterface> =
					await api<ICycleInterface>({
						url: '/api/cycles/book',
						method: 'POST',
						body: JSON.stringify(requestBody),
					})
				if (response.success) {
					alert('booked successfully')
					console.log(response.data)
				
			}
        }
        } catch (error: any) {
			alert('error in booking')
			console.log(JSON.stringify(error))
		}
	}
   
	return (
		<div>
			<Grid container direction="column" spacing={2}>
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
