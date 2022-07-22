import { IBookingInterface } from "../../config/interfaces/IBooking.Interface"
import { IResponseInterface } from "../../config/interfaces/IResponse.interface"
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import ListBookingComponent from "../../components/Booking/ListBookings"

const ListBookings = () => {
	const [bookings, setBookings] = useState<IBookingInterface[]>([])
	const getBookings = async () => {
		try {
			const response: IResponseInterface<IBookingInterface[]> = await api<
				IBookingInterface[]
			>({
				url: '/api/cycles/bookings',
			})
	
			if (response.success) {
				if (response.data) {
					setBookings(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getBookings()
	}, [])
	return <div>
		{
		bookings ? 
		<ListBookingComponent bookings={bookings} /> 
		:
		<Loader/>
	    }
		 </div>
}
export default ListBookings
